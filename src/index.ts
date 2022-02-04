import { App } from "./core/index";

// Routes.
import BookRoutes from "./books/book.routes";

const app = new App();

app.register(BookRoutes);

app.listen(3030, () => {
  console.log("App execute in port:3030");
});
