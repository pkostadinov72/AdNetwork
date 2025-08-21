import { createClient } from 'redis'
import { config } from './config'

export const redisClient = createClient({ url: config.REDIS_URL })

export const connectRedis = async () => {
  try {
    await redisClient.connect()
    console.log('Redis connected')
  } catch (error) {
    console.error('Redis connection failed:', error)
  }
}
