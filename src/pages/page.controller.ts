import { ControllerMethods, HttpContext } from "../core";

export class PageController implements Partial<ControllerMethods> {
  async list({ next }: HttpContext): Promise<void> {
    next(null, { result: { message: "List of pages" } });
  }
}
