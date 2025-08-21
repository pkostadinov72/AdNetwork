import Router from 'koa-router'
import { login, logout, register } from './auth.cotroller'
import { validatorMiddleware } from '../../middlewares/validator.middleware'
import { loginSchema, registerSchema } from './auth-validation.schemas'
import { extractUserMiddleware } from '../../middlewares/extract-user.middleware'

export const authRouter = new Router({ prefix: '/auth' })

authRouter.post('/register', validatorMiddleware(registerSchema), register)
authRouter.post('/login', validatorMiddleware(loginSchema), login)
authRouter.post('/logout', extractUserMiddleware, logout)
