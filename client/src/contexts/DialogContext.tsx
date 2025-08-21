import { EditPostDialog } from "@/components/posts/EditPostDialog";
import { PostWithCommentsDialog } from "@/components/posts/PostWithCommentsDialog";
import EditProfileDialog from "@/components/profile/edit-profile/EditProfileDialog";
import { DialogContext } from "@/hooks/useDialog";
import { DialogType } from "@/types/dialog";
import { useState } from "react";

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<DialogType | null>(null);
  const [data, setData] = useState<any>(null);

  const openDialog = (dialogType: DialogType, payload?: any) => {
    setType(dialogType);
    setData(payload);
  };

  const closeDialog = () => {
    setType(null);
    setData(null);
  };

  return (
    <DialogContext.Provider value={{ type, data, openDialog, closeDialog }}>
      {children}

      {type === DialogType.EDIT_POST && <EditPostDialog post={data} />}
      {type === DialogType.POST_WITH_COMMENTS && (
        <PostWithCommentsDialog postId={data.postId} userId={data.userId} />
      )}
      {type === DialogType.EDIT_PROFILE && <EditProfileDialog {...data} />}
    </DialogContext.Provider>
  );
};
