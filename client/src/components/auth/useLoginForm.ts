import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schemas/auth/loginSchema";
import { useAppDispatch } from "@/store/redux-hooks/useAppDispatch";
import { useLoginMutation } from "@/services/authApi";
import { loginSuccess } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export type LoginFormValues = {
  username: string;
  password: string;
};

export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await login(data).unwrap();
      dispatch(loginSuccess(response));
      navigate("/");
    } catch (error: unknown) {
      console.error("Login failed:", error);
    }
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting: isLoading || isSubmitting,
    loginError: error,
    isLoading
  };
};
