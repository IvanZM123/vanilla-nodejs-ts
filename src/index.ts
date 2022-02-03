import { IncomingMessage, ServerResponse, createServer, Server } from "http";

export interface HttpRequestContext {
  request: IncomingMessage
  response: ServerResponse;
}

export interface HandlerMiddleware {
  type: TypeMiddleware;
  handle: (ctx: HttpRequestContext, next: NextFunction) => void;
}

export type NextFunction = () => void;

export type Middleware = (ctx: HttpRequestContext, next: NextFunction) => void | Promise<void>;

export type HandlerRequest = (ctx: HttpRequestContext) => any;

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
    public handler: HandlerRequest
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

  get(path: string, handler: HandlerRequest) {
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
  private routes: Map<string, (Middleware | HandlerRequest)[]> = new Map();
  server: Server;

  constructor() {
    this.server = createServer(async (request: IncomingMessage, response: ServerResponse) => {
      const { url, method } = request;
      
      const items = this.routes.get(JSON.stringify({ path: url as string, method: method as HTTP_METHODS }));
      
      if (!items || !items.length) {
        response.writeHead(404, { "Content-Type": "application/json" })
        return response.end(JSON.stringify({ name: "NotFound" }));
      }

      if (!(items.length - 1)) {
        const handler = items[0];
        return handler({ request, response }, null as any);
      }

      function processMiddleware(
        middleware: Middleware,
        req: IncomingMessage,
        res: ServerResponse
      ) {
        if (middleware.name !== "handle") {
          return new Promise((resolve) => resolve(false));
        }

        return new Promise((resolve) => {
          middleware({ request: req, response: res }, function () {
            resolve(true);
          });
        });
      }

      for (let item of items) {
        const cb = await processMiddleware(item, request, response);
        if (!cb) {
          return (item as any)({ request, response })
        }
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

bookRouter
  .get("", ({ request, response }) => {
    response.end("My books");
  })
  .middleware({ type: "before", handle: function ({}, next) {
    console.log("1. Im one middleware")
    next();
  } })
  .middleware({ type: "before", handle: function ({}, next) {
    console.log("2. Im two middleware");
    next();
  } })
  .middleware({ type: "before", handle: function ({}, next) {
    console.log("3. Im three middleware");
    next();
  } });

pageRouter
  .get("", ({ request, response }) => {
    response.end("My pages");
  })

app.register(bookRouter);
app.register(pageRouter);

app.listen(3030, () => {
  console.log("App execute on port:3030");
});
