export interface DialogContextType {
  openDialog: (type: DialogType, data?: any) => void;
  closeDialog: () => void;
  type: DialogType | null;
  data: any;
}

export enum DialogType {
  EDIT_PROFILE = "editProfile",
  POST_WITH_COMMENTS = "postWithComments",
  EDIT_POST = "editPost"
}
