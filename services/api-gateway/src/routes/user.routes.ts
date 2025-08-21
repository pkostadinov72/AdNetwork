import Router from 'koa-router'
import { config } from '../config/config'
import { createProxy } from '../middleware/proxy.middleware'

export const userRouter = new Router()

userRouter.all(
  [`${config.ROUTE_PATHS.USERS}`, `${config.ROUTE_PATHS.USERS}/*path`],
  createProxy(config.ROUTE_PATHS.USERS),
)
