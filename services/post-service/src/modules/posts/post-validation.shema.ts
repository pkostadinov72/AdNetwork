import { PostVisibility } from '../../entities/Post'

export const createPostSchema = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
      minLength: 1,
      maxLength: 250,
    },
    mediaUrl: {
      type: 'string',
      format: 'uri',
    },
    visibility: {
      type: 'string',
      enum: Object.values(PostVisibility),
    },
    originalPostId: {
      type: 'string',
      format: 'uuid',
      nullable: true,
    },
  },
  required: ['content', 'visibility'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      content: 'Content must be between 1 and 250 characters.',
      mediaUrl: 'Media URL must be a valid URI.',
      visibility: `Visibility must be one of: ${Object.values(PostVisibility).join(', ')}.`,
      originalPostId: 'Original post ID must be a valid UUID.',
    },
    required: {
      content: 'Content is required.',
      visibility: 'Visibility is required.',
    },
  },
}

export const updatePostSchema = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
      minLength: 1,
      maxLength: 250,
    },
    visibility: {
      type: 'string',
      enum: Object.values(PostVisibility),
    },
  },
  additionalProperties: false,
  errorMessage: {
    properties: {
      content: 'Content must be between 1 and 250 characters.',
      visibility: `Visibility must be one of: ${Object.values(PostVisibility).join(', ')}.`,
    },
  },
}

export const createCommentSchema = {
  type: 'object',
  properties: {
    content: { type: 'string', minLength: 1, maxLength: 500 },
    username: { type: 'string', minLength: 2, maxLength: 25 },
  },
  required: ['content'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      content: 'Comment content must be between 1 and 500 characters.',
      username: 'Username must be between 2 and 25 characteres.',
    },
    required: {
      content: 'Comment content is required.',
      username: 'Username is required.',
    },
  },
}
