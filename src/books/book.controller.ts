import { HttpRequestContext } from "../core";

export class BookController {
  async list({ request, next }: HttpRequestContext): Promise<void> {
    console.log("Hi from controller of LIST method");
    console.log("Query: ", request.query);
    next();
  }

  async get({ params, next }: HttpRequestContext): Promise<void> {
    console.log("Hi from controller of GET method");
    console.log(params);
    next();
  }
}
