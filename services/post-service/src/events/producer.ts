import { QUEUE_NAMES } from '../utils/constant'
import { channel } from '../config/rabbitmq'
import { PostVisibility } from '../entities/Post'

export interface IPublishPostIndex {
  id: string
  userId: string
  content: string
  visibility: PostVisibility
}

export const publishPostIndex = async (post: IPublishPostIndex) => {
  if (!channel) {
    console.error('RabbitMQ channel is not initialized')
  }

  channel.sendToQueue(
    QUEUE_NAMES.SEARCH_POST_INDEXED,
    Buffer.from(JSON.stringify(post)),
    { persistent: true },
  )
}

export const deletePostIndex = async (id: string) => {
  if (!channel) {
    console.error('RabbitMQ channel is not initialized')
  }

  channel.sendToQueue(
    QUEUE_NAMES.SEARCH_POST_DELETED,
    Buffer.from(JSON.stringify({ id })),
    {
      persistent: true,
    },
  )
}
