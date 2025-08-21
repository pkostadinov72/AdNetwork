export interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  username: string;
  content: string;
  createdAt: string;
}

export enum PostVisibility {
  PUBLIC = "public",
  CONNECTIONS = "connections",
  PRIVATE = "private"
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  mediaUrl: string;
  visibility: PostVisibility;
  originalPostId?: string | null;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  likes: Like[];
}

export interface UpdatePostPayload {
  content?: string;
  visibility?: PostVisibility;
}
