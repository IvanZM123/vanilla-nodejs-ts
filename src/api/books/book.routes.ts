import { Router } from "../../core";

import { BookController } from "./book.controller";
import { BookRepository } from "./book.repository";

const router = new Router();
const book = new BookController(new BookRepository());

router.get("/books", book.list.bind(book));
router.get("/books/:id", book.get.bind(book));

export default router;
