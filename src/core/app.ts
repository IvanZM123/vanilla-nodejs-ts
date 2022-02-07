import { Server, IncomingMessage, ServerResponse } from 'http'
import { InternalServerError } from 'http-errors'
import { HttpContext } from './declarations'
import { Middleware, Router } from './index'
import { createContext } from './context'
import { Route } from './router/route'
import parseURL from 'parse-url'

export interface Routing extends Route {
  handlers: Middleware[];
}

export class App extends Server {
  private routes: Routing[] = [];

  constructor () {
    super((req, res) => this.bootstrap(req, res))
  }

  private async bootstrap (request: IncomingMessage, response: ServerResponse) {
    const item = this.routes.find(route => {
      const url = parseURL(request.url as string).pathname
      return url.match(route.regexp)
    })

    if (!item) {
      return response.end(JSON.stringify({
        name: 'NotFound',
        message: `The ${request.url} not found.`
      }))
    }

    let ctx = createContext({
      req: request,
      res: response,
      route: item,
      result: {}
    })

    for (let i = 0; i < item.handlers.length; i++) {
      try {
        const handler = item.handlers[i]

        if (item.handlers.length - 1 === i) {
          const context = await this.handlerRequest(handler, ctx)
          ctx.response.status(200).json(context.result)
        }

        const context = await this.handlerRequest(handler, ctx)
        ctx = { ...ctx, ...context }
      } catch (error: any) {
        const { status, name, message } = error || new InternalServerError()
        ctx.response.status(status).json({ name, message })
      }
    }
  }

  private async handlerRequest (func: any, http: HttpContext): Promise<HttpContext> {
    return new Promise((resolve) => {
      function next (err: any, context: any) {
        if (err || !context) {
          const { status = 500, name, message } = err || new InternalServerError()
          return http.response.status(status).json({ name, message })
        };
        resolve(context)
      }
      func({ ...http, next })
    })
  }

  register (router: Router): void {
    const items = router.routes.map((route) => {
      const { before, handler, after } = route
      const handlers = [...before, handler, ...after]
      return { ...route, handlers } as Routing
    })
    this.routes.push(...items)
  }
}
