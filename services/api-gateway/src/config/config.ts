import dotenv from 'dotenv'
import path from 'path'

try {
  dotenv.config({ path: path.resolve(__dirname, '../../../../.env') })
} catch (error) {
  throw new Error('Failed to load .env file')
}

export const config = {
  PORT: Number(process.env.API_GATEWAY_PORT),
  JWT_SECRET: process.env.JWT_SECRET,
  ROUTE_PATHS: {
    AUTH: '/api/v1/auth',
    USERS: '/api/v1/users',
    POSTS: '/api/v1/posts',
    ASSETS: '/api/v1/assets',
    SEARCH: '/api/v1/search',
  },
  REDIS_URL:
    process.env.REDIS_HOST && process.env.REDIS_PORT
      ? `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
      : undefined,
}

if (!process.env.USER_SERVICE_URL) {
  throw new Error('USER_SERVICE_URL missing in environment file')
}

if (!process.env.POST_SERVICE_URL) {
  throw new Error('POST_SERVICE_URL missing in environment file')
}

if (!process.env.ASSET_SERVICE_URL) {
  throw new Error('ASSET_SERVICE_URL missing in environment file')
}

if (!process.env.SEARCH_SERVICE_URL) {
  throw new Error('SEARCH_SERVICE_URL missing in environment file')
}

export const SERVICES: Record<string, string> = {
  [config.ROUTE_PATHS.AUTH]: process.env.USER_SERVICE_URL,
  [config.ROUTE_PATHS.USERS]: process.env.USER_SERVICE_URL,
  [config.ROUTE_PATHS.POSTS]: process.env.POST_SERVICE_URL,
  [config.ROUTE_PATHS.ASSETS]: process.env.ASSET_SERVICE_URL,
  [config.ROUTE_PATHS.SEARCH]: process.env.SEARCH_SERVICE_URL,
}
