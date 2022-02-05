import { ControllerMethods, HttpContext, RepositoryMethods } from "../../core";
import { Page } from "./page.model";

export class PageController implements Partial<ControllerMethods> {
  constructor(private readonly repository: RepositoryMethods<Page>) {}

  async list({ params = {}, next }: HttpContext): Promise<void> {
    try {
      const { bookId = "" } = params;
      const pages = await this.repository.list({ book: bookId });
      next(null, { result: pages });
    } catch (error) {
      next(error, null);
    }
  }

  async get({ params, next }: HttpContext): Promise<void> {
    try {
      const { pageId = "", bookId = "" } = params || {};
      const page = await this.repository.get(pageId, { book: bookId });
      next(null, { result: page });
    } catch (error) {
      next(error, null);
    }
  }
}
