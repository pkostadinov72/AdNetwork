import Router from 'koa-router'
import { createProxy } from '../middleware/proxy.middleware'
import { config } from '../config/config'

export const searchRouter = new Router()

searchRouter.all(
  [`${config.ROUTE_PATHS.SEARCH}`, `${config.ROUTE_PATHS.SEARCH}/*path`],
  createProxy(config.ROUTE_PATHS.SEARCH),
)
