import { getRepository } from "typeorm";

import { Book } from "./book.model";

export class BookRepository {
  async create(data: Partial<Book>): Promise<Book> {
    const repository = getRepository(Book);
    const entity = repository.create(data);
    return repository.save(entity);
  }
}
