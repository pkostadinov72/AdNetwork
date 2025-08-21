import bcrypt from 'bcryptjs'
import createHttpError from 'http-errors'
import { UserRole } from '../../entities/User'
import { omit } from 'lodash'
import { userRepository } from '../../config/database'
import {
  createUserService,
  getUserWithPasswordByUsername,
} from '../users/users.service'
import { createToken, invalidateToken } from '../../utils/token'
import { publishUserIndex } from '../../events/producer'

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  role: UserRole,
) => {
  const userExists = await userRepository.findOne({ where: { username } })
  if (userExists) {
    throw new createHttpError.BadRequest(
      'User with this username already exists',
    )
  }

  const newUser = await createUserService({ username, email, password, role })

  const token = await createToken(newUser)

  await publishUserIndex({
    id: newUser.id,
    username: newUser.username,
    fullName: newUser.fullName,
    role: newUser.role,
  })

  return { user: omit(newUser, ['password']), token }
}

export const loginUser = async (username: string, password: string) => {
  const user = await getUserWithPasswordByUsername(username)

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new createHttpError.Unauthorized('Invalid credentials')
  }

  const token = await createToken(user)

  return { user: omit(user, ['password']), token }
}

export const logoutUser = async (userId: string) => {
  const wasTokenInvalidated = await invalidateToken(userId)

  if (!wasTokenInvalidated) {
    throw new createHttpError.BadRequest(
      'Token does not exist or was already invalidated',
    )
  }

  return wasTokenInvalidated
}
