import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { Context, Next } from 'koa'
import createHttpError from 'http-errors'
import ajvErrors from 'ajv-errors'

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
ajvErrors(ajv)

export const validatorMiddleware = (schema: Object) => {
  return async (ctx: Context, next: Next) => {
    try {
      const validate = ajv.compile(schema)
      const valid = validate(ctx.request.body)

      if (!valid) {
        throw createHttpError(
          400,
          validate.errors![0].message || 'Invalid input',
        )
      }

      await next()
    } catch (error: any) {
      throw createHttpError(
        error.status || 500,
        error.message || 'Internal Server Error',
      )
    }
  }
}
