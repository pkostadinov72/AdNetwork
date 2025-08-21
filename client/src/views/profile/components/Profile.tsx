import { useParams } from "react-router-dom";
import ProfileCover from "../../../components/profile/ProfileCover";
import { useGetUserByUsernameQuery } from "@/services/profileApi";
import { useAppSelector } from "@/store/redux-hooks/useAppSelector";
import { ProfileAvatar } from "../../../components/profile/ProfileAvatar";
import { ProfileInfoSection } from "../../../components/profile/ProfileInfoSection";
import { useAppDispatch } from "@/store/redux-hooks/useAppDispatch";
import { useLogoutMutation } from "@/services/authApi";
import { logoutUser } from "@/store/slices/authSlice";
import { ProfilePosts } from "../../../components/profile/ProfilePosts";
import { useDialog } from "@/hooks/useDialog";
import { DialogType } from "@/types/dialog";
import { postApi } from "@/services/postApi";

export const Profile = () => {
  const { username } = useParams();
  const { openDialog } = useDialog();
  const [logout] = useLogoutMutation();
  const dispach = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const isOwner = currentUser?.username === username;

  const {
    data: profile,
    isLoading,
    isError
  } = useGetUserByUsernameQuery(username!);

  const handleLogout = async () => {
    await logout();
    dispach(logoutUser());
    dispach(postApi.util.invalidateTags([{ type: "Post" }]));
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  if (isError || !profile) {
    return (
      <div className="text-center mt-10 text-red-500">Profile not found.</div>
    );
  }

  const {
    fullName,
    username: profileUsername,
    profession,
    email,
    biography: bio,
    avatarUrl,
    coverImageUrl: coverUrl,
    role,
    posts,
    connections
  } = profile;

  const handleEditProfile = () => {
    openDialog(DialogType.EDIT_PROFILE, {
      profileId: currentUser?.id,
      fullName,
      profession,
      email,
      bio,
      avatarUrl,
      coverUrl
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ProfileCover
        alt={profile.fullName}
        coverUrl={profile.coverImageUrl}
        canEdit={isOwner}
      />
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 mb-8">
        <ProfileAvatar
          alt={profile.fullName}
          avatarUrl={profile.avatarUrl}
          canEdit={isOwner}
        />
        <ProfileInfoSection
          fullName={fullName}
          username={profileUsername}
          role={role}
          profession={profession}
          bio={bio}
          postsCount={posts}
          connectionsCount={connections}
          canEdit={isOwner}
          onEditProfile={handleEditProfile}
          onLogout={handleLogout}
        />
      </div>
      <ProfilePosts userId={profile.id} />
    </div>
  );
};
