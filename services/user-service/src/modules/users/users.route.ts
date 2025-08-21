import Router from 'koa-router'
import { validatorMiddleware } from '../../middlewares/validator.middleware'
import { createUserSchema, updateUserSchema } from './user-validation.schema'
import {
  createUser,
  deleteUser,
  getUserById,
  getUserByUsername,
  getUsers,
  updateUser,
} from './users.controller'
import { authorizeUserOrAdmin } from '../../middlewares/authorize-user-admin.middleware'

export const userRouter = new Router({ prefix: '/users' })

userRouter.get('/', getUsers)
userRouter.get('/:id', getUserById)
userRouter.get('/username/:username', getUserByUsername)

userRouter.post('/', validatorMiddleware(createUserSchema), createUser)
userRouter.patch(
  '/:id',
  validatorMiddleware(updateUserSchema),
  authorizeUserOrAdmin,
  updateUser,
)

userRouter.delete('/:id', authorizeUserOrAdmin, deleteUser)
