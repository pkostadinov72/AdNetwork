import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from "@reduxjs/toolkit/query";
import type { RootState } from "@/store/store";
import { logoutUser } from "@/store/slices/authSlice";

const BASE_URL = import.meta.env.VITE_BASE_API;

const baseQueryWithAuthHeaders = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = (getState() as RootState).auth.token;

    const publicEndpoints = ["auth/login", "auth/register"];
    if (token && !publicEndpoints.includes(endpoint)) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  }
});

export const authBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQueryWithAuthHeaders(args, api, extraOptions);

  if (result?.error?.originalStatus === 401) {
    api.dispatch(logoutUser());
  }

  return result;
};
