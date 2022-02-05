import { ControllerMethods, HttpContext, RepositoryMethods } from "../../core";
import { Page } from "./page.model";

export class PageController implements Partial<ControllerMethods> {
  constructor(private readonly repository: RepositoryMethods<Page>) {}

  async list({ params = {}, next }: HttpContext): Promise<void> {
    const { bookId = "" } = params;
    const pages = await this.repository.list({ book: bookId });
    next(null, { result: pages });
  }

  async get({ next }: HttpContext): Promise<void> {
    next(null, { result: { message: "Get one page" } });
  }
}
