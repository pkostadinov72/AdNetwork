export type UserSearchResult = {
  id: string;
  username: string;
  fullName: string;
};

export type PostSearchResult = {
  id: string;
  userId: string;
  content: string;
};

export type SearchResult = {
  users: UserSearchResult[];
  posts: PostSearchResult[];
};
