import {
  HandlerMiddleware,
  HTTP_METHODS,
  Middleware,
  TypeMiddleware
} from "../index";

export class Route {
  readonly before: Middleware[] = []
  readonly after: Middleware[] = [];

  constructor(
    public path: string,
    public method: HTTP_METHODS,
    public handler: Middleware
  ) {}

  middleware(type: TypeMiddleware, middleware: HandlerMiddleware) {
    type === "before"
      ? this.before.push(middleware.handle)
      : this.after.push(middleware.handle);
    return this;
  }
}
