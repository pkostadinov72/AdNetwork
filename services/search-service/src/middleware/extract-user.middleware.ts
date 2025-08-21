import { Context, Next } from 'koa'

export const extractUserMiddleware = async (ctx: Context, next: Next) => {
  const userHeader = ctx.headers['x-user']

  if (userHeader) {
    try {
      ctx.state.user = JSON.parse(userHeader as string)
    } catch (error) {
      console.error('Invalid x-user header:', error)
    }
  }

  await next()
}
