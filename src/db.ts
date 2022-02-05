import { createConnection } from "typeorm";

// Models.
import { Book } from "./api/books/book.model";
import { Page } from "./api/pages/page.model";

export default createConnection({
  type: "sqlite",
  database: "/etc/todos/todo.db",
  entities: [Book, Page],
  logging: true,
  synchronize: true
});
