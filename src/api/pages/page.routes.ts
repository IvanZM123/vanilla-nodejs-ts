import { Router } from '../../core'

import { ConvertMiddleware } from './middlewares/convert.middleware'
import { PageController } from './page.controller'
import { PageRepository } from './page.repository'

const BASE_PATH: string = '/books/:bookId/pages'

const router = new Router()
const page = new PageController(new PageRepository() as any)

router.get(BASE_PATH, page.list.bind(page))
router
  .get(`${BASE_PATH}/:pageId`, page.get.bind(page))
  .middleware('after', new ConvertMiddleware())

export default router
