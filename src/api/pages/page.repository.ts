import { getRepository } from "typeorm";
import { NotFound } from "http-errors";

import { Id, Query, RepositoryMethods } from "../../core";
import { Page } from "./page.model";

export class PageRepository implements Partial<RepositoryMethods<Page>> {
  async list(query: Query = {}): Promise<Page[]> {
    const repository = getRepository(Page);
    return repository.find(query);
  }

  async get(id: Id, query: Query = {}): Promise<Page> {
    const repository = getRepository(Page);

    const items = await repository.find({ id: id as any, ...query });

    const entity = items[0];
    if (!entity) throw new NotFound("The page does not exist");

    return entity;
  }
}
