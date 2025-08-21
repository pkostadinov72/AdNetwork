import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') })

if (!process.env.RABBITMQ_HOST && !process.env.RABBITMQ_PORT) {
  throw new Error('RABBITMQ_HOST OR RABBITMQ_PORT missing in environment file')
}

export const config = {
  PORT: process.env.USER_SERVICE_PORT ?? 4000,
  POSTGRES: {
    HOST: process.env.POSTGRES_USER_HOST,
    PORT: Number(process.env.POSTGRES_USER_PORT),
    USER: process.env.POSTGRES_USER,
    PASSWORD: process.env.POSTGRES_USER_PASSWORD,
    DATABASE: process.env.POSTGRES_USER_DB,
  },
  REDIS_URL:
    process.env.REDIS_HOST && process.env.REDIS_PORT
      ? `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
      : undefined,
  RABBITMQ_URL:
    process.env.RABBITMQ_HOST && process.env.RABBITMQ_PORT
      ? `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
      : undefined,
  JWT_SECRET: process.env.JWT_SECRET,
}
