import Koa from 'koa'
import Router from 'koa-router'
import cors from '@koa/cors'
import { connectRedis } from './config/redis'
import { verifyToken } from './middleware/auth.middleware'
import { config } from './config/config'
import { authRouter } from './routes/auth.routes'
import { userRouter } from './routes/user.routes'
import { assetRouter } from './routes/asset.routes'
import { postRouter } from './routes/post.routes'
import { searchRouter } from './routes/search.routes'

const app = new Koa()
const router = new Router()

app.use(cors())

// Public Auth Routes (no token verification)
router.use(authRouter.routes())

router.use(verifyToken)

router.use(userRouter.routes())
router.use(assetRouter.routes())
router.use(postRouter.routes())
router.use(searchRouter.routes())

app.use(router.routes())
app.use(router.allowedMethods())

const startServer = async () => {
  try {
    await connectRedis()
    app.listen(config.PORT, () => {
      console.log(`API Gateway running on port ${config.PORT}`)
    })
  } catch (error) {
    console.error('❌ Failed to connect to the database:', error)
    process.exit(1)
  }
}

startServer()
