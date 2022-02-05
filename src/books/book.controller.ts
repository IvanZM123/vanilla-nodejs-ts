import { HttpContext, RepositoryMethods } from "../core";
import { Book } from "./book.model";

export class BookController {
  constructor(private repository: RepositoryMethods<Book>) {}

  async list({ next, query }: HttpContext): Promise<void> {
    try {
      const data = await this.repository.list(query);
      next(null, { result: data });
    } catch (error) {
      next(error, {});
    }
  }

  async get({ next }: HttpContext): Promise<void> {
    next(null, { result: { message: "Get Book Controller" } });
  }
}
