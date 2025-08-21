import { Context, Next } from 'koa'
import createHttpError from 'http-errors'
import { postRepository } from '../config/database'

export const authorizeOwnerOrAdmin = async (ctx: Context, next: Next) => {
  const currentUser = ctx.state.user
  const postId = ctx.params.id

  if (!currentUser) {
    throw new createHttpError[401]('User not authenticated')
  }

  const post = await postRepository.findOne({ where: { id: postId } })

  if (!post) {
    throw new createHttpError[404](
      `Post with this ID: ${postId} was not found.`,
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
