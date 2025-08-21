import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "./authBaseQuery";

const ENDPOINT = "users";

const TAG = "User";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: authBaseQuery,
  tagTypes: [TAG],

  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => `${ENDPOINT}`,
      providesTags: [TAG]
    }),

    getUserById: builder.query({
      query: (id: string) => `${ENDPOINT}/${id}`,
      providesTags: (result, error, id) => [{ type: TAG, id }]
    }),

    getUserByUsername: builder.query({
      query: (username: string) => `${ENDPOINT}/username/${username}`,
      providesTags: (result, error, username) => [{ type: TAG, id: username }]
    }),

    createUser: builder.mutation({
      query: (userData) => ({
        url: `${ENDPOINT}`,
        method: "POST",
        body: userData
      }),
      invalidatesTags: [TAG]
    }),

    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${ENDPOINT}/${id}`,
        method: "PATCH",
        body: patch
      }),
      invalidatesTags: (result, error, { id }) => [{ type: TAG, id }]
    }),

    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `${ENDPOINT}/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: (result, error, id) => [{ type: TAG, id }, TAG]
    })
  })
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetUserByUsernameQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = profileApi;
