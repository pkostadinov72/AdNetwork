import createHttpError from 'http-errors'
import { Context } from 'koa'
import { searchAllService } from './search.service'

export const searchAll = async (ctx: Context) => {
  const query = ctx.query.q as string

  if (!query) {
    throw createHttpError(400, 'Missing search query')
  }

  const results = await searchAllService(query, {
    id: ctx.state.user.id,
    role: ctx.state.user.role,
  })
  ctx.body = results
}
