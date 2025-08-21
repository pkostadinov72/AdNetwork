import { FC } from "react";
import { Trash2 } from "lucide-react";
import { useDeleteCommentMutation } from "@/services/postApi";
import { Comment } from "@/types/post";
import { useAppSelector } from "@/store/redux-hooks/useAppSelector";
import { toast } from "sonner";

type CommentItemProps = {
  comment: Comment;
  postId: string;
};

export const CommentItem: FC<CommentItemProps> = ({ comment, postId }) => {
  const authUser = useAppSelector((state) => state.auth.user);
  const isOwner = authUser ? comment.userId === authUser.id : false;

  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async () => {
    try {
      await deleteComment({ postId, commentId: comment.id });
      toast.success("Comment has been deleted.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-start justify-between">
        <p className="text-sm break-words max-w-[90%]">
          <span className="font-semibold">{comment.username}</span>{" "}
          {comment.content}
        </p>

        {(isOwner || authUser?.role === "admin") && (
          <Trash2
            size={18}
            onClick={handleDeleteComment}
            className="text-red-400 cursor-pointer shrink-0 ml-2 mt-1"
          />
        )}
      </div>

      <p className="text-xs text-gray-400">
        {new Date(comment.createdAt).toLocaleString()}
      </p>
    </div>
  );
};
