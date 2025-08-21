import Router from 'koa-router'
import { config } from '../config/config'
import { createProxy } from '../middleware/proxy.middleware'

export const assetRouter = new Router()

assetRouter.all(
  [`${config.ROUTE_PATHS.ASSETS}`, `${config.ROUTE_PATHS.ASSETS}/*path`],
  createProxy(config.ROUTE_PATHS.ASSETS),
)
