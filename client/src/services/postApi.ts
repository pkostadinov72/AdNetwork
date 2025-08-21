import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "./authBaseQuery";
import { Post, UpdatePostPayload } from "@/types/post";

const TAG = "Post";
const ENDPOINT = "/posts";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: authBaseQuery,
  tagTypes: [TAG],

  endpoints: (builder) => ({
    getAllPosts: builder.query<Post[], void>({
      query: () => ENDPOINT,
      providesTags: [TAG]
    }),

    getPostById: builder.query<Post, string>({
      query: (id) => `${ENDPOINT}/${id}`,
      providesTags: (result, error, id) => [{ type: TAG, id }]
    }),

    getPostsByUserId: builder.query<Post[], string>({
      query: (userId) => `${ENDPOINT}/user/${userId}`,
      providesTags: (result, error, userId) => [{ type: TAG, id: userId }]
    }),

    createPost: builder.mutation<Post, FormData>({
      query: (formData) => ({
        url: ENDPOINT,
        method: "POST",
        body: formData
      })
    }),

    updatePost: builder.mutation<Post, { id: string; data: UpdatePostPayload }>(
      {
        query: ({ id, data }) => ({
          url: `${ENDPOINT}/${id}`,
          method: "PATCH",
          body: data
        }),
        invalidatesTags: (result, error, { id }) => [{ type: TAG, id }]
      }
    ),

    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `${ENDPOINT}/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: (result, error, id) => [{ type: TAG, id }, TAG]
    }),

    toggleLike: builder.mutation<{ liked: boolean }, string>({
      query: (postId) => ({
        url: `${ENDPOINT}/${postId}/likes`,
        method: "POST"
      }),
      invalidatesTags: (result, error, id) => [{ type: TAG, id }, TAG]
    }),

    createComment: builder.mutation<
      Comment,
      { postId: string; data: { content: string; username: string } }
    >({
      query: ({ postId, data }) => ({
        url: `${ENDPOINT}/${postId}/comments`,
        method: "POST",
        body: data
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: TAG, id: postId }
      ]
    }),

    deleteComment: builder.mutation<
      void,
      { postId: string; commentId: string }
    >({
      query: ({ postId, commentId }) => ({
        url: `${ENDPOINT}/${postId}/comments/${commentId}`,
        method: "DELETE"
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: TAG, id: postId }
      ]
    })
  })
});

export const {
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useGetPostsByUserIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useToggleLikeMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation
} = postApi;
