import { useDialog } from "@/hooks/useDialog";
import { X } from "lucide-react";
import { ReactNode } from "react";

export const DialogLayout = ({ children }: { children: ReactNode }) => {
  const { closeDialog } = useDialog();

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-2 sm:px-4"
      onClick={closeDialog}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
    relative 
    w-full h-[95vh] 
    max-w-4xl 
    flex flex-col 
    sm:rounded-lg 
    overflow-hidden 
    lg:static lg:w-auto lg:h-auto lg:max-w-none lg:bg-transparent 
    lg:shadow-none lg:flex-none lg:overflow-visible lg:mb-10
  "
      >
        <div className="flex justify-end p-4 sm:p-6">
          <button
            onClick={closeDialog}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <X size={24} color="red" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4">{children}</div>
      </div>
    </div>
  );
};
