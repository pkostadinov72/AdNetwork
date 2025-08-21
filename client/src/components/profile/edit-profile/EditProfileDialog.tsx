import { DialogLayout } from "@/layouts/DialogLayout";
import ProfileCover from "../ProfileCover";
import { ProfileAvatar } from "../ProfileAvatar";
import { EditProfileForm, ProfileFormData } from "./EditProfileForm";
import { profileApi, useUpdateUserMutation } from "@/services/profileApi";
import { useAppDispatch } from "@/store/redux-hooks/useAppDispatch";
import { useState } from "react";
import { useDialog } from "@/hooks/useDialog";
import { toast } from "sonner";

interface EditProfileDialogProps {
  profileId: string;
  username: string;
  fullName: string;
  profession: string;
  bio: string;
  email: string;
  coverUrl: string;
  avatarUrl: string;
}

const EditProfileDialog = ({
  profileId,
  fullName,
  profession,
  bio,
  email,
  coverUrl: initialCoverUrl,
  avatarUrl: initialAvatarUrl
}: EditProfileDialogProps) => {
  const { closeDialog } = useDialog();

  const [update, { isLoading: isUpdatingUser, error }] =
    useUpdateUserMutation();

  const dispatch = useAppDispatch();

  const [coverUrl, setCoverUrl] = useState(initialCoverUrl);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);

  const handleSubmit = async (editedUserData: ProfileFormData) => {
    try {
      const updatedUser = await update({
        id: profileId,
        ...editedUserData
      }).unwrap();
      toast.success("Profile has been edited successfully.");
      dispatch(
        profileApi.util.invalidateTags([
          { type: "User", id: updatedUser.username }
        ])
      );
      closeDialog();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <DialogLayout>
      <div className="bg-white p-4 rounded-2xl">
        <h3 className="text-lg font-medium leading-6 text-gray-900 pb-6">
          Edit Profile
        </h3>
        <div className="space-y-4">
          <div className="space-y-4">
            <ProfileCover
              alt={fullName}
              coverUrl={coverUrl}
              canEdit={true}
              onUploadSuccess={setCoverUrl}
            />
            <ProfileAvatar
              alt={fullName}
              avatarUrl={avatarUrl}
              canEdit={true}
              onUploadSuccess={setAvatarUrl}
            />
          </div>
          <EditProfileForm
            fullName={fullName}
            profession={profession}
            bio={bio}
            isSubmitting={isUpdatingUser}
            email={email}
            onSubmit={handleSubmit}
            onCancel={closeDialog}
            editError={error?.data}
          />
        </div>
      </div>
    </DialogLayout>
  );
};

export default EditProfileDialog;
