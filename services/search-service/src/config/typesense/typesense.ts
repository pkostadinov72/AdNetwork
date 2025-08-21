import Typesense from 'typesense'
import { config } from '../config'
import { postsCollection, usersCollection } from './collections'
import { ObjectNotFound } from 'typesense/lib/Typesense/Errors'
import createHttpError from 'http-errors'

export const typesenseClient = new Typesense.Client({
  nodes: [
    {
      host: config.TYPESENSE.HOST,
      port: config.TYPESENSE.PORT,
      protocol: config.TYPESENSE.PROTOCOL,
    },
  ],
  apiKey: config.TYPESENSE.API_KEY!,
})

export const registerTypesenseCollections = async () => {
  const collectionsToCreate = [usersCollection, postsCollection]

  for (const collection of collectionsToCreate) {
    const { name } = collection

    try {
      await typesenseClient.collections(name).retrieve()
      console.log(`Collection '${name}' already exists.`)
    } catch (error) {
      if (error instanceof ObjectNotFound) {
        await typesenseClient.collections().create(collection)
        console.log(`Collection '${name}' created.`)
      } else {
        throw createHttpError(500, `Typesense error while checking '${name}'`)
      }
    }
  }
}
