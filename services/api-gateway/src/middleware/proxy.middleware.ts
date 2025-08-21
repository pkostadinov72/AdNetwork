import { Context, Next } from 'koa'
import KoaProxies from 'koa-proxies'
import { SERVICES } from '../config/config'

export const createProxy =
  (route: string) => async (ctx: Context, next: Next) => {
    const proxyOptions = {
      target: SERVICES[route],
      changeOrigin: true,
      logs: true,
      events: {
        proxyReq: (proxyReq: any) => {
          if (ctx.state?.user) {
            proxyReq.setHeader('x-user', JSON.stringify(ctx.state.user))
          }
        },
      },
    }

    return KoaProxies(route, proxyOptions)(ctx, next)
  }
