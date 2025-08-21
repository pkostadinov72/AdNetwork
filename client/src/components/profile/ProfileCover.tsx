import { useAssets } from "@/hooks/useAssets";
import { AssetType } from "@/types/assets";
import { Camera } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "sonner";

interface ProfileCoverProps {
  alt: string;
  coverUrl?: string;
  canEdit: boolean;
  onUploadSuccess?: (url: string) => void;
}

const ProfileCover = ({
  coverUrl,
  canEdit,
  alt,
  onUploadSuccess
}: ProfileCoverProps) => {
  const { uploadAsset, uploadStatus } = useAssets();

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const newCover = await uploadAsset(file, AssetType.COVER);
      onUploadSuccess?.(newCover.url);
      toast.success("Cover has been changed successfully.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Cover upload failed", error);
    }
  };

  return (
    <div className="relative h-80 mb-4 rounded-lg overflow-hidden group">
      <img
        src={
          coverUrl ||
          "https://ui-avatars.com/api/?name=User&background=ddd&color=333&size=200"
        }
        alt={alt}
        className="w-full h-full object-cover"
      />

      {uploadStatus.isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
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
            onChange={handleCoverChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

export default ProfileCover;
