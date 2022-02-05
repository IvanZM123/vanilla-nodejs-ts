import { getRepository } from "typeorm";

import { Query, RepositoryMethods } from "../../core";
import { Page } from "./page.model";

export class PageRepository implements Partial<RepositoryMethods<Page>> {
  async list(query: Query = {}): Promise<Page[]> {
    const repository = getRepository(Page);
    return repository.find(query);
  }
}
