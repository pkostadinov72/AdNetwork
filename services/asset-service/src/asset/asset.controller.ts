import { Context } from 'koa'
import {
  uploadAssetService,
  getAssetByIdService,
  getAllAssetsService,
  deleteAssetService,
  getAssetByOnwerIdService,
} from './asset.service'
import createHttpError from 'http-errors'
import { getXUserHeader } from '../utils/assetUtils'

export const uploadAsset = async (ctx: Context) => {
  const { fileName, fileType, ownerId, ownerType, assetType } = ctx.request.body

  const file = ctx.request.files?.file

  if (!file) {
    throw new createHttpError.BadRequest('No file uploaded')
  }

  const uploadedFile = Array.isArray(file) ? file[0] : file

  const asset = await uploadAssetService(
    uploadedFile,
    fileName,
    fileType,
    ownerId,
    ownerType,
    assetType,
    getXUserHeader(ctx),
  )

  ctx.status = 201
  ctx.body = asset
}

export const getAllAssets = async (ctx: Context) => {
  const assets = await getAllAssetsService()
  ctx.status = 200
  ctx.body = assets
}

export const getAssetById = async (ctx: Context) => {
  const { id } = ctx.params
  const asset = await getAssetByIdService(id)

  ctx.status = 200
  ctx.body = asset
}

export const getAssetByOwnerId = async (ctx: Context) => {
  const { ownerId } = ctx.params
  const asset = await getAssetByOnwerIdService(ownerId)

  ctx.status = 200
  ctx.body = asset
}

export const deleteAsset = async (ctx: Context) => {
  const { id } = ctx.params

  const xUserHeader = ctx.headers['x-user']

  if (typeof xUserHeader !== 'string') {
    throw new createHttpError.Unauthorized('Invalid or Missing x-user header')
  }

  await deleteAssetService(id, getXUserHeader(ctx))

  ctx.status = 204
}
