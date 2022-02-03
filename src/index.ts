import { App } from "./core/index";

const app = new App();

app.listen(3030, () => {
  console.log("App execute in port:3030");
});
