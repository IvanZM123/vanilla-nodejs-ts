import { getConnection } from "typeorm";
import supertest from "supertest";
import app from "../src/index";

const request = supertest(app);

afterAll(() => {
  getConnection()
    .close()
    .then(() => console.log("Close connection"))
    .catch(console.error);
  
  app.close();
});

describe("GET /books", () => {
  test("Get all books", () => {
    request
      .get("/books")
      .expect("Content-Type", /json/)
      .expect(404)
  });
});
