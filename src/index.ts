import "reflect-metadata";

import { createConnection } from "typeorm";
import { Book } from "./books/book.model";

import { App } from "./core";

// Routes.
import BookRoutes from "./books/book.routes";
import PageRoutes from "./pages/page.routes";

const app = new App();

createConnection({
  type: "sqlite",
  database: "/etc/todos/todo.db",
  entities: [Book],
  logging: true,
  synchronize: true
})

app.register(BookRoutes);
app.register(PageRoutes);

app.listen(3030, () => {
  console.log("App execute in port:3030");
});