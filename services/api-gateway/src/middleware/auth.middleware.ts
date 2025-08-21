import { Context, Next } from 'koa'
import { JwtPayload, verify } from 'jsonwebtoken'
import createHttpError from 'http-errors'
import { config } from '../config/config'
import { redisClient } from '../config/redis'

interface TokenPayload extends JwtPayload {
  id: string
}

export const verifyToken = async (ctx: Context, next: Next) => {
  if (!config.JWT_SECRET) {
    throw new Error('JWT_SECRET is missing in environment file')
  }

  try {
    const authHeader = ctx.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createHttpError.Unauthorized('Authorization token missing')
    }

    const token = authHeader.split(' ')[1]

    const decoded = verify(token, config.JWT_SECRET) as TokenPayload

    const storedToken = await redisClient.get(`token:${decoded.id}`)

    if (!storedToken || storedToken !== token) {
      throw createHttpError.Unauthorized(
        'Session has expired, please log in again',
      )
    }

    ctx.state.user = decoded
    await next()
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      ctx.throw(401, 'Token has expired, please log in again')
    }
    ctx.throw(401, 'Invalid token')
  }
}
