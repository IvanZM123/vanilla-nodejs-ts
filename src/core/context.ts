import { IncomingMessage, ServerResponse } from "http";
import { Route } from "./router/route";
import { match } from "path-to-regexp";
import parseURL from "parse-url";

import { HttpContext, Request } from "./index";
import { Response } from "./router/response";

export interface ContextCreator<T> {
  handler: T;
  layer: Route;
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
  [key: string]: any;
}

export function createContext({ req, res, route }: ContextOptions): HttpContext {
  const request = createRequest({ handler: req as Request, layer: route });
  const response = new Response(req, res);

  return {
    request,
    response,
    query: request.query,
    params: request.params
  } as HttpContext;
}
