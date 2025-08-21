import { Context, Next } from 'koa'
import createHttpError from 'http-errors'
import { UserRole } from '../entities/User'

export const authorizeUserOrAdmin = async (ctx: Context, next: Next) => {
  const currentUser = ctx.state.user
  const targetUserId = ctx.params.id

  if (!currentUser) {
    throw new createHttpError[401]('User not authenticated')
  }

  const isAdmin = currentUser.role === UserRole.ADMIN
  const isSelf = currentUser.id === targetUserId

  if (!isAdmin && !isSelf) {
    throw new createHttpError.Forbidden(
      'You are not authorized to perform this action',
    )
  }

  await next()
}
