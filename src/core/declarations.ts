import { IncomingMessage, ServerResponse } from "http";

export interface HttpRequestContext {
  request: IncomingMessage
  response: ServerResponse;
  result: any;
  next: () => void;
}

export interface HandlerMiddleware {
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
