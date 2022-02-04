import { Router } from "../core";

import { BookController } from "./book.controller";

const router = new Router();
const book = new BookController();

router.get("/books", book.list);
router.get("/books/:id", book.get);

export default router;
