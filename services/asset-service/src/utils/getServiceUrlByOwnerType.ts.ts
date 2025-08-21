import { config } from '../config/config'
import { AssetOwnerType } from '../entities/Asset'

export const getServiceUrlByOwnerType = (ownerType: AssetOwnerType) => {
  let serviceUrl = ''
  if (ownerType === AssetOwnerType.USER) {
    serviceUrl = `${config.USER_SERVICE_ENDPOINT}`
  } else if (ownerType === AssetOwnerType.POST) {
    serviceUrl = `${config.POSTS_SERVICE_ENDPOINT}`
  }

  return serviceUrl
}
