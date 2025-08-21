import { typesenseClient } from '../config/typesense/typesense'

export const searchAllService = async (
  query: string,
  currentUser: { id: string; role: string },
) => {
  const isAdmin = currentUser.role === 'admin'

  const filterBy = isAdmin
    ? undefined
    : `visibility:=public || userId:=${currentUser.id}`

  const [userSearch, postSearch] = await Promise.all([
    typesenseClient.collections('users').documents().search({
      q: query,
      query_by: 'username,fullName',
    }),
    typesenseClient
      .collections('posts')
      .documents()
      .search({
        q: query,
        query_by: 'content',
        ...(filterBy && { filter_by: filterBy }),
      }),
  ])

  return {
    users: userSearch.hits?.map((hit) => hit.document),
    posts: postSearch.hits?.map((hit) => hit.document),
  }
}
