import { getConnection } from "typeorm";
// import supertest from "supertest";
import app from "../src/index";

// const request = supertest(app);

afterAll(() => {
  getConnection()
    .close()
    .then(() => console.log("Close"))
    .catch(console.error);
  app.close((err) => console.log(err));
});

describe("GET /books", () => {
  test("Get all books", () => {
    expect(2 + 2).toBe(4);
  });
});
