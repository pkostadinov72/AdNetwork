import { configDotenv } from 'dotenv'
import path from 'path'

configDotenv({ path: path.resolve(__dirname, '../../../../.env') })

export const config = {
  PORT: process.env.SEARCH_SERVICE_PORT || 4003,
  TYPESENSE: {
    HOST: process.env.TYPESENSE_HOST!,
    PORT: Number(process.env.TYPESENSE_PORT),
    PROTOCOL: process.env.TYPESENSE_PROTOCOL!,
    API_KEY: process.env.TYPESENSE_API_KEY!,
  },
  RABBITMQ_URL:
    process.env.RABBITMQ_HOST && process.env.RABBITMQ_PORT
      ? `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
      : undefined,
}
