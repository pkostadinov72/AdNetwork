import { Link } from "react-router-dom";
import { TextField } from "../ui/TextField";
import { SelectField } from "../ui/SelectField";
import { useRegisterForm } from "./useRegisterForm";

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    isSubmitting,
    errors,
    roleOptions,
    registerError
  } = useRegisterForm();

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create an Account
        </h2>

        <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
          <div>
            <TextField
              name="username"
              control={control}
              placeholder="Enter username"
              type="text"
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <TextField
              name="email"
              control={control}
              placeholder="Enter email"
              type="email"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <TextField
              name="password"
              control={control}
              placeholder="Enter password"
              type="password"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <TextField
              name="confirmPassword"
              control={control}
              placeholder="Confirm password"
              type="password"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <SelectField name="role" control={control} options={roleOptions} />
            {errors.role && (
              <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:opacity-50"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>

          {registerError && (
            <p className="text-sm text-red-500 mt-2">
              {registerError.data ||
                "There was an error with your submission. Try again."}
            </p>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
