import { Server, createServer, IncomingMessage, ServerResponse } from "http";
import { Request, Response } from "./declarations";
import { Middleware, Router } from "./index";
import { createContext } from "./context";
import { Route } from "./router/route";
import parseURL from "parse-url";

function processMiddleware(middleware: Middleware, req: Request, res: Response, result: any) {
  return new Promise((resolve) => {
    function next() {
      resolve(true);
    }

    middleware({ request: req, response: res, result, next });
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
        request.url = parseURL(request.url as string).pathname;
        return request.url?.match(route.regexp);
      });

      if (!item) {
        return response.end(JSON.stringify({
          name: "NotFound",
          message: `The ${request.url} not found.`
        }));
      }

      const ctx = createContext({ req: request, res: response, route: item });

      for (let i = 0; i < item.handlers.length; i++) {
        if (item.handlers.length - 1 === i) {
          function next() {
            ctx.response.json(200, ctx.result);
          }
          return item.handlers[i]({ ...ctx, next });
        }
        await processMiddleware(item.handlers[i], ctx.request, ctx.response, result);
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
