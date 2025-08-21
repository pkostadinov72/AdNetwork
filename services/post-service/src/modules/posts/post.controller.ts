import { Context } from 'koa'
import {
  getAllPostsService,
  getPostByIdService,
  getPostsByUserIdService,
  createPostService,
  updatePostService,
  deletePostService,
  toggleLikeService,
  createCommentService,
  deleteCommentService,
} from './post.service'
import { getXUserHeader } from '../../utils/helper'
import createHttpError from 'http-errors'
import { deletePostIndex, publishPostIndex } from '../../events/producer'

export const getAllPosts = async (ctx: Context) => {
  const posts = await getAllPostsService({
    id: ctx.state.user.id,
    role: ctx.state.user.role,
  })
  ctx.body = posts
}

export const getPostById = async (ctx: Context) => {
  const post = await getPostByIdService(ctx.params.id, {
    id: ctx.state.user.id,
    role: ctx.state.user.role,
  })
  ctx.body = post
}

export const getPostsByUserId = async (ctx: Context) => {
  const posts = await getPostsByUserIdService(ctx.params.userId, {
    id: ctx.state.user.id,
    role: ctx.state.user.role,
  })
  ctx.body = posts
}

export const createPost = async (ctx: Context) => {
  const userId = ctx.state.user.id

  const file = ctx.request.files?.file

  if (!file) {
    throw new createHttpError.BadRequest('No file uploaded')
  }

  const uploadedFile = Array.isArray(file) ? file[0] : file

  const { content, visibility } = ctx.request.body

  const post = await createPostService(
    uploadedFile,
    { content, visibility },
    getXUserHeader(ctx),
    userId,
  )

  await publishPostIndex({
    id: post.id,
    userId: post.userId,
    content: post.content,
    visibility: post.visibility,
  })

  ctx.status = 201
  ctx.body = post
}

export const updatePost = async (ctx: Context) => {
  const updatedPost = await updatePostService(ctx.params.id, ctx.request.body)

  await publishPostIndex({
    id: updatedPost.id,
    userId: updatedPost.userId,
    content: updatedPost.content,
    visibility: updatedPost.visibility,
  })

  ctx.body = updatedPost
}

export const deletePost = async (ctx: Context) => {
  await deletePostService(ctx.params.id, getXUserHeader(ctx))
  await deletePostIndex(ctx.params.id)

  ctx.status = 204
}

export const createComment = async (ctx: Context) => {
  const userId = ctx.state.user.id
  const username = ctx.state.user.username
  const postId = ctx.params.id
  const { content } = ctx.request.body

  const comment = await createCommentService(postId, userId, username, content)

  ctx.status = 201
  ctx.body = comment
}

export const deleteComment = async (ctx: Context) => {
  const commentId = ctx.params.commentId

  await deleteCommentService(commentId)

  ctx.status = 204
}

export const toggleLike = async (ctx: Context) => {
  const userId = ctx.state.user.id
  const postId = ctx.params.id

  const liked = await toggleLikeService(postId, userId)

  ctx.body = { liked }
}
