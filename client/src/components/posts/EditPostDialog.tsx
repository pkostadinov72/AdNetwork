import { DialogLayout } from "@/layouts/DialogLayout";
import { PostForm } from "./PostForm";
import { Post } from "@/types/post";

export const EditPostDialog = ({ post }: { post: Post }) => {
  return (
    <DialogLayout>
      <div className="w-full max-w-[600px] mx-auto p-4 sm:p-6 flex flex-col justify-center rounded-lg shadow-md">
        <PostForm type="edit" initialData={post} />
      </div>
    </DialogLayout>
  );
};
