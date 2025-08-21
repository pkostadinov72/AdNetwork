import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "./authBaseQuery";

const ENDPOINT = "auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${ENDPOINT}/login`,
        method: "POST",
        body: credentials
      })
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${ENDPOINT}/register`,
        method: "POST",
        body: data
      })
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${ENDPOINT}/logout`,
        method: "POST"
      })
    })
  })
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
