import dotenv from 'dotenv'
import path from 'path'

try {
  dotenv.config({ path: path.resolve(__dirname, '../../../../.env') })
} catch (error) {
  throw new Error('Failed to load .env file')
}

export const config = {
  PORT: process.env.ASSET_SERVICE_PORT ?? 4002,
  POSTGRES: {
    HOST: process.env.POSTGRES_ASSET_HOST,
    PORT: Number(process.env.POSTGRES_ASSET_PORT),
    USER: process.env.POSTGRES_ASSET_USER,
    PASSWORD: process.env.POSTGRES_ASSET_PASSWORD,
    DATABASE: process.env.POSTGRES_ASSET_DB,
  },
  IMAGEKIT: {
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY!,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY!,
    IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT!,
  },
  USER_SERVICE_ENDPOINT: process.env.USER_SERVICE_ENDPOINT,
  POSTS_SERVICE_ENDPOINT: process.env.POSTS_SERVICE_ENDPOINT ?? '',
  RABBITMQ_URL:
    process.env.RABBITMQ_HOST && process.env.RABBITMQ_PORT
      ? `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
      : undefined,
  JWT_SECRET: process.env.JWT_SECRET,
}
