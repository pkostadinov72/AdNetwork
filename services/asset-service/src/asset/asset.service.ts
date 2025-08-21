import createHttpError from 'http-errors'
import { assetRepository } from '../config/database'
import { imageKit } from '../config/imageKit'
import { AssetOwnerType, AssetType } from '../entities/Asset'
import fs from 'fs'
import { File } from 'formidable'
import {
  handleUserAssetReferenceUpdate,
  validateUserExists,
} from '../utils/assetUtils'

export const uploadAssetService = async (
  uploadedFile: File,
  fileName: string,
  fileType: string,
  ownerId: string,
  ownerType: AssetOwnerType,
  assetType: AssetType,
  headers: Record<string, string>,
) => {
  if (ownerType === AssetOwnerType.USER) {
    await validateUserExists(ownerId)
  }

  //TODO INVESTIGATE
  const file = fs.readFileSync(uploadedFile.filepath)

  const imageKitFile = await imageKit.upload({ file, fileName })

  const asset = assetRepository.create({
    fileName,
    fileType,
    url: imageKitFile.url,
    imageKitFileId: imageKitFile.fileId,
    ownerId,
    ownerType,
    assetType,
    size: imageKitFile.size,
    metadata: imageKitFile.metadata,
  })

  if (ownerType === AssetOwnerType.USER) {
    await handleUserAssetReferenceUpdate(
      ownerId,
      imageKitFile.fileId,
      assetType,
      imageKitFile.url,
      headers,
    )
  }

  await assetRepository.save(asset)
  return asset
}

export const getAllAssetsService = async () => {
  return await assetRepository.find()
}

export const getAssetByIdService = async (id: string) => {
  const asset = await assetRepository.findOne({ where: { id } })
  if (!asset) throw new createHttpError.NotFound('Asset not found')
  return asset
}

export const getAssetByOnwerIdService = async (ownerId: string) => {
  const asset = await assetRepository.findOne({ where: { ownerId } })
  if (!asset) throw new createHttpError.NotFound('Asset not found')
  return asset
}

export const deleteAssetService = async (
  id: string,
  headers: Record<string, string>,
) => {
  const asset = await assetRepository.findOne({ where: { id } })

  if (!asset) throw new createHttpError.NotFound('Asset not found')

  const { ownerId, ownerType, imageKitFileId, assetType } = asset

  if (ownerType === AssetOwnerType.USER) {
    await handleUserAssetReferenceUpdate(
      ownerId,
      imageKitFileId,
      assetType,
      null,
      headers,
    )
  }
  await imageKit.deleteFile(asset.imageKitFileId)
  await assetRepository.delete(id)
}
