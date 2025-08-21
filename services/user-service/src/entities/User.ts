import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum UserRole {
  REGULAR = 'regular',
  ADVERTISER = 'advertiser',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Column({ select: false })
  password: string

  @Column({ type: 'enum', enum: UserRole, default: UserRole.REGULAR })
  role: UserRole

  @Column({ nullable: true })
  avatarUrl: string

  @Column({ nullable: true })
  coverImageUrl: string

  @Column({ nullable: true })
  fullName: string

  @Column({ nullable: true })
  profession: string

  @Column({ type: 'text', nullable: true })
  biography: string

  @Column({ type: 'int', default: 0 })
  connections: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
