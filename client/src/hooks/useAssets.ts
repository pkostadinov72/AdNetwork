import { useUploadAssetMutation } from "@/services/assetApi";
import { profileApi } from "@/services/profileApi";
import { useAppDispatch } from "@/store/redux-hooks/useAppDispatch";
import { useAppSelector } from "@/store/redux-hooks/useAppSelector";
import { AssetType, OwnerType } from "@/types/assets";

const assetOwnerMap: Record<AssetType, OwnerType> = {
  [AssetType.COVER]: OwnerType.USER,
  [AssetType.AVATAR]: OwnerType.USER,
  [AssetType.MEDIA]: OwnerType.POST
};

export const useAssets = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [uploadAssetMutation, uploadStatus] = useUploadAssetMutation();

  const uploadAsset = async (file: File, assetType: AssetType) => {
    if (!user) throw new Error("User not authenticated");

    const ownerType = assetOwnerMap[assetType];

    const formData = new FormData();
    formData.append("fileName", file.name);
    formData.append("fileType", file.type);
    formData.append("ownerId", user.id);
    formData.append("ownerType", ownerType);
    formData.append("assetType", assetType);
    formData.append("file", file);

    const response = await uploadAssetMutation(formData).unwrap();

    if (assetType === AssetType.COVER || assetType === AssetType.AVATAR) {
      dispatch(
        profileApi.util.invalidateTags([{ type: "User", id: user.username }])
      );
    }

    return response;
  };

  return {
    uploadAsset,
    uploadStatus
  };
};
