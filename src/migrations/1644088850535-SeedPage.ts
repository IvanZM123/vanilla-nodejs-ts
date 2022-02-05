import {MigrationInterface, QueryRunner} from "typeorm";

import { Book } from "../api/books/book.model";
import { Page } from "../api/pages/page.model";

const BODY = `
# Condimentum suscipit nulla et egestas class eget velit iaculis ligula veh

Lorem ipsum dolor sit amet consectetur adipiscing elit fermentum urna, dapibus mattis arcu ligula taciti rutrum tortor risus, torquent ultricies ut sodales metus malesuada commodo nulla. Conubia diam per mattis potenti inceptos porta aenean nec, condimentum quam vulputate pellentesque ridiculus lobortis posuere, dignissim litora pharetra elementum facilisis magnis cras. 

Elementum platea praesent sodales nascetur imperdiet dictum curae nam commodo vivamus, himenaeos a lobortis porta cum rutrum libero mi per, tellus bibendum vel leo venenatis interdum habitant condimentum tortor. 

## Ad luctus diam nam bibendum odio frin

- Eros gravida dictum ad bibendum, dui fusce eu.

- Ac bibendum sapien venenatis, ligula congue.

- Porttitor vehicula tempor class egestas, penatibus laoreet condimentum.

- Dictum nec facilisi conubia donec, felis pellentesque.
`;

export class SeedPage1644088850535 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const bookRepository = queryRunner.connection.getRepository(Book);
    const pageRepository = queryRunner.connection.getRepository(Page);

    const books = await bookRepository.find();

    await Promise.all(
      books.map((book) => {
        const entity = pageRepository.create({ book, body: BODY });
        return pageRepository.save(entity);
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const repository = queryRunner.connection.getRepository(Page);
    await repository.query("DELETE FROM Page");
  }
}
