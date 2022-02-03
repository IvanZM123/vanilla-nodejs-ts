import {
  HandlerMiddleware,
  HTTP_METHODS,
  Middleware,
  TypeMiddleware
} from "../index";
import { pathToRegexp } from "path-to-regexp";

export class Route {
  readonly before: Middleware[] = []
  readonly after: Middleware[] = [];
  readonly regexp: RegExp;
  readonly keys = [];

  constructor(
    public path: string,
    public method: HTTP_METHODS,
    public handler: Middleware
  ) {
    this.regexp = pathToRegexp(path, this.keys);
  }

  middleware(type: TypeMiddleware, middleware: HandlerMiddleware) {
    type === "before"
      ? this.before.push(middleware.handle)
      : this.after.push(middleware.handle);
    return this;
  }
}
