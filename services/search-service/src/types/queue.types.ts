import { PostUpsertPayload } from '../events/handlers/post.events'
import { UserUpsertPayload } from '../events/handlers/user.events'
import { QUEUE_NAMES } from '../utils/constant'

export type QueuePayloadMap = {
  [QUEUE_NAMES.SEARCH_USER_INDEXED]: UserUpsertPayload
  [QUEUE_NAMES.SEARCH_USER_DELETED]: { id: string }
  [QUEUE_NAMES.SEARCH_POST_INDEXED]: PostUpsertPayload
  [QUEUE_NAMES.SEARCH_POST_DELETED]: { id: string }
}
