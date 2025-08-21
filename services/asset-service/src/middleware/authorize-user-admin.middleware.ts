import { Context, Next } from 'koa'
import createHttpError from 'http-errors'

export const authorizeUserOrAdmin = async (ctx: Context, next: Next) => {
  const currentUser = ctx.state.user
  const targetOwnerId = ctx.request.body.ownerId

  if (!currentUser) {
    throw new createHttpError[401]('User not authenticated')
  }

  const isAdmin = currentUser.role === 'admin'
  const isSelf = currentUser.id === targetOwnerId

  if (!isAdmin && !isSelf) {
    throw new createHttpError.Forbidden(
      'You are not authorized to perform this action',
    )
  }

  await next()
}
