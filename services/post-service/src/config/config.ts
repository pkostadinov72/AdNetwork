import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') })

if (!process.env.ASSET_SERVICE_ENDPOINT) {
  throw new Error('ASSET_SERVICE_ENDPOINT missing in environment file')
}

if (!process.env.USER_SERVICE_ENDPOINT) {
  throw new Error('USER_SERVICE_ENDPOINT missing in environment file')
}

export const config = {
  PORT: process.env.POST_SERVICE_PORT ?? 4001,
  POSTGRES: {
    HOST: process.env.POSTGRES_POST_HOST,
    PORT: Number(process.env.POSTGRES_POST_PORT),
    USER: process.env.POSTGRES_POST_USER,
    PASSWORD: process.env.POSTGRES_POST_PASSWORD,
    DATABASE: process.env.POSTGRES_POST_DB,
  },
  ASSET_SERVICE_ENDPOINT: process.env.ASSET_SERVICE_ENDPOINT,
  USER_SERVICE_ENDPOINT: process.env.USER_SERVICE_ENDPOINT,
  JWT_SECRET: process.env.JWT_SECRET,
  RABBITMQ_URL:
    process.env.RABBITMQ_HOST && process.env.RABBITMQ_PORT
      ? `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
      : undefined,
}
