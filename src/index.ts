import "reflect-metadata";

import { App } from "./core";
import "./db";

// Routes.
import BookRoutes from "./books/book.routes";
import PageRoutes from "./pages/page.routes";

const app = new App();

app.register(BookRoutes);
app.register(PageRoutes);

app.listen(3030, () => {
  console.log("App execute in port:3030");
});