import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum AssetOwnerType {
  USER = 'user',
  POST = 'post',
}

export enum AssetStatus {
  ACTIVE = 'active',
  DELETED = 'deleted',
}

export enum AssetType {
  AVATAR = 'avatar',
  COVER = 'cover',
  MEDIA = 'media',
}

@Entity('assets')
export class Asset {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'file_name', type: 'varchar', length: 255 })
  fileName: string

  @Column({ name: 'file_type', type: 'varchar', length: 50 })
  fileType: string

  @Column({ type: 'text' })
  url: string

  @Column({
    name: 'imagekit_file_id',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  imageKitFileId: string

  @Column({ name: 'owner_id', type: 'uuid' })
  ownerId: string

  @Column({
    name: 'owner_type',
    type: 'enum',
    enum: AssetOwnerType,
  })
  ownerType: AssetOwnerType

  @Column({
    name: 'asset_type',
    type: 'enum',
    enum: AssetType,
  })
  assetType: AssetType

  @Column({ type: 'bigint' })
  size: number

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date

  @Column({ type: 'jsonb', nullable: true })
  metadata?: { [key: string]: any }

  @Column({
    type: 'enum',
    enum: AssetStatus,
    default: AssetStatus.ACTIVE,
  })
  status: AssetStatus
}
