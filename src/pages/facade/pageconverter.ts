import { BadRequest } from "http-errors";

export type Format = "html" | "text";

export class PageConverter {
  convertFile(content: string, format: Format) {
    if (format === "text") {
      return "Convert text/plain";
    }

    if (format === "html") {
      return "Convert text/html";
    }

    throw new BadRequest(`The ${format} is not available`);
  }
}
