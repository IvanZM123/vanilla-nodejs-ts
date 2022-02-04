import { HttpRequestContext } from "../core";

export class BookController {
  async list({ next }: HttpRequestContext): Promise<void> {
    next(null, { result: { message: "List Book Controller" } });
  }

  async get({ next }: HttpRequestContext): Promise<void> {
    next(null, { result: { message: "Get Book Controller" } });
  }
}
