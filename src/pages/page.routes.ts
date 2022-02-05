import { Router } from "../core";
import { PageController } from "./page.controller";

const BASE_PATH: string = "/books/:bookId/pages";

const router = new Router();
const page = new PageController();

router.get(BASE_PATH, page.list.bind(page));

export default router;
