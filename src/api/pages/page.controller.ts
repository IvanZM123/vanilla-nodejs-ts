import { ControllerMethods, HttpContext } from "../../core";
import { Page } from "./page.model";

const page: Page = {
  id: "1",
  bookId: "1",
  body: "# Filesrocket\n\n Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

export class PageController implements Partial<ControllerMethods> {
  async get({ next }: HttpContext): Promise<void> {
    next(null, { result: page });
  }
}
