import { getConnection, createConnection } from "typeorm";
import supertest from "supertest";
import app from "../src/index";

const request = supertest(app);

beforeAll(() => {
  createConnection()
    .then(console.log)
    .catch(console.error);
});

afterAll(() => {
  getConnection()
    .close()
    .then(() => console.log("Close"))
    .catch(console.error);
  app.close((err) => console.log(err));
});

describe("GET /books", () => {
  test("Get all books", async () => {
    await request
      .get("/books")
      .expect(200);
  });
});
