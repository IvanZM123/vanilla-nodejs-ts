import { getRepository } from "typeorm";
import { NotFound } from "http-errors";

import { Id, Query, RepositoryMethods } from "../../core";
import { Book } from "./book.model";

export class BookRepository implements RepositoryMethods<Book> {
  async create(data: Partial<Book>, query: Query = {}): Promise<Book> {
    const repository = getRepository(Book);
    const entity = repository.create(data);
    return repository.save(entity);
  }

  async list(query: Query = {}): Promise<Book[]> {
    const repository = getRepository(Book);
    return repository.find(query);
  }

  async get(id: Id, query: Query = {}): Promise<Book> {
    const repository = getRepository(Book);

    const entity = await repository.findOne(id, query);
    if (!entity) throw new NotFound("Th book not exist");

    return entity;
  }

  async update(id: Id, data: Book, query: Query = {}): Promise<Book> {
    const repository = getRepository(Book);

    const entity = await this.get(id, query);
    await repository.update(id, data);

    return entity;
  }

  async patch(id: Id, data: Partial<Book>, query: Query = {}): Promise<Book> {
    const repository = getRepository(Book);

    const entity = await this.get(id, query);
    await repository.update(id, { ...entity, ...data });

    return entity;
  }

  async remove(id: Id, query: Query = {}): Promise<Book> {
    const repository = getRepository(Book);

    const entity = await this.get(id);
    await repository.delete(id);

    return entity;
  }
}
