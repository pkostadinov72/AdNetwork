import Router from 'koa-router'
import { config } from '../config/config'
import { verifyToken } from '../middleware/auth.middleware'
import { createProxy } from '../middleware/proxy.middleware'

export const authRouter = new Router()

authRouter.post(
  `${config.ROUTE_PATHS.AUTH}/login`,
  createProxy(config.ROUTE_PATHS.AUTH),
)
authRouter.post(
  `${config.ROUTE_PATHS.AUTH}/register`,
  createProxy(config.ROUTE_PATHS.AUTH),
)

authRouter.post(
  `${config.ROUTE_PATHS.AUTH}/logout`,
  verifyToken,
  createProxy(config.ROUTE_PATHS.AUTH),
)
