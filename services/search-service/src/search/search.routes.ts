import Router from 'koa-router'
import { searchAll } from './search.controller'

export const searchRouter = new Router({ prefix: '/search' })

searchRouter.get('/', searchAll)
