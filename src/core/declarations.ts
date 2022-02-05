import { IncomingMessage, ServerResponse } from "http";

export interface Query {
  [key: string]: any;
}

export type NextFunction = (err: any, ctx: Partial<HttpContext> | null) => void;

export type Middleware = (ctx: HttpContext) => void | Promise<void>;

export type TypeMiddleware = "before" | "after";

export type HTTP_METHODS = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface MiddlewareMap {
  before: Middleware[];
  after: Middleware[];
}

export type Id = string | number;

export interface Request extends IncomingMessage {
  query?: Query;
  params?: Query;
}

export interface Response extends ServerResponse {
  json: (status: number, message: any) => void;
}

export interface HttpContext {
  request: Request;
  response: Response;
  result: any;
  query?: Query;
  params?: Query;
  next: NextFunction;
}

export interface HandlerMiddleware {
  handle(ctx: HttpContext): Promise<void>;
}

export interface RepositoryMethods<T> {
  create(data: Partial<T>, query?: Query): Promise<T>;
  list(query?: Query): Promise<T[]>;
  get(id: Id, query?: Query): Promise<T>;
  update(id: Id, data: T, query?: Query): Promise<T>;
  patch(id: Id, data: Partial<T>, query?: Query): Promise<T>;
  remove(id: Id, query?: Query): Promise<T>;
}

export interface ControllerMethods {
  create(ctx: HttpContext): Promise<any>;
  list(ctx: HttpContext): Promise<any>;
  get(ctx: HttpContext): Promise<any>;
  update(ctx: HttpContext): Promise<any>;
  patch(ctx: HttpContext): Promise<any>
  remove(ctx: HttpContext): Promise<any>;
}
