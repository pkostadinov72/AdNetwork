import { useGetAllPostsQuery } from "@/services/postApi";
import { PostCard } from "./PostCard";
import ClipLoader from "react-spinners/ClipLoader";

export const Feed = () => {
  const { data: posts, isLoading, isError } = useGetAllPostsQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <ClipLoader size={40} color="#3b82f6" />
      </div>
    );

  if (isError || !posts)
    return <p className="text-center text-red-500">Failed to load posts.</p>;

  if (posts.length === 0) {
    return (
      <h1 className="text-center text-gray-500 p-6">
        No posts yet. Start by creating your first post!
      </h1>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
