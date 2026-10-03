import { toast } from "sonner";

import { validateLogin } from "../../validations/validateLogin";
import { login } from "../../services/authService";


export const handleLoginSubmit = async (
    e,
    data,
    setError,
    navigate
) => {
    e.preventDefault();

    const validationError = validateLogin(data);

    if (validationError) {
        setError(validationError);
        return false;
    }

    try {
        setError("");

        const response = await login({
            email: data.email,
            password: data.password,
            rememberDevice: data.rememberMe,
        });

        toast.success(response.message);

        // OTP required
        if (response.data?.email) {
            navigate("/verify-otp", {
                state: {
                    email: response.data.email,
                    mode: "login",
                    rememberDevice: data.rememberMe,
                },
            });

            return true;
        }

        // Trusted device login
        if (response.data?.user) {
            navigate("/dashboard");

            return true;
        }

        return false;

    } catch (error) {
        const errorMessage =
            error.response?.data?.message ||
            "Unable to login.";

        setError(errorMessage);
        toast.error(errorMessage);

        return false;
    }
};