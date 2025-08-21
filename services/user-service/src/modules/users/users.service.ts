import createHttpError from 'http-errors'
import bcrypt from 'bcryptjs'
import { User } from '../../entities/User'
import { userRepository } from '../../config/database'

export const getUsersService = async () => {
  return await userRepository.find()
}

export const getUserByIdService = async (id: string) => {
  const user = await userRepository.findOne({ where: { id } })
  if (!user) throw new createHttpError.NotFound('User not found')
  return user
}

export const getUserWithPasswordByUsername = async (
  username: string,
): Promise<User> => {
  const user = await userRepository
    .createQueryBuilder('user')
    .where('user.username = :username', { username })
    .addSelect('user.password')
    .getOne()

  if (!user) throw new createHttpError.BadRequest("User doesn't exist")

  return user
}

export const getUserByUsernameService = async (
  username: string,
): Promise<User> => {
  const user = await userRepository.findOne({ where: { username } })

  if (!user) throw new createHttpError.BadRequest("User doesn't exist")

  return user
}

export const createUserService = async (userData: Partial<User>) => {
  const { username, email, password, role } = userData

  const existingUser = await userRepository.findOne({
    where: [{ username }, { email }],
  })
  if (existingUser)
    throw new createHttpError.BadRequest('Username or email already exists')

  const hashedPassword = await bcrypt.hash(password!, 10)
  const newUser = userRepository.create({
    ...userData,
    password: hashedPassword,
  })

  await userRepository.save(newUser)
  return newUser
}

export const updateUserService = async (
  id: string,
  updateData: Partial<User>,
) => {
  const user = await userRepository.findOne({ where: { id } })
  if (!user) throw new createHttpError.NotFound('User not found')

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10)
  }

  await userRepository.update(id, updateData)
  return await userRepository.findOne({ where: { id } })
}

export const deleteUserService = async (id: string) => {
  const user = await userRepository.findOne({ where: { id } })
  if (!user) throw new createHttpError.NotFound('User not found')

  await userRepository.delete(id)
}
