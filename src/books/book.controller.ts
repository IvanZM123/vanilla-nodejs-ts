import { ControllerMethods, HttpContext, RepositoryMethods } from "../core";
import { Book } from "./book.model";

export class BookController implements Partial<ControllerMethods> {
  constructor(private repository: RepositoryMethods<Book>) {}

  async list({ next, query }: HttpContext): Promise<void> {
    try {
      const data = await this.repository.list(query);
      next(null, { result: data });
    } catch (error) {
      next(error, {});
    }
  }

  async get({ params, next }: HttpContext): Promise<void> {
    try {
      const result = await this.repository.get(params?.id);
      next(null, { result });
    } catch (error) {
      next(error, null);
    }
  }
}
