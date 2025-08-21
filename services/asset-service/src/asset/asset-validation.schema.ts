import { AssetOwnerType, AssetType } from '../entities/Asset'

export const uploadAssetSchema = {
  type: 'object',
  properties: {
    fileName: { type: 'string', minLength: 1 },
    fileType: { type: 'string', minLength: 1 },
    ownerId: { type: 'string', minLength: 1 },
    ownerType: { type: 'string', enum: Object.values(AssetOwnerType) },
    assetType: { type: 'string', enum: Object.values(AssetType) },
  },
  required: ['fileName', 'fileType', 'ownerId', 'ownerType', 'assetType'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      fileName: 'File name is required and must be at least 1 character long.',
      fileType: 'File type is required and must be a valid MIME type.',
      ownerId: 'Owner ID is required and must be a valid UUID.',
      ownerType: `Owner type must be one of: ${Object.values(
        AssetOwnerType,
      ).join(', ')}.`,
      assetType: `Asset type must be one of: ${Object.values(AssetType).join(
        ', ',
      )}.`,
    },
    required: {
      fileName: 'File name is required.',
      fileType: 'File type is required.',
      ownerId: 'Owner ID is required.',
      ownerType: 'Owner type is required.',
      assetType: 'Asset type is required.',
    },
  },
}
