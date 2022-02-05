import { HandlerMiddleware, HttpContext } from "../../core";
import { PageConverter } from "../facade/pageconverter";

export class ConvertMiddleware implements HandlerMiddleware {
  async handle({ result, query, response, next }: HttpContext): Promise<void> {
    if (query?.format) {
      const converter = new PageConverter();
      converter.convertFile(result.body, query?.format || "text");
      
      return;
    }

    next(null, { result });
  }
}
