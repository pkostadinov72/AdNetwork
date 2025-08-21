import { ChannelModel, Channel, connect } from 'amqplib'
import { config } from './config'

let connection: ChannelModel
let channel: Channel

export const connectRabbitMQ = async () => {
  try {
    connection = await connect(config.RABBITMQ_URL!)
    channel = await connection.createChannel()
    console.log('RabbitMQ connected')
  } catch (error) {
    console.error('RabbitMQ connection failed:', error)
  }
}

export { channel }
