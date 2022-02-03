import { App, Router } from "./core/index";

const app = new App();

const router = new Router();

router.get("/books", ({ result, next }) => {
  result.fullname = "Ivan Zaldivar";
  next();
})

app.register(router);

app.listen(3030, () => {
  console.log("App execute in port:3030");
});
