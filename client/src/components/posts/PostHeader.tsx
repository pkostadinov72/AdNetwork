import { FC } from "react";
import { Link } from "react-router-dom";
import { PostDropdownMenu } from "./PostDropDownMenu";
import { Post } from "@/types/post";
import { useDialog } from "@/hooks/useDialog";
import { useAppSelector } from "@/store/redux-hooks/useAppSelector";

type PostHeaderProps = {
  username: string;
  avatarUrl?: string;
  post: Post;
};

export const PostHeader: FC<PostHeaderProps> = ({
  username,
  avatarUrl,
  post
}) => {
  const { closeDialog } = useDialog();

  const authUser = useAppSelector((state) => state.auth.user);
  const isOwner = authUser ? post.userId === authUser.id : false;

  return (
    <div className="flex items-center justify-between p-4">
      <Link to={`/profile/${username}`}>
        <div className="flex items-center p-4" onClick={closeDialog}>
          <img
            src={
              avatarUrl ||
              "https://ui-avatars.com/api/?name=User&background=ddd&color=333&size=200"
            }
            alt={username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="ml-3 font-medium">{username}</span>
        </div>
      </Link>

      {(isOwner || authUser?.role === "admin") && (
        <PostDropdownMenu post={post} />
      )}
    </div>
  );
};
