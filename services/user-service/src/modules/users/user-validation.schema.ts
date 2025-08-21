import { UserRole } from '../../entities/User'

export const createUserSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 6,
      maxLength: 20,
    },
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 6,
      maxLength: 20,
    },
    role: {
      type: 'string',
      enum: Object.values(UserRole),
    },
    avatarUrl: {
      type: 'string',
      format: 'uri',
      nullable: true,
    },
    coverImageUrl: {
      type: 'string',
      format: 'uri',
      nullable: true,
    },
    fullName: {
      type: 'string',
      minLength: 2,
      maxLength: 50,
      nullable: true,
    },
    profession: {
      type: 'string',
      minLength: 2,
      maxLength: 50,
      nullable: true,
    },
    biography: {
      type: 'string',
      maxLength: 1000,
      nullable: true,
    },
    connections: {
      type: 'integer',
      minimum: 0,
      default: 0,
    },
  },
  required: ['username', 'email', 'password', 'role'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      username: 'Username must be between 6 and 20 characters.',
      email: 'Email must be a valid format (e.g., user@example.com).',
      password: 'Password must be between 6 and 20 characters.',
      role: `Role must be one of: ${Object.values(UserRole).join(', ')}.`,
      avatarUrl: 'Avatar URL must be a valid URI.',
      coverImageUrl: 'Cover image URL must be a valid URI.',
      fullName: 'Full name must be between 2 and 50 characters.',
      profession: 'Profession must be between 2 and 50 characters.',
      biography: 'Biography must be less than 1000 characters.',
      connections: 'Connections must be a positive integer.',
    },
    required: {
      username: 'Username is required.',
      email: 'Email is required.',
      password: 'Password is required.',
      role: 'Role is required.',
    },
  },
}

export const updateUserSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6, maxLength: 20 },
    role: { type: 'string', enum: Object.values(UserRole) },
    avatarUrl: { type: 'string', format: 'uri', nullable: true },
    coverImageUrl: { type: 'string', format: 'uri', nullable: true },
    fullName: { type: 'string', minLength: 2, maxLength: 50, nullable: true },
    profession: { type: 'string', minLength: 2, maxLength: 50, nullable: true },
    biography: { type: 'string', maxLength: 1000, nullable: true },
    connections: { type: 'integer', minimum: 0 },
  },
  additionalProperties: false,
  errorMessage: {
    properties: {
      email: 'Email must be a valid format (e.g., user@example.com).',
      password: 'Password must be between 6 and 20 characters.',
      role: `Role must be one of: ${Object.values(UserRole).join(', ')}.`,
      avatarUrl: 'Avatar URL must be a valid URI.',
      coverImageUrl: 'Cover image URL must be a valid URI.',
      fullName: 'Full name must be between 2 and 50 characters.',
      profession: 'Profession must be between 2 and 50 characters.',
      biography: 'Biography must be less than 1000 characters.',
      connections: 'Connections must be a positive integer.',
    },
  },
}
