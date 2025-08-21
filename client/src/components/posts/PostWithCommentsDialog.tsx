import { FC, useState } from "react";
import { Heart, Send } from "lucide-react";
import { useAppSelector } from "@/store/redux-hooks/useAppSelector";
import {
  useCreateCommentMutation,
  useGetPostByIdQuery,
  useToggleLikeMutation
} from "@/services/postApi";
import { DialogLayout } from "@/layouts/DialogLayout";
import { useGetUserByIdQuery } from "@/services/profileApi";
import { PostHeader } from "./PostHeader";
import { CommentItem } from "./Comments/CommentItem";

interface PostWithCommentsProps {
  postId: string;
  userId: string;
}

export const PostWithCommentsDialog: FC<PostWithCommentsProps> = ({
  postId,
  userId
}) => {
  const [newComment, setNewComment] = useState("");
  const authUser = useAppSelector((state) => state.auth.user);

  const { data: user, isLoading: userLoading } = useGetUserByIdQuery(userId);
  const { data: post, isLoading: postLoading } = useGetPostByIdQuery(postId);

  const [toggleLike] = useToggleLikeMutation();
  const [createComment, { isLoading: isCommenting }] =
    useCreateCommentMutation();

  if (userLoading || postLoading || !user || !post) return null;

  const isLikedByMe = post.likes.some((like) => like.userId === authUser?.id);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await createComment({
        postId: post.id,
        data: { content: newComment, username: user.username }
      }).unwrap();

      setNewComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  return (
    <DialogLayout>
      <div className="w-full max-w-5xl h-[90vh] flex flex-col sm:flex-row bg-white text-black rounded-lg overflow-hidden shadow-lg">
        <div className="w-full sm:w-1/2 h-64 sm:h-full bg-black flex items-center justify-center">
          <img
            src={post.mediaUrl}
            alt="Post"
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div className="w-full sm:w-1/2 flex flex-col h-full justify-between">
          <PostHeader
            username={user.username}
            avatarUrl={user.avatarUrl}
            post={post}
          />

          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
            {post.content && (
              <div>
                <p>
                  <span className="font-semibold">{user.username}</span>{" "}
                  {post.content}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            )}

            <form
              onSubmit={handleCommentSubmit}
              className="px-4 py-3 border-t border-b border-gray-200 flex items-center gap-2"
            >
              <button
                type="button"
                onClick={() => toggleLike(post.id)}
                className={`transition-colors cursor-pointer ${
                  isLikedByMe
                    ? "text-red-500"
                    : "text-gray-600 hover:text-red-500"
                }`}
              >
                <Heart size={24} fill={isLikedByMe ? "#ef4444" : "none"} />
              </button>

              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 text-sm outline-none bg-transparent text-black placeholder-gray-400"
              />

              <button
                type="submit"
                disabled={isCommenting}
                className="text-gray-500 hover:text-black disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>

            {post.comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                postId={post.id}
              />
            ))}
          </div>
        </div>
      </div>
    </DialogLayout>
  );
};
