import axios from 'axios'
import createHttpError from 'http-errors'
import { AssetType } from '../entities/Asset'
import { imageKit } from '../config/imageKit'
import { Context } from 'koa'
import { config } from '../config/config'

/**
 * Validates if the owner exists by sending a GET request to the service.
 * Throws appropriate errors if the owner is missing or service is down.
 */
export const validateUserExists = async (ownerId: string) => {
  try {
    await axios.get(`${config.USER_SERVICE_ENDPOINT}/${ownerId}`)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 404) {
          throw new createHttpError.NotFound(
            `Owner with id: ${ownerId} not found.`,
          )
        }
        throw createHttpError(
          error.response.status,
          `Service error: ${error.response.statusText}`,
        )
      } else if (error.request) {
        throw new createHttpError.ServiceUnavailable(
          'The owner service is currently unavailable.',
        )
      }
    }
    throw new createHttpError.InternalServerError('Unexpected error occurred.')
  }
}

/**
 * Updates or removes the asset reference for an owner.
 */
export const updateUserAssetReference = async (
  ownerId: string,
  imageKitFileId: string,
  assetType: AssetType.AVATAR | AssetType.COVER,
  url: string | null,
  headers: Record<string, string>,
) => {
  const assetTypeMap: Record<AssetType.AVATAR | AssetType.COVER, string> = {
    [AssetType.AVATAR]: 'avatarUrl',
    [AssetType.COVER]: 'coverImageUrl',
  }

  if (!(assetType in assetTypeMap)) {
    throw new createHttpError.BadRequest(`Invalid asset type: ${assetType}`)
  }

  const payload = { [assetTypeMap[assetType]]: url }

  try {
    await axios.patch(`${config.USER_SERVICE_ENDPOINT}/${ownerId}`, payload, {
      headers,
    })
  } catch (error) {
    if (url) {
      await imageKit.deleteFile(imageKitFileId)
    }
    throw new createHttpError.InternalServerError(
      `Failed to update User with new asset.`,
    )
  }
}

/**
 * Extracts and validates the "x-user" header from the incoming request context.
 *
 * This header is expected to be a JSON string injected by the API Gateway after token verification.
 * It is used to authorize and authenticate the user in downstream microservices (e.g., asset, user).
 *
 */
export const getXUserHeader = (ctx: Context): Record<'x-user', string> => {
  const xUserHeader = ctx.headers['x-user']

  if (typeof xUserHeader !== 'string') {
    throw new createHttpError.Unauthorized('Invalid or missing x-user header')
  }

  return { 'x-user': xUserHeader }
}

export const isUserAssetType = (
  type: AssetType,
): type is AssetType.AVATAR | AssetType.COVER => {
  return type === AssetType.AVATAR || type === AssetType.COVER
}

/**
 * Safely updates or removes the avatar or cover image reference for a user.
 * This function ensures that only valid user asset types are processed.
 * Actual update logic and fallback deletion is handled by `updateUserAssetReference`.
 */
export const handleUserAssetReferenceUpdate = async (
  ownerId: string,
  fileId: string,
  assetType: AssetType,
  url: string | null,
  headers: Record<string, string>,
) => {
  if (!isUserAssetType(assetType)) {
    throw new createHttpError.BadRequest('Invalid asset type for user')
  }

  await updateUserAssetReference(ownerId, fileId, assetType, url, headers)
}
