import { HttpContext } from '../declarations'
import { Middleware } from '../index'
import { Route } from './route'

export interface Controller {
  list(ctx: HttpContext): Promise<any>;
}

export class Router {
  private items: Route[] = [];

  get (path: string, handler: Middleware) {
    const route = new Route(path, 'GET', handler)
    this.items.push(route)
    return route
  }

  get routes (): Route[] {
    return this.items
  }
}
