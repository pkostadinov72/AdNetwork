import { channel } from '../config/rabbitmq'
import { QueuePayloadMap } from '../types/queue.types'
import { QUEUE_NAMES } from '../utils/constant'
import { handlePostDelete, handlePostUpsert } from './handlers/post.events'
import { handleUserDelete, handleUserUpsert } from './handlers/user.events'

const queueHandlers: {
  [K in keyof QueuePayloadMap]: (payload: QueuePayloadMap[K]) => Promise<void>
} = {
  [QUEUE_NAMES.SEARCH_USER_INDEXED]: handleUserUpsert,
  [QUEUE_NAMES.SEARCH_USER_DELETED]: handleUserDelete,
  [QUEUE_NAMES.SEARCH_POST_INDEXED]: handlePostUpsert,
  [QUEUE_NAMES.SEARCH_POST_DELETED]: handlePostDelete,
}

export const initConsumer = async () => {
  for (const queue of Object.values(QUEUE_NAMES)) {
    await channel.assertQueue(queue, { durable: true })

    channel.consume(queue, async (msg) => {
      if (!msg) return

      const payload = JSON.parse(msg.content.toString())

      const handler = queueHandlers[queue]

      if (!handler) {
        channel.nack(msg, false, false)
        return
      }

      try {
        await handler(payload)
        channel.ack(msg)
      } catch (err) {
        console.error(`Failed to process message from ${queue}:`, err)
        channel.nack(msg, false, false)
      }
    })

    console.log(`Listening for messages on queue: ${queue}`)
  }
}
