import { HttpRequestContext } from "../core";

export class BookController {
  async list({ query, next }: HttpRequestContext): Promise<void> {
    console.log("Query: ", query);
    next(null, { result: { message: "List of books" } });
  }
}
