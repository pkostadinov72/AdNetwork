import amqp from 'amqplib'
import { config } from './config'

let connection: amqp.ChannelModel
let channel: amqp.Channel

export const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect(config.RABBITMQ_URL!)
    channel = await connection.createChannel()
    console.log('RabbitMQ connected')
  } catch (error) {
    console.error('RabbitMQ connection failed:', error)
  }
}

export { channel }
