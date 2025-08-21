import { CollectionFieldSchema } from 'typesense/lib/Typesense/Collection'

const userFields: CollectionFieldSchema[] = [
  { name: 'id', type: 'string' },
  { name: 'username', type: 'string' },
  { name: 'fullName', type: 'string' },
  { name: 'role', type: 'string' },
]

const postFields: CollectionFieldSchema[] = [
  { name: 'id', type: 'string' },
  { name: 'userId', type: 'string' },
  { name: 'content', type: 'string' },
  { name: 'visibility', type: 'string' },
]

export const usersCollection = {
  name: 'users',
  fields: userFields,
}

export const postsCollection = {
  name: 'posts',
  fields: postFields,
}
