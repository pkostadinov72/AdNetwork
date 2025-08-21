import { Context, Next } from 'koa'
import createHttpError from 'http-errors'
import { assetRepository } from '../config/database'

export const authorizeOwnerOrAdmin = async (ctx: Context, next: Next) => {
  const currentUser = ctx.state.user
  const assetId = ctx.params.id

  if (!currentUser) {
    throw new createHttpError[401]('User not authenticated')
  }

  const asset = await assetRepository.findOne({ where: { id: assetId } })

  if (!asset) {
    throw new createHttpError[404](
      `Asset with this ID: ${assetId} was not found.`,
    )
  }

  const isAdmin = currentUser.role === 'admin'
  const isSelf = currentUser.id === asset.ownerId

  if (!isAdmin && !isSelf) {
    throw new createHttpError.Forbidden(
      'You are not authorized to perform this action',
    )
  }

  await next()
}
