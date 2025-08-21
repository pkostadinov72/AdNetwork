import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { config } from './config/config'
import { connectRabbitMQ } from './config/rabbitmq'
import { initConsumer } from './events/consumer'
import { errorHandlerMiddleware } from './middleware/error-handler.middleware'
import { registerTypesenseCollections } from './config/typesense/typesense'
import { searchRouter } from './search/search.routes'
import { extractUserMiddleware } from './middleware/extract-user.middleware'

const app = new Koa()
const router = new Router({
  prefix: '/api/v1',
})

app.use(errorHandlerMiddleware)

app.use(bodyParser())

app.use(extractUserMiddleware)

router.use(searchRouter.routes())

app.use(router.routes()).use(router.allowedMethods())

const startServer = async () => {
  try {
    await registerTypesenseCollections()
    await connectRabbitMQ()
    await initConsumer()
    app.listen(config.PORT, () => {
      console.log(
        `Search Service is running on http://localhost:${config.PORT}`,
      )
    })
  } catch (error) {
    console.error('Failed to connect to the database:', error)
    process.exit(1)
  }
}

startServer()
