import { UserRole } from '../../entities/User'

export const registerSchema = {
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
  },
  required: ['username', 'email', 'password', 'role'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      username: 'Username must be between 6 and 20 characters.',
      email: 'Email must be a valid format (e.g., user@example.com).',
      password: 'Password must be between 6 and 20 characters.',
      role: `Role must be one of: ${Object.values(UserRole).join(', ')}.`,
    },
    required: {
      username: 'Username is required.',
      email: 'Email is required.',
      password: 'Password is required.',
      role: 'Role is required.',
    },
  },
}

export const loginSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 6,
      maxLength: 20,
    },
    password: {
      type: 'string',
      minLength: 6,
      maxLength: 20,
    },
  },
  required: ['username', 'password'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      username: 'Username must be between 6 and 20 characters.',
      password: 'Password must be between 6 and 20 characters.',
    },
    required: {
      username: 'Username is required.',
      password: 'Password is required.',
    },
  },
}
