import { channel } from '../config/rabbitmq'
import { UserRole } from '../entities/User'
import { QUEUE_NAMES } from '../utils/constant'

interface IPublishUserIndex {
  id: string
  username: string
  fullName: string
  role: UserRole
}

export const publishUserIndex = async (user: IPublishUserIndex) => {
  if (!channel) {
    console.error('RabbitMQ channel is not initialized')
  }

  channel.sendToQueue(
    QUEUE_NAMES.SEARCH_USER_INDEXED,
    Buffer.from(JSON.stringify(user)),
    { persistent: true },
  )
}

export const deleteUserIndex = async (id: string) => {
  if (!channel) {
    console.error('RabbitMQ channel is not initialized')
  }

  channel.sendToQueue(
    QUEUE_NAMES.SEARCH_USER_DELETED,
    Buffer.from(JSON.stringify({ id })),
    {
      persistent: true,
    },
  )
}
