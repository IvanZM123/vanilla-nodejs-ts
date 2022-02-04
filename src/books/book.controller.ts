import { HttpRequestContext } from "../core";

export class BookController {
  constructor(private repository: any) {}

  async list({ next, response }: HttpRequestContext): Promise<void> {
    try {
      const data = await this.repository.create({
        title: "El Principito",
        author: "Ivan Zaldivar",
        category: "Fantasia"
      });
      next(null, { result: data });
    } catch (error) {
      console.error(error);
      response.json(404, { message: "Un error" });
    }
  }

  async get({ next }: HttpRequestContext): Promise<void> {
    next(null, { result: { message: "Get Book Controller" } });
  }
}
