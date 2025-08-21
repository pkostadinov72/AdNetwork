import ImageKit from 'imagekit'
import { config } from './config'

export const imageKit = new ImageKit({
  publicKey: config.IMAGEKIT.IMAGEKIT_PUBLIC_KEY,
  privateKey: config.IMAGEKIT.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: config.IMAGEKIT.IMAGEKIT_URL_ENDPOINT,
})
