import { Link } from "react-router-dom";
import { useAppSelector } from "@/store/redux-hooks/useAppSelector";
import { useGetUserByUsernameQuery } from "@/services/profileApi";

function ProfileCard() {
  const username = useAppSelector((state) => state.auth.user?.username);

  const {
    data: profile,
    isLoading,
    isError
  } = useGetUserByUsernameQuery(username!, {
    skip: !username
  });

  if (isLoading) {
    return (
      <div className="hidden lg:block w-80 sticky top-6 mr-4 bg-white rounded-lg border border-gray-200 p-6">
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );
  }

  if (isError || !profile) {
    return null;
  }

  return (
    <div className="hidden lg:block w-80 mr-4 bg-white sticky top-0 h-screen rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex flex-col items-center p-6">
        <Link to={`/profile/${profile.username}`}>
          <img
            src={
              profile.avatarUrl ||
              "https://ui-avatars.com/api/?name=User&background=ddd&color=333&size=200"
            }
            alt={profile.fullName}
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
        </Link>

        <Link to={`/profile/${profile.username}`}>
          <h2 className="text-xl font-bold text-center mb-1">
            {profile.fullName}
          </h2>
        </Link>

        <p className="text-gray-600 text-sm mb-4">@{profile.username}</p>
        <p className="text-gray-700 text-sm mb-6">
          {profile.profession || profile.role}
        </p>

        <div className="flex justify-center gap-8 w-full border-t border-gray-100 pt-4">
          <div className="text-center">
            <p className="font-bold text-lg">{profile.connections}</p>
            <p className="text-gray-600 text-sm">Connections</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
