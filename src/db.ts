import { createConnection } from "typeorm";
import { Book } from "./books/book.model";

export default createConnection({
  type: "sqlite",
  database: "/etc/todos/todo.db",
  entities: [Book],
  logging: true,
  synchronize: true
});
