import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "./authBaseQuery";
import { Asset } from "@/types/assets";

const TAG = "Asset";
const ENDPOINT = "/assets";

export const assetApi = createApi({
  reducerPath: "assetApi",
  baseQuery: authBaseQuery,
  tagTypes: [TAG],

  endpoints: (builder) => ({
    uploadAsset: builder.mutation<Asset, FormData>({
      query: (data) => ({
        url: ENDPOINT,
        method: "POST",
        body: data
      }),
      invalidatesTags: [TAG]
    }),

    getAllAssets: builder.query<Asset[], void>({
      query: () => ENDPOINT,
      providesTags: [TAG]
    }),

    getAssetById: builder.query<Asset, string>({
      query: (id) => `${ENDPOINT}/${id}`,
      providesTags: (result, error, id) => [{ type: TAG, id }]
    }),

    deleteAsset: builder.mutation<void, string>({
      query: (id) => ({
        url: `${ENDPOINT}/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: (result, error, id) => [{ type: TAG, id }, TAG]
    })
  })
});

export const {
  useUploadAssetMutation,
  useGetAllAssetsQuery,
  useGetAssetByIdQuery,
  useDeleteAssetMutation
} = assetApi;
