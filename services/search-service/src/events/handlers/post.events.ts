import { typesenseClient } from '../../config/typesense/typesense'

export interface PostUpsertPayload {
  id: string
  userId: string
  content: string
  visibility: string
}

export const handlePostUpsert = async (payload: PostUpsertPayload) => {
  const postDoc = {
    id: payload.id,
    userId: payload.userId,
    content: payload.content,
    visibility: payload.visibility,
  }

  await typesenseClient.collections('posts').documents().upsert(postDoc)
  console.log(`Indexed post: ${postDoc.id}`)
}

export const handlePostDelete = async ({ id }: { id: string }) => {
  await typesenseClient.collections('posts').documents(id).delete()
}
