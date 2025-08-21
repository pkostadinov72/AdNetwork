import { LogOut } from "lucide-react";

interface ProfileInfoSectionProps {
  fullName: string;
  username: string;
  role: string;
  profession: string;
  bio: string;
  postsCount: number;
  connectionsCount: number;
  canEdit?: boolean;
  onEditProfile: () => void;
  onLogout?: () => void;
}

export const ProfileInfoSection = ({
  fullName,
  username,
  role,
  profession,
  bio,
  connectionsCount,
  canEdit = false,
  onEditProfile,
  onLogout
}: ProfileInfoSectionProps) => {
  return (
    <div className="flex-1 pt-4">
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-2xl font-semibold">{fullName}</h1>

        {canEdit && (
          <>
            <button
              onClick={onEditProfile}
              className="px-4 py-1.5 bg-gray-100 rounded-lg font-medium cursor-pointer"
            >
              Edit Profile
            </button>
            <button onClick={onLogout} className="cursor-pointer">
              <LogOut color="red" size={24} />
            </button>
          </>
        )}
      </div>

      <div className="flex gap-8 mb-4">
        <span>
          <strong>{connectionsCount}</strong> connections
        </span>
      </div>

      <div>
        <p className="text-gray-600">@{username}</p>
        <p className="text-gray-600">
          {profession} ({role})
        </p>
        {bio && <p className="mt-1">{bio}</p>}
      </div>
    </div>
  );
};
