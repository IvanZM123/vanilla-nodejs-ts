import { IncomingMessage, ServerResponse } from "http";

export class Response extends ServerResponse {
  constructor(
    readonly req: IncomingMessage,
    private readonly res: ServerResponse
  ) {
    super(req);
  }

  status(status: number): Response {
    this.res.statusCode = status;
    return this;
  }

  send(message: any) {
    this.res.writeHead(this.res.statusCode);
    this.res.end(message);    
  }

  html(data: string) {
    this.res.writeHead(this.res.statusCode, { "Content-Type": "text/html" });
    this.res.end(data);
  }

  json(data: Record<string, any>) {
    this.res.writeHead(this.res.statusCode, { "Content-Type": "application/json" });
    this.res.end(JSON.stringify(data));
  }
}
