import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: { value: string; label: string }[];
}

export const SelectField = <T extends FieldValues>({
  name,
  control,
  options
}: SelectFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <select
          {...field}
          className="block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    />
  );
};
