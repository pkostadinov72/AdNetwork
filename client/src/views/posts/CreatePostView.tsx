import { PostForm } from "@/components/posts/PostForm";
import { SidebarLayout } from "@/layouts/SidebarLayout";

const CreatePostView = () => {
  return (
    <SidebarLayout>
      <div className="w-full max-w-[600px] mx-auto p-4 sm:p-6 flex flex-col justify-center rounded-lg shadow-md">
        <PostForm type="create" />
      </div>
    </SidebarLayout>
  );
};

export default CreatePostView;
