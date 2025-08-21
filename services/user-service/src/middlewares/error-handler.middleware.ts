import createHttpError from 'http-errors'
import { Context, Next } from 'koa'

export const errorHandlerMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next()
  } catch (err: any) {
    if (createHttpError.isHttpError(err)) {
      console.log(err)
      ctx.throw(err.statusCode || 500, err.message || 'Internal Server Error')
    } else {
      console.error('Unexpected error:', err)
      ctx.throw(500, 'Internal Server Error')
    }
  }
}
