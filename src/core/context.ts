import { HttpRequestContext, Response, Request } from "./index";
import { IncomingMessage, ServerResponse } from "http";
import { Route } from "./router/route";
import { match } from "path-to-regexp";
import parseURL from "parse-url";

export interface ContextCreator<T> {
  handler: T;
  layer: Route;
}

function createResponse({ handler }: ContextCreator<Response>): Response {
  handler.json = function (status: number, message: any) {
    handler.writeHead(status, { "Content-Type": "application/json" });
    handler.end(JSON.stringify(message));
  }

  return handler;
}

function createRequest({ handler, layer }: ContextCreator<Request>): Request {
  // Generate query.
  const parseUrl = parseURL(handler.url as string)
  handler.url = parseUrl.pathname;
  handler.query = parseUrl.query;

  const matcher = match(layer.path, { decode: decodeURIComponent });
  const result = matcher(handler.url);
  handler.params = (result as any).params;

  return handler;
}

export interface ContextOptions {
  req: IncomingMessage;
  res: ServerResponse;
  route: Route;
}

export function createContext({ req, res, route }: ContextOptions): HttpRequestContext {
  let result: any = {};

  const response = createResponse({ handler: res as Response, layer: route });
  const request = createRequest({ handler: req as Request, layer: route });

  return {
    result,
    request,
    response,
    query: request.query,
    params: request.params
  } as HttpRequestContext;
}
