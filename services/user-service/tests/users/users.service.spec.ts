import * as userService from '../../src/modules/users/users.service'
import { userRepository } from '../../src/config/database'
import { User, UserRole } from '../../src/entities/User'
import bcrypt from 'bcryptjs'

jest.mock('../../src/config/database', () => ({
  userRepository: {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      getOne: jest.fn(),
    })),
  },
}))

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
}))

const mockedUserRepository = userRepository as jest.Mocked<
  typeof userRepository
>

const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>

describe('User Service', () => {
  const mockUser: User = {
    id: 'user-123',
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashedPassword123',
    role: UserRole.REGULAR,
    avatarUrl: '',
    coverImageUrl: '',
    fullName: '',
    profession: '',
    biography: '',
    connections: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const fakeUser = (overrides: Partial<User> = {}): User => ({
    ...mockUser,
    ...overrides,
  })

  describe('getUsersService', () => {
    it('should return all users', async () => {
      const mockUsers = [mockUser, { ...mockUser, id: 'user-456' }]
      mockedUserRepository.find.mockResolvedValue(mockUsers)

      const result = await userService.getUsersService()

      expect(result).toEqual(mockUsers)
      expect(mockedUserRepository.find).toHaveBeenCalledTimes(1)
    })
  })

  describe('getUserByIdService', () => {
    it('should return a user when found', async () => {
      mockedUserRepository.findOne.mockResolvedValue(mockUser)

      const result = await userService.getUserByIdService('user-123')

      expect(result).toEqual(mockUser)
      expect(mockedUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'user-123' },
      })
    })

    it('should throw NotFound error when user not found', async () => {
      mockedUserRepository.findOne.mockResolvedValue(null)

      await expect(
        userService.getUserByIdService('non-existent'),
      ).rejects.toThrow('User not found')
      expect(mockedUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'non-existent' },
      })
    })
  })

  describe('getUserWithPasswordByUsername', () => {
    it('should return user with password when found', async () => {
      const localQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(mockUser),
      }

      mockedUserRepository.createQueryBuilder.mockReturnValue(
        localQueryBuilder as any,
      )

      const result = await userService.getUserWithPasswordByUsername('testuser')

      expect(result).toEqual(mockUser)
      expect(localQueryBuilder.where).toHaveBeenCalledWith(
        'user.username = :username',
        { username: 'testuser' },
      )
      expect(localQueryBuilder.addSelect).toHaveBeenCalledWith('user.password')
      expect(localQueryBuilder.getOne).toHaveBeenCalled()
    })

    it('should throw BadRequest error when user not found', async () => {
      const localQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(null),
      }

      mockedUserRepository.createQueryBuilder.mockReturnValue(
        localQueryBuilder as any,
      )

      await expect(
        userService.getUserWithPasswordByUsername('non-existent'),
      ).rejects.toThrow("User doesn't exist")

      expect(localQueryBuilder.getOne).toHaveBeenCalled()
    })
  })

  describe('getUserByUsernameService', () => {
    it('should return a user when found', async () => {
      mockedUserRepository.findOne.mockResolvedValue(mockUser)

      const result = await userService.getUserByUsernameService('testuser')

      expect(result).toEqual(mockUser)
      expect(mockedUserRepository.findOne).toHaveBeenCalledWith({
        where: { username: 'testuser' },
      })
    })

    it('should throw BadRequest error when user not found', async () => {
      mockedUserRepository.findOne.mockResolvedValue(null)

      await expect(
        userService.getUserByUsernameService('non-existent'),
      ).rejects.toThrow("User doesn't exist")
    })
  })

  describe('createUserService', () => {
    const newUserData = {
      username: 'newuser',
      email: 'new@example.com',
      password: 'password123',
      role: UserRole.REGULAR,
    }

    it('should create and return a new user', async () => {
      mockedUserRepository.findOne.mockResolvedValue(null)
      ;(mockedBcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword123')

      const createdUser = fakeUser()
      mockedUserRepository.create.mockReturnValue(createdUser)
      mockedUserRepository.save.mockResolvedValue(createdUser)

      const result = await userService.createUserService(newUserData)

      expect(result).toEqual(createdUser)
      expect(mockedUserRepository.findOne).toHaveBeenCalledWith({
        where: [{ username: 'newuser' }, { email: 'new@example.com' }],
      })
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10)
      expect(mockedUserRepository.create).toHaveBeenCalledWith({
        ...newUserData,
        password: 'hashedPassword123',
      })
      expect(mockedUserRepository.save).toHaveBeenCalledWith(createdUser)
    })

    it('should throw BadRequest error when username or email already exists', async () => {
      mockedUserRepository.findOne.mockResolvedValue(mockUser)

      await expect(userService.createUserService(newUserData)).rejects.toThrow(
        'Username or email already exists',
      )
    })
  })

  describe('updateUserService', () => {
    const updateData = {
      fullName: 'Updated Name',
      biography: 'Updated bio',
    }

    it('should update and return user when found', async () => {
      mockedUserRepository.findOne.mockResolvedValueOnce(mockUser)

      const updatedUser = { ...mockUser, ...updateData }
      mockedUserRepository.findOne.mockResolvedValueOnce(updatedUser)

      const result = await userService.updateUserService('user-123', updateData)

      expect(result).toEqual(updatedUser)
      expect(mockedUserRepository.findOne).toHaveBeenCalledTimes(2)
      expect(mockedUserRepository.update).toHaveBeenCalledWith(
        'user-123',
        updateData,
      )
    })

    it('should hash password when updating password', async () => {
      mockedUserRepository.findOne.mockResolvedValueOnce(mockUser)
      ;(mockedBcrypt.hash as jest.Mock).mockResolvedValue('newHashedPassword')

      const passwordUpdate = { password: 'newPassword' }
      const updatedUser = { ...mockUser, password: 'newHashedPassword' }
      mockedUserRepository.findOne.mockResolvedValueOnce(updatedUser)

      await userService.updateUserService('user-123', passwordUpdate)

      expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', 10)
      expect(mockedUserRepository.update).toHaveBeenCalledWith('user-123', {
        password: 'newHashedPassword',
      })
    })

    it('should throw NotFound error when user not found', async () => {
      mockedUserRepository.findOne.mockResolvedValue(null)

      await expect(
        userService.updateUserService('non-existent', updateData),
      ).rejects.toThrow('User not found')
    })
  })

  describe('deleteUserService', () => {
    it('should delete user when found', async () => {
      mockedUserRepository.findOne.mockResolvedValue(mockUser)

      await userService.deleteUserService('user-123')

      expect(mockedUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'user-123' },
      })
      expect(mockedUserRepository.delete).toHaveBeenCalledWith('user-123')
    })

    it('should throw NotFound error when user not found', async () => {
      mockedUserRepository.findOne.mockResolvedValue(null)

      await expect(
        userService.deleteUserService('non-existent'),
      ).rejects.toThrow('User not found')
    })
  })
})
