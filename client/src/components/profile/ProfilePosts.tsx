import { useDialog } from "@/hooks/useDialog";
import { useGetPostsByUserIdQuery } from "@/services/postApi";
import { DialogType } from "@/types/dialog";

type Props = {
  userId: string;
};

export const ProfilePosts = ({ userId }: Props) => {
  const { data: posts = [], isLoading } = useGetPostsByUserIdQuery(userId);
  const { openDialog } = useDialog();

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading posts...</div>;
  }

  const handlePostClick = (postId: string) => {
    openDialog(DialogType.POST_WITH_COMMENTS, { postId, userId });
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {posts.map((post) => (
        <img
          onClick={() => handlePostClick(post?.id)}
          key={post.id}
          src={post.mediaUrl}
          alt="Post"
          className="w-full h-auto rounded-lg object-cover aspect-square cursor-pointer"
        />
      ))}
    </div>
  );
};
