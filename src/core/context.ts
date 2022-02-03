import { HttpRequestContext, Response, Request } from "./index";
import { IncomingMessage, ServerResponse } from "http";

function createResponse(response: Response): Response {
  response.json = function (status: number, message: any) {
    response.writeHead(status, { "Content-Type": "application/json" });
    response.end(JSON.stringify(message));
  }

  return response;
}

function createRequest(req: Request): Request {
  return req;
}

export function createContext(
  req: IncomingMessage,
  res: ServerResponse
): HttpRequestContext {
  let result: any = {};

  const response = createResponse(res as Response);
  const request = createRequest(req as Request);

  return {
    result,
    request,
    response
  } as HttpRequestContext;
}
