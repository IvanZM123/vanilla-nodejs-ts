import { MigrationInterface, QueryRunner } from "typeorm";
import { Book } from "../api/books/book.model";

const books: Partial<Book>[] = [{
  title: "Shaolin Temple (Shao Lin si)",
  author: "Fara Pusill",
  category: "Action|Adventure|Drama"
}, {
  title: "Hold That Ghost",
  author: "Rab Blackesland",
  category: "Adventure|Comedy"
}, {
  title: "Forever Amber",
  author: "Leeland Switzer",
  category: "Drama"
}, {
  title: "Kingdom of the Spiders",
  author: "Garvy Juanes",
  category: "Horror|Sci-Fi"
}, {
  title: "Magic Sword, The",
  author: "Corena Morley",
  category: "Drama|Fantasy"
}, {
  title: "One Man Up (L'uomo in più)",
  author: "Marlene Kenn",
  category: "Comedy|Drama"
}, {
  title: "Ballet Shoes",
  author: "Damita Ringsell",
  category: "Children|Drama"
}, {
  title: "Christmas Toy, The",
  author: "Karie Oddy",
  category: "Children|Musical"
}, {
  title: "Fahrenheit 451",
  author: "Gianna Shawyer",
  category: "Drama|Sci-Fi"
}, {
  title: "Child Is Waiting, A",
  author: "Kim Whissell",
  category: "Drama"
}]

export class SeedBook1644076917931 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const repository = queryRunner.connection.getRepository(Book);

    await Promise.all(
      books.map((book) => {
        const entity = repository.create(book);
        return repository.save(entity);
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const repository = queryRunner.connection.getRepository(Book);
    await repository.query("DELETE FROM Book");
  }
}
