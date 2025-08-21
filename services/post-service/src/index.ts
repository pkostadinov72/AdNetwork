import Koa from 'koa'
import Router from 'koa-router'
import { config } from './config/config'
import { connectDatabase } from './config/database'
import { errorHandlerMiddleware } from './middleware/error-handler.middleware'
import koaBody from 'koa-body'
import { extractUserMiddleware } from './middleware/extract-user.middleware'
import { postRouter } from './modules/posts/post.routes'
import { connectRabbitMQ } from './config/rabbitmq'

const app = new Koa()
const router = new Router({
  prefix: '/api/v1',
})

app.use(errorHandlerMiddleware)

app.use(
  koaBody({
    multipart: true,
    formidable: {
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, //5mb
    },
  }),
)

app.use(extractUserMiddleware)

router.get('/posts/health', async (ctx) => {
  ctx.body = { message: 'Post Service Running ' }
})

router.use(postRouter.routes())

app.use(router.routes()).use(router.allowedMethods())

const startServer = async () => {
  try {
    await connectDatabase()
    await connectRabbitMQ()
    app.listen(config.PORT, () => {
      console.log(`Post Service is running on http://localhost:${config.PORT}`)
    })
  } catch (error) {
    console.error('Failed to connect to the database:', error)
    process.exit(1)
  }
}

startServer()
