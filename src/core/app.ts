import { Server, createServer, IncomingMessage, ServerResponse } from "http";
import { HTTP_METHODS, Middleware, Router } from "./index";
import { Request, Response } from "./declarations";
import { createContext } from "./context";

function processMiddleware(
  middleware: Middleware,
  req: Request,
  res: Response,
  result: any
) {
  return new Promise((resolve) => {
    function next() {
      resolve(true);
    }

    middleware({ request: req, response: res, result, next });
  });
}

export class App {
  private routes: Map<string, Middleware[]> = new Map();
  server: Server;

  constructor() {
    this.server = createServer(async (request: IncomingMessage, response: ServerResponse) => {
      const { url = "", method = "" } = request;
      let result = {};

      const ctx = createContext(request, response);

      const key = JSON.stringify({ path: url, method: method as HTTP_METHODS });
      const items = this.routes.get(key);
      
      if (!items || !items.length) {
        return ctx.response.json(404, { name: "NotFound" });
      }

      for (let i = 0; i < items.length; i++) {
        if (items.length - 1 === i) {
          function next() {
            ctx.response.json(200, ctx.result);
          }
          return items[i]({ ...ctx, next });
        }
        await processMiddleware(items[i], ctx.request, ctx.response, result);
      }
    });
  }

  register(router: Router) {
    router.routes.forEach(route => {
      const { before, handler, after, path, method } = route;

      const handlers = [...before, handler, ...after];
      const key = { path, method }

      this.routes.set(JSON.stringify(key), handlers);
    });
  }

  listen(port: number, listener: () => void): void {
    this.server.listen(port, listener);
  }
}
