import "reflect-metadata";
import { createConnection } from "typeorm";

import { App } from "./core";

// Routes.
import BookRoutes from "./api/books/book.routes";
import PageRoutes from "./api/pages/page.routes";

// Initialize app.
const app = new App();

// Connect database.
createConnection();

// Register routes.
app.register(BookRoutes);
app.register(PageRoutes);

// Start the server.
app.listen(3030, () => {
  console.log("App execute in port:3030");
});
