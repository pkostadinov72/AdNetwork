import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/slices/authSlice";
import { authApi } from "@/services/authApi";
import { profileApi } from "@/services/profileApi";
import { assetApi } from "@/services/assetApi";
import { postApi } from "@/services/postApi";
import { searchApi } from "@/services/searchApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [assetApi.reducerPath]: assetApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      profileApi.middleware,
      assetApi.middleware,
      postApi.middleware,
      searchApi.middleware
    )
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
