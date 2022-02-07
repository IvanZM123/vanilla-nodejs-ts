import { BadRequest } from 'http-errors'

import { HandlerMiddleware, HttpContext } from '../../../core'

import { Converter } from '../helpers/converter'
import { HtmlStrategy } from '../helpers/strategies/html.strategy'
import { TextStrategy } from '../helpers/strategies/text.strategy'

export class ConvertMiddleware implements HandlerMiddleware {
  async handle ({ result, query, response, next }: HttpContext): Promise<void> {
    const { format } = query || {}

    if (!format) return next(null, { result })

    const strategies = {
      html: HtmlStrategy,
      text: TextStrategy
    }

    const Strategy = (strategies as any)[format]
    if (!Strategy) {
      const error = new BadRequest(`The ${format} not available`)
      return next(error, null)
    }

    const converter = new Converter()
    const data = await converter.convertFile(result.body, new Strategy())

    format === 'html'
      ? response.status(200).html(data)
      : response.status(200).send(data)
  }
}
