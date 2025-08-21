import createHttpError from 'http-errors'
import { sign, verify } from 'jsonwebtoken'
import { UserRole } from '../entities/User'
import { config } from '../config/config'
import { redisClient } from '../config/redis'

interface TokenPayload {
  id: string
  username: string
  role: UserRole
}

const JWT_SECRET = config.JWT_SECRET
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in config')
}

const JWT_EXPIRE_TIME = 7 * 24 * 60 * 60 // Expiration in seconds (7 days)

export const createToken = async (user: TokenPayload): Promise<string> => {
  const payload: TokenPayload = {
    id: user.id,
    username: user.username,
    role: user.role,
  }

  const token = sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE_TIME,
  })

  await redisClient.set(`token:${user.id}`, token, {
    EX: JWT_EXPIRE_TIME,
  })

  return token
}

//REMOVE

export const verifyToken = async (token: string): Promise<TokenPayload> => {
  try {
    const decoded = verify(token, JWT_SECRET) as TokenPayload

    const storedToken = await redisClient.get(`token:${decoded.id}`)
    if (!storedToken || storedToken !== token) {
      throw createHttpError.Unauthorized(
        'Session has expired, please log in again',
      )
    }

    return decoded
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      throw createHttpError(401, 'Token has expired, please log in again')
    }
    throw createHttpError(401, 'Invalid token')
  }
}

export const invalidateToken = async (userId: string) => {
  const deleteCount = await redisClient.del(`token:${userId}`)

  return deleteCount > 0
}
