import axios from 'axios'
import createHttpError from 'http-errors'
import { Context } from 'koa'
import { config } from '../config/config'

export const getXUserHeader = (ctx: Context): Record<'x-user', string> => {
  const xUserHeader = ctx.headers['x-user']

  if (typeof xUserHeader !== 'string') {
    throw new createHttpError.Unauthorized('Invalid or missing x-user header')
  }

  return { 'x-user': xUserHeader }
}

export const validateUserExists = async (
  userId: string,
  headers: Record<string, string>,
) => {
  try {
    const res = await axios.get(`${config.USER_SERVICE_ENDPOINT}/${userId}`, {
      headers,
    })

    if (!res.data) {
      throw new createHttpError.NotFound(`User not found`)
    }

    return res.data
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new createHttpError.NotFound(`User with ID ${userId} not found.`)
    }

    throw new createHttpError.InternalServerError(
      `Failed to validate user existence.`,
    )
  }
}
