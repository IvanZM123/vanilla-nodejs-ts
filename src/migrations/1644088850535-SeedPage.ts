import { MigrationInterface, QueryRunner } from "typeorm";

import { generateRandomNumber, generateRandomText } from "../utils/random";

import { Book } from "../api/books/book.model";
import { Page } from "../api/pages/page.model";

export class SeedPage1644088850535 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const bookRepository = queryRunner.connection.getRepository(Book);
    const pageRepository = queryRunner.connection.getRepository(Page);

    const books = await bookRepository.find();

    const pages: Partial<Page>[] = books.map((book) => {
      const randomNumber: number = generateRandomNumber(1, 10);
      const entities: Partial<Page>[] = [];

      for (let i = 0; i < randomNumber; i++) {
        const body: string = generateRandomText();
        
        const entity = pageRepository.create({
          book,
          pageNumber: i + 1,
          body
        });

        entities.push(entity);
      }

      return entities;
    }).flat();

    await pageRepository.save(pages);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const repository = queryRunner.connection.getRepository(Page);
    await repository.query("DELETE FROM Page");
  }
}
