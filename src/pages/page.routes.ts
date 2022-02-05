import { Router } from "../core";

import { ConvertMiddleware } from "./middlewares/convert.middleware";
import { PageController } from "./page.controller";

const BASE_PATH: string = "/books/:bookId/pages";

const router = new Router();
const page = new PageController();

router
  .get(`${BASE_PATH}/:pageId`, page.get.bind(page))
  .middleware("after", new ConvertMiddleware());

export default router;
