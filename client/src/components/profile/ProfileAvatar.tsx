import { Camera } from "lucide-react";
import { useAssets } from "@/hooks/useAssets";
import { AssetType } from "@/types/assets";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "sonner";

interface ProfileAvatarProps {
  alt: string;
  avatarUrl?: string;
  canEdit: boolean;
  onUploadSuccess?: (url: string) => void;
}

export const ProfileAvatar = ({
  alt,
  avatarUrl,
  canEdit,
  onUploadSuccess
}: ProfileAvatarProps) => {
  const { uploadAsset, uploadStatus } = useAssets();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const newAvatar = await uploadAsset(file, AssetType.AVATAR);
      onUploadSuccess?.(newAvatar.url);
      toast.success("Avatar has been changed successfully.");
    } catch (error) {
      console.error("Avatar upload failed", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative -mt-16 sm:-mt-20 group flex-shrink-0 w-fit">
      <img
        src={
          avatarUrl ||
          "https://ui-avatars.com/api/?name=User&background=ddd&color=333&size=200"
        }
        alt={alt}
        className="w-32 h-32 rounded-full object-cover border-4 border-white"
      />

      {uploadStatus.isLoading && (
        <div className="absolute inset-0 rounded-full bg-white bg-opacity-50 flex items-center justify-center">
          <ClipLoader color="#000" size={40} />
        </div>
      )}

      {canEdit && !uploadStatus.isLoading && (
        <label
          className="absolute bottom-1 right-1 cursor-pointer bg-black text-white p-1 rounded-full 
        opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
        >
          <Camera size={16} />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};
