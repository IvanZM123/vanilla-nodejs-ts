import "reflect-metadata";

import { App } from "./core";
import "./db";

// Routes.
import BookRoutes from "./api/books/book.routes";
import PageRoutes from "./api/pages/page.routes";

const app = new App();

app.register(BookRoutes);
app.register(PageRoutes);

app.listen(3030, () => {
  console.log("App execute in port:3030");
});