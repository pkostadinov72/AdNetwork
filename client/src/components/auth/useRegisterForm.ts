import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas/auth/registerSchema";
import { useAppDispatch } from "@/store/redux-hooks/useAppDispatch";
import { useRegisterMutation } from "@/services/authApi";
import { loginSuccess } from "@/store/slices/authSlice";
import { omit } from "lodash";
import { useNavigate } from "react-router-dom";

export type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export const useRegisterForm = () => {
  const dispatch = useAppDispatch();
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "regular"
    }
  });

  const roleOptions = [
    { value: "regular", label: "Regular" },
    { value: "advertiser", label: "Advertiser" },
    { value: "admin", label: "Admin" }
  ];

  const onSubmit = async (data: RegisterFormValues) => {
    const registerData = omit(data, ["confirmPassword"]);

    try {
      const response = await register(registerData).unwrap();
      dispatch(loginSuccess(response));
      navigate("/");
    } catch (err) {
      console.error("Register failed:", err);
    }
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    isSubmitting: isLoading || isSubmitting,
    errors,
    roleOptions,
    registerError: error
  };
};
