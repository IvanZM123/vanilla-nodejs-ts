import { Middleware } from "../index";
import { Route } from "./route";

export class Router {
  private items: Route[] = []

  constructor(public readonly path: string) {}

  get(path: string, handler: Middleware) {
    const fullpath = `${this.path}${path}`

    const route = new Route(fullpath, "GET", handler);
    this.items.push(route);

    return route;
  }

  get routes(): Route[] {
    return this.items;
  }
}
