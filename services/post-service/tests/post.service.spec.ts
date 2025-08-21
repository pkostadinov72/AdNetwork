import axios from 'axios'
import fs from 'fs'
import {
  createCommentService,
  createPostService,
  deleteCommentService,
  deletePostService,
  getAllPostsService,
  getPostByIdService,
  getPostsByUserIdService,
  toggleLikeService,
  updatePostService,
} from '../src/modules/posts/post.service'
import {
  commentRepository,
  likeRepository,
  postRepository,
} from '../src/config/database'
import * as helper from '../src/utils/helper'
import { Post, PostVisibility } from '../src/entities/Post'
import { Like } from '../src/entities/Like'
import { Comment } from '../src/entities/Comment'
import { Readable } from 'stream'
import { config } from '../src/config/config'

const uuid = () => crypto.randomUUID?.() || `id-${Math.random()}`

export const createPost = (overrides: Partial<Post> = {}): Post => {
  return {
    id: uuid(),
    userId: 'user-1',
    content: 'Default content',
    mediaUrl: '',
    visibility: PostVisibility.PUBLIC,
    createdAt: new Date(),
    updatedAt: new Date(),
    comments: [],
    likes: [],
    ...overrides,
  }
}

export const createComment = (overrides: Partial<Comment> = {}): Comment => {
  return {
    id: uuid(),
    postId: 'post-1',
    userId: 'user-1',
    username: 'testuser',
    content: 'This is a comment',
    createdAt: new Date(),
    updatedAt: new Date(),
    post: createPost(),
    ...overrides,
  }
}

export const createLike = (overrides: Partial<Like> = {}): Like => {
  return {
    id: uuid(),
    postId: 'post-1',
    userId: 'user-1',
    createdAt: new Date(),
    post: createPost(),
    ...overrides,
  }
}

jest.mock('../src/config/config', () => ({
  config: {
    ASSET_SERVICE_ENDPOINT: 'http://mock-assets',
    USER_SERVICE_ENDPOINT: 'http://mock-users',
    POSTGRES: {
      HOST: 'localhost',
      PORT: 5432,
      USER: 'test',
      PASSWORD: 'test',
      DB: 'test_db',
    },
  },
}))
jest.mock('axios')
jest.mock('fs')
jest.mock('../src/utils/helper', () => ({
  validateUserExists: jest.fn(),
}))

const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedValidate = helper as jest.Mocked<typeof helper>
const mockedPostRepository = postRepository as jest.Mocked<
  typeof postRepository
>
const mockedCommentRepository = commentRepository as jest.Mocked<
  typeof commentRepository
>
const mockedLikeRepository = likeRepository as jest.Mocked<
  typeof likeRepository
>

const queryBuilder = {
  leftJoinAndSelect: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  getMany: jest.fn(),
  getOne: jest.fn(),
}

mockedPostRepository.createQueryBuilder = jest.fn(() => queryBuilder as any)

mockedPostRepository.create = jest.fn()
mockedPostRepository.save = jest.fn()
mockedPostRepository.delete = jest.fn()
mockedPostRepository.remove = jest.fn()
mockedPostRepository.findOneBy = jest.fn()

mockedCommentRepository.create = jest.fn()
mockedCommentRepository.save = jest.fn()
mockedCommentRepository.findOneBy = jest.fn()
mockedCommentRepository.remove = jest.fn()

mockedLikeRepository.findOne = jest.fn()
mockedLikeRepository.create = jest.fn()
mockedLikeRepository.save = jest.fn()
mockedLikeRepository.delete = jest.fn()

const mockPost = createPost({ id: 'post-1', userId: 'user-1' })
const headers = { Authorization: 'Bearer token' }

