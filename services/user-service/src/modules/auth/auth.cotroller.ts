import { loginUser, logoutUser, registerUser } from './auth.service'

import { Context } from 'koa'

import { User } from '../../entities/User'

export const register = async (ctx: Context) => {
  const { username, email, password, role } = ctx.request.body as User

  const userWithToken = await registerUser(username, email, password, role)

  ctx.status = 201
  ctx.body = userWithToken
}

export const login = async (ctx: Context) => {
  const { username, password } = ctx.request.body as User

  const userWithToken = await loginUser(username, password)

  ctx.status = 200
  ctx.body = userWithToken
}

export const logout = async (ctx: Context) => {
  await logoutUser(ctx.state.user.id)

  ctx.status = 200
}
