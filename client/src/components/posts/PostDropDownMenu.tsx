import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";

import { Post } from "@/types/post";
import { useDeletePostMutation } from "@/services/postApi";
import { useDialog } from "@/hooks/useDialog";
import { DialogType } from "@/types/dialog";
import { toast } from "sonner";

export const PostDropdownMenu = ({ post }: { post: Post }) => {
  const [deletePost] = useDeletePostMutation();
  const { openDialog } = useDialog();

  const handleDelete = async () => {
    try {
      await deletePost(post.id).unwrap();
      toast.success("Post has been deleted.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis color="black" className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => openDialog(DialogType.EDIT_POST, post)}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit Post
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Post
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
