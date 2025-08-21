import { FC, useRef } from "react";
import { usePostForm, getVisibilityLabel } from "./usePostForm";
import { Post, PostVisibility } from "@/types/post";
import { ImageIcon } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

type PostFormProps = {
  type: "create" | "edit";
  initialData?: Post;
  onSuccess?: () => void;
};

export const PostForm: FC<PostFormProps> = ({
  type,
  initialData,
  onSuccess
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    content,
    setContent,
    visibility,
    setVisibility,
    previewUrl,
    handleImageChange,
    handleSubmit,
    isLoading,
    errors
  } = usePostForm({ type, initialData, onSuccess });

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <div className="rounded-lg p-4 space-y-4 bg-white">
      <h1 className="text-2xl font-bold mb-8 text-center">
        {type === "edit" ? "Edit Post" : "Create a Post"}
      </h1>

      <Select
        value={visibility}
        onValueChange={(val: PostVisibility) => setVisibility(val)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Visibility" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(PostVisibility).map((v) => (
            <SelectItem key={v} value={v}>
              {getVisibilityLabel(v)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {previewUrl && (
        <div
          className={`relative w-full aspect-video rounded-md overflow-hidden border ${
            type === "create" ? "cursor-pointer" : ""
          }`}
          onClick={type === "create" ? triggerFileInput : undefined}
        >
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />

          {type === "create" && (
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          )}

          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center">
              <ClipLoader color="#000" size={30} />
            </div>
          )}
        </div>
      )}

      {type === "create" && !previewUrl && (
        <div
          className="relative w-full aspect-video rounded-md overflow-hidden border cursor-pointer"
          onClick={triggerFileInput}
        >
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
            <ImageIcon size={32} />
            <span className="text-sm mt-2">Click to add an image</span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center">
              <ClipLoader color="#000" size={30} />
            </div>
          )}
        </div>
      )}

      {errors && (
        <p className="text-sm text-red-500 font-medium">{errors.mediaFile}</p>
      )}

      <Textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="resize-none"
      />

      {errors && (
        <p className="text-sm text-red-500 font-medium">{errors.content}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-opacity-90 transition disabled:opacity-50"
      >
        {isLoading
          ? type === "edit"
            ? "Updating..."
            : "Posting..."
          : type === "edit"
          ? "Update"
          : "Post"}
      </button>
    </div>
  );
};
