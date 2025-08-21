import Router from 'koa-router'

import {
  uploadAsset,
  getAssetById,
  getAllAssets,
  deleteAsset,
  getAssetByOwnerId,
} from './asset.controller'
import { validatorMiddleware } from '../middleware/validator.middleware'
import { uploadAssetSchema } from './asset-validation.schema'
import { authorizeUserOrAdmin } from '../middleware/authorize-user-admin.middleware'
import { authorizeOwnerOrAdmin } from '../middleware/authorize-owner-admin.middleware'

//TODO FIX AUTHORIZATION MIDDLEWARE TO WORK WITH POSTS.

export const assetRouter = new Router({ prefix: '/assets' })

assetRouter.post(
  '/',
  validatorMiddleware(uploadAssetSchema),
  // authorizeUserOrAdmin,
  uploadAsset,
)

assetRouter.get('/', getAllAssets)

assetRouter.get('/:id', getAssetById)

assetRouter.get('/by-owner/:ownerId', getAssetByOwnerId)

assetRouter.delete(
  '/:id',
  // authorizeOwnerOrAdmin,
  deleteAsset,
)
