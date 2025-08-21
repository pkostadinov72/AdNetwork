import Router from 'koa-router'
import { config } from '../config/config'
import { createProxy } from '../middleware/proxy.middleware'

export const postRouter = new Router()

postRouter.all(
  [`${config.ROUTE_PATHS.POSTS}`, `${config.ROUTE_PATHS.POSTS}/*path`],
  createProxy(config.ROUTE_PATHS.POSTS),
)
