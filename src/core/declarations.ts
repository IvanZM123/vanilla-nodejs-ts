import { IncomingMessage, ServerResponse } from "http";

export interface Request extends IncomingMessage {}

export interface Response extends ServerResponse {
  json: (status: number, message: any) => void;
}

export interface HttpRequestContext {
  request: Request;
  response: Response;
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
