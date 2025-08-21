import { DataSource } from 'typeorm'
import { config } from './config'
import { User } from '../entities/User'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.POSTGRES.HOST,
  port: config.POSTGRES.PORT,
  username: config.POSTGRES.USER,
  password: config.POSTGRES.PASSWORD,
  database: config.POSTGRES.DATABASE,
  entities: ['src/entities/*.ts'],
  synchronize: true,
})

export const connectDatabase = async () => {
  try {
    await AppDataSource.initialize()
    console.log('Database connected')
  } catch (error) {
    console.error('Database connection failed:', error)
  }
}

export const userRepository = AppDataSource.getRepository(User)
