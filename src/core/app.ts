import { Server, createServer, IncomingMessage, ServerResponse } from "http";
import { HttpRequestContext } from "./declarations";
import { Middleware, Router } from "./index";
import { createContext } from "./context";
import { Route } from "./router/route";
import parseURL from "parse-url";

function processMiddleware(middleware: Middleware, context: HttpRequestContext): Promise<HttpRequestContext> {
  return new Promise((resolve, reject) => {
    function next(err: any, ctx: Partial<HttpRequestContext>) {
      if (err) return reject(err);
      resolve(ctx as HttpRequestContext);
    }

    middleware({ ...context, next });
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
      let result = {};
      
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

      let ctx = createContext({ req: request, res: response, route: item });

      for (let i = 0; i < item.handlers.length; i++) {
        try {
          const context = await processMiddleware(item.handlers[i], { ...ctx, result });
          ctx = { ...ctx, ...context };
          ctx.response.json(200, ctx.result);
        } catch (error) {
          ctx.response.json(404, error)
          break;
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
