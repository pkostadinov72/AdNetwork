import { Heart, MessageCircle } from "lucide-react";
import { Post } from "@/types/post";
import { useGetUserByIdQuery } from "@/services/profileApi";
import { useToggleLikeMutation } from "@/services/postApi";
import { useAppSelector } from "@/store/redux-hooks/useAppSelector";
import { useDialog } from "@/hooks/useDialog";
import { DialogType } from "@/types/dialog";
import { PostHeader } from "./PostHeader";

type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  const { data: user } = useGetUserByIdQuery(post.userId);
  const { openDialog } = useDialog();
  const [toggleLike] = useToggleLikeMutation();

  const authUser = useAppSelector((state) => state.auth.user);
  const isLikedByMe = post.likes.some((like) => like.userId === authUser?.id);

  const handleComments = () => {
    openDialog(DialogType.POST_WITH_COMMENTS, {
      postId: post.id,
      userId: post.userId
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <PostHeader
        username={user?.username}
        avatarUrl={user?.avatarUrl}
        post={post}
      />

      {post.mediaUrl && (
        <img
          src={post.mediaUrl}
          alt="Post media"
          className="w-full aspect-square object-contain"
        />
      )}

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => toggleLike(post.id)}
              className={`transition-colors cursor-pointer ${
                isLikedByMe
                  ? "text-red-500"
                  : "text-gray-600 hover:text-red-500"
              }`}
            >
              <Heart size={24} fill={isLikedByMe ? "#ef4444" : "none"} />
            </button>

            <button onClick={handleComments} className="cursor-pointer">
              <MessageCircle size={24} />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-medium">{post.likes.length} likes</p>
          {post.content && (
            <p>
              <span className="font-medium">{user?.username}</span>{" "}
              {post.content}
            </p>
          )}
          <p className="text-gray-500 text-sm">
            View all {post.comments.length} comments
          </p>
        </div>
      </div>
    </div>
  );
};
