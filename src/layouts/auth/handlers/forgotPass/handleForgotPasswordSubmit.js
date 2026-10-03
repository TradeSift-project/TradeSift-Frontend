import { toast } from "sonner";

import { validateForgotPassword } from "../../validations/validateForgotPassword";
import { forgotPassword } from "../../services/authService";

export const handleForgotPasswordSubmit = async (
    e,
    data,
    setError,
    navigate
) => {
    e.preventDefault();

    const validationError = validateForgotPassword(data);

    if (validationError) {
        setError(validationError);
        return false;
    }

    try {
        setError("");

        const response = await forgotPassword(
            data.email.trim()
        );

        toast.success(
            response.message ||
            "A verification code has been sent to your email."
        );

        navigate("/verify-otp", {
            state: {
                email: data.email.trim(),
                mode: "forgot-password",
            },
        });

        return true;

    } catch (error) {
        const errorMessage =
            error.response?.data?.message ||
            "Unable to process your request.";

        setError(errorMessage);
        toast.error(errorMessage);

        return false;
    }
};