describe('Post Service', () => {
  describe('getAllPostsService', () => {
    it('returns posts for admin', async () => {
      queryBuilder.getMany.mockResolvedValue([mockPost])
      const result = await getAllPostsService({ id: 'admin-id', role: 'admin' })
      expect(result).toEqual([mockPost])
    })
  })

  describe('getPostByIdService', () => {
    it('returns post if found', async () => {
      queryBuilder.getOne.mockResolvedValue(mockPost)
      const result = await getPostByIdService('post-1', {
        id: 'user-1',
        role: 'admin',
      })
      expect(result).toEqual(mockPost)
    })

    it('throws if not found', async () => {
      queryBuilder.getOne.mockResolvedValue(null)
      await expect(
        getPostByIdService('not-found', { id: 'user-1', role: 'admin' }),
      ).rejects.toThrow('Post not found')
    })
  })

  describe('getPostsByUserIdService', () => {
    it('returns posts by user', async () => {
      queryBuilder.getMany.mockResolvedValue([mockPost])
      const result = await getPostsByUserIdService('user-1', {
        id: 'user-1',
        role: 'regular',
      })
      expect(result).toEqual([mockPost])
    })
  })

  describe('createPostService', () => {
    const mockStream = new Readable()
    mockStream._read = jest.fn()
    fs.createReadStream = jest.fn().mockReturnValue(mockStream)

    const file = {
      filepath: '/tmp/test.png',
      originalFilename: 'test.png',
      mimetype: 'image/png',
    } as any
    const data = { visibility: PostVisibility.PUBLIC }
    const post = createPost({ id: 'post-1', userId: 'user-1' })
    const assetRes = { data: { url: 'media-url' } }
    const postWithMedia = { ...post, mediaUrl: 'media-url' }

    it('creates post and attaches mediaUrl', async () => {
      mockedValidate.validateUserExists.mockResolvedValue(true)
      mockedPostRepository.create.mockReturnValue(post)
      mockedPostRepository.save.mockResolvedValue(post)
      mockedAxios.post.mockResolvedValue(assetRes)
      mockedPostRepository.save.mockResolvedValue(postWithMedia)

      const result = await createPostService(file, data, headers, 'user-1')

      expect(result.mediaUrl).toBe('media-url')
      expect(fs.createReadStream).toHaveBeenCalledWith(file.filepath)
      expect(result).toEqual(postWithMedia)
    })
  })

  describe('updatePostService', () => {
    it('updates post if found', async () => {
      mockedPostRepository.findOneBy.mockResolvedValue(mockPost)
      mockedPostRepository.save.mockResolvedValue({
        ...mockPost,
        content: 'updated',
      })
      const result = await updatePostService('post-1', { content: 'updated' })
      expect(result.content).toBe('updated')
    })

    it('throws if not found', async () => {
      mockedPostRepository.findOneBy.mockResolvedValue(null)
      await expect(updatePostService('not-found', {})).rejects.toThrow(
        'Post not found',
      )
    })
  })

  describe('deletePostService', () => {
    it('removes post and media', async () => {
      mockedPostRepository.findOneBy.mockResolvedValue({
        ...mockPost,
        mediaUrl: 'url',
      })
      mockedAxios.get.mockResolvedValue({ data: { id: 'asset-1' } })
      mockedAxios.delete.mockResolvedValue({})

      await deletePostService('post-1', headers)
      expect(mockedAxios.delete).toHaveBeenCalled()
      expect(mockedPostRepository.remove).toHaveBeenCalled()
    })
  })

  describe('createCommentService', () => {
    it('creates comment if post exists', async () => {
      const comment = createComment({ content: 'Hi' })
      mockedPostRepository.findOneBy.mockResolvedValue(mockPost)
      mockedCommentRepository.create.mockReturnValue(comment)
      mockedCommentRepository.save.mockResolvedValue(comment)
      const result = await createCommentService(
        'post-1',
        'user-1',
        'user',
        'Hi',
      )
      expect(result.content).toBe('Hi')
    })
  })

  describe('deleteCommentService', () => {
    it('deletes comment if exists', async () => {
      const comment = createComment({ id: 'comment-1' })
      mockedCommentRepository.findOneBy.mockResolvedValue(comment)
      mockedCommentRepository.remove.mockResolvedValue(comment)
      await deleteCommentService('comment-1')
      expect(mockedCommentRepository.remove).toHaveBeenCalled()
    })
  })

  describe('toggleLikeService', () => {
    it('removes like if exists', async () => {
      const like = createLike({ id: 'like-1', post: mockPost })
      mockedPostRepository.findOneBy.mockResolvedValue(mockPost)
      mockedLikeRepository.findOne.mockResolvedValue(like)
      await toggleLikeService('post-1', 'user-1')
      expect(mockedLikeRepository.delete).toHaveBeenCalledWith('like-1')
    })

    it('creates like if not exists', async () => {
      const newLike = createLike({ id: 'like-2' })
      mockedPostRepository.findOneBy.mockResolvedValue(mockPost)
      mockedLikeRepository.findOne.mockResolvedValue(null)
      mockedLikeRepository.create.mockReturnValue(newLike)
      mockedLikeRepository.save.mockResolvedValue(newLike)
      await toggleLikeService('post-1', 'user-1')
      expect(mockedLikeRepository.save).toHaveBeenCalled()
    })
  })
})
