import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@/components/ui/TextField";
import { editProfileSchema } from "@/schemas/profile/editProfileSchema";

interface EditProfileFormProps {
  fullName: string;
  profession: string;
  bio: string;
  email: string;
  onSubmit: (data: ProfileFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  editError?: string;
}

export interface ProfileFormData {
  email: string;
  fullName: string;
  profession: string;
  biography: string;
}

export const EditProfileForm = ({
  fullName,
  profession,
  bio,
  email,
  onSubmit,
  onCancel,
  isSubmitting,
  editError
}: EditProfileFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileFormData>({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      fullName: fullName || "",
      profession: profession || "",
      biography: bio || "",
      email: email || ""
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-4">
        <TextField
          name="email"
          control={control}
          placeholder="Enter email"
          type="email"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}

        <TextField
          name="fullName"
          control={control}
          placeholder="Enter full name"
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}

        <TextField
          name="profession"
          control={control}
          placeholder="Enter profession"
        />
        {errors.profession && (
          <p className="text-sm text-red-500">{errors.profession.message}</p>
        )}

        <TextField
          name="biography"
          control={control}
          placeholder="Enter biography"
          type="textarea"
        />
        {errors.biography && (
          <p className="text-sm text-red-500">{errors.biography.message}</p>
        )}
      </div>

      {editError && (
        <p className="text-sm text-red-500 mt-2">
          {editError.data ||
            "There was an error with your saving changes. Try again."}
        </p>
      )}

      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
