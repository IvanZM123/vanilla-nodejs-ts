import { IncomingMessage, ServerResponse, createServer, Server } from "http";

export interface HttpRequestContext {
  request: IncomingMessage
  response: ServerResponse;
  result: any;
  next: () => void;
}

export interface HandlerMiddleware {
  type: TypeMiddleware;
  handle: (ctx: HttpRequestContext) => void;
}

export type NextFunction = () => void;

export type Middleware = (ctx: HttpRequestContext) => void | Promise<void>;

export type TypeMiddleware = "before" | "after";

export type HTTP_METHODS = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface MiddlewareMap {
  before: Middleware[];
  after: Middleware[];
}

export class Route {
  readonly before: Middleware[] = []
  readonly after: Middleware[] = [];

  constructor(
    public path: string,
    public method: HTTP_METHODS,
    public handler: Middleware
  ) {}

  middleware(middleware: HandlerMiddleware) {
    middleware.type === "before"
      ? this.before.push(middleware.handle)
      : this.after.push(middleware.handle);
    return this;
  }
}

export interface RequestKey {
  path: string;
  method: HTTP_METHODS;
}

export class Router {
  private items: Route[] = []

  constructor(public readonly path: string) {}

  get(path: string, handler: Middleware) {
    const fullpath = `${this.path}${path}`

    const route = new Route(fullpath, "GET", handler);
    this.items.push(route);

    return route;
  }

  get routes() {
    return this.items;
  }
}

export class App {
  private routes: Map<string, (Middleware)[]> = new Map();
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

const app = new App();

const bookRouter = new Router("/books");
const pageRouter = new Router("/pages");

class AuthMiddleware implements HandlerMiddleware {
  type: TypeMiddleware = "before";

  handle({ next }: HttpRequestContext) {
    console.log("Im before middleware");
    next()
  }
}

class NotifyEmail implements HandlerMiddleware {
  type: TypeMiddleware = "after";

  handle ({ next }: HttpRequestContext) {
    console.log("Send email");
    next();
  }
}

bookRouter
  .get("", ({ result, response, next }): any => {
    // response.end(JSON.stringify({ name: "Books" }));
    // response.writeHead(200, { "Content-Type": "" })
    // response.end("<h1>Books</h1>")
    result.firstName = "Ivan"
    result.lastName = "Zaldivar"
    console.log("Handler")
    // response.writeHead(200, { "Content-Type": "text/html" })
    // return response.end(`<h1>Hi ${result.firstName} ${result.lastName}</h1>`);
    next();
  })
  .middleware(new AuthMiddleware())
  .middleware(new NotifyEmail());

pageRouter
  .get("", ({ response }): any => {
    return response.end(JSON.stringify({ name: "Pages" }));
  })

app.register(bookRouter);
app.register(pageRouter);

app.listen(3030, () => {
  console.log("App execute on port:3030");
});
