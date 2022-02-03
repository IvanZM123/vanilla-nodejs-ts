import { Server, createServer, IncomingMessage, ServerResponse } from "http";
import { HTTP_METHODS, Middleware, Router } from "./index";

export class App {
  private routes: Map<string, Middleware[]> = new Map();
  server: Server;

  constructor() {
    this.server = createServer(async (request: IncomingMessage, response: ServerResponse) => {
      const { url, method } = request;
      let result = {};

      const items = this.routes.get(JSON.stringify({ path: url as string, method: method as HTTP_METHODS }));
      
      if (!items || !items.length) {
        response.writeHead(404, { "Content-Type": "application/json" })
        return response.end(JSON.stringify({ name: "NotFound" }));
      }

      function processMiddleware(
        middleware: Middleware,
        req: IncomingMessage,
        res: ServerResponse
      ) {
        return new Promise((resolve) => {
          function next() {
            resolve(true);
          }

          middleware({ request: req, response: res, result, next });
        });
      }

      for (let i = 0; i < items.length; i++) {
        if (items.length - 1 === i) {
          function next() {
            response.end(JSON.stringify(result));
          }
          return items[i]({ request, response, result, next });
        }
        await processMiddleware(items[i], request, response);
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
