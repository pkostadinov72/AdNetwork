import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface TextFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  type?: string;
}

export const TextField = <T extends FieldValues>({
  name,
  control,
  placeholder,
  type = "text"
}: TextFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          className="block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
        />
      )}
    />
  );
};
