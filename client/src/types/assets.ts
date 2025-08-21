export enum AssetType {
  COVER = "cover",
  AVATAR = "avatar",
  MEDIA = "media"
}

export enum OwnerType {
  USER = "user",
  POST = "post"
}

export interface Asset {
  id: string;
  fileName: string;
  fileType: string;
  url: string;
  imageKitFileId: string;
  ownerId: string;
  ownerType: OwnerType;
  assetType: AssetType;
  size: number;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, unknown>;
  status: "active" | "deleted";
}
