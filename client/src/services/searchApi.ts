import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "./authBaseQuery";
import { SearchResult } from "@/types/search";

const TAG = "Search";
const ENDPOINT = "/search";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: authBaseQuery,
  tagTypes: [TAG],

  endpoints: (builder) => ({
    search: builder.query<SearchResult, string>({
      query: (queryStr) => `${ENDPOINT}?q=${encodeURIComponent(queryStr)}`,
      providesTags: [TAG]
    })
  })
});

export const { useSearchQuery } = searchApi;
