import { Router } from "../core";
import { BookController } from "./book.controller";

const router = new Router();

const controller = new BookController();

router.get("/books", controller.list);
router.get("/books/:bookId", controller.get);

export default router;
