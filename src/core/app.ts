import { Server, createServer, IncomingMessage, ServerResponse } from "http";
import { InternalServerError } from "http-errors";
import { HttpContext } from "./declarations";
import { Middleware, Router } from "./index";
import { createContext } from "./context";
import { Route } from "./router/route";
import parseURL from "parse-url";

function middleware(func: any, data: HttpContext): Promise<HttpContext> {
  return new Promise((resolve, reject) => {
    function next(err: any, context: any) {
      if (err) return reject(err);
      resolve(context);
    }
    func({ ...data, next });
  });
}

export interface Routing extends Route {
  handlers: Middleware[];
}

export class App {
  private routes: Routing[] = [];
  server: Server;

  constructor() {
    this.server = createServer(async (request: IncomingMessage, response: ServerResponse) => {
      const item = this.routes.find(route => {
        const url = parseURL(request.url as string).pathname;
        return url.match(route.regexp);
      });

      if (!item) {
        return response.end(JSON.stringify({
          name: "NotFound",
          message: `The ${request.url} not found.`
        }));
      }

      let ctx = createContext({
        req: request,
        res: response,
        route: item,
        result: {}
      });

      for (let i = 0; i < item.handlers.length; i++) {
        try {
          const handler = item.handlers[i];

          if (item.handlers.length - 1 === i) {
            const context = await middleware(handler, ctx);
            ctx.response.status(200).json(context.result);
          }

          const context = await middleware(handler, ctx);
          ctx = { ...ctx, ...context };
        } catch (error: any) {
          const { status, name, message } = error || new InternalServerError();
          ctx.response.status(status).json({ name, message });
        }
      }
    });
  }

  register(router: Router) {
    const items = router.routes.map((route) => {
      const { before, handler, after } = route;
      const handlers = [...before, handler, ...after];
      return { ...route, handlers } as Routing;
    });
    this.routes.push(...items);
  }

  listen(port: number, listener: () => void): void {
    this.server.listen(port, listener);
  }
}
