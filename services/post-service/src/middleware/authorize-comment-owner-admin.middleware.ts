import { Context, Next } from 'koa'
import createHttpError from 'http-errors'
import { commentRepository } from '../config/database'

export const authorizeCommentOwnerOrAdmin = async (
  ctx: Context,
  next: Next,
) => {
  const currentUser = ctx.state.user
  const commentId = ctx.params.commentId

  if (!currentUser) {
    throw new createHttpError[401]('User not authenticated')
  }

  const post = await commentRepository.findOne({ where: { id: commentId } })

  if (!post) {
    throw new createHttpError[404](
      `Comment with this ID: ${commentId} was not found.`,
    )
  }

  const isAdmin = currentUser.role === 'admin'
  const isSelf = currentUser.id === post.userId

  if (!isAdmin && !isSelf) {
    throw new createHttpError.Forbidden(
      'You are not authorized to perform this action',
    )
  }

  await next()
}
