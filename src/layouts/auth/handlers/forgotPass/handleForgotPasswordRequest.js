import { toast } from "sonner";

import { forgotPassword } from "../../services/authService";

export const handleForgotPasswordRequest = async (
    email,
    setError,
    navigate
) => {
    // Frontend validation — show inline error, do NOT toast, do NOT navigate
    if (!email || !email.trim()) {
        setError("Email is required for password recovery.");
        return false;
    }

    try {
        setError("");

        const response = await forgotPassword(email.trim());

        toast.success(
            response.message ||
            "A verification code has been sent to your email."
        );

        navigate("/verify-otp", {
            state: {
                email: email.trim(),
                mode: "forgot-password",
            },
        });

        return true;

    } catch (error) {
        const errorMessage =
            error.response?.data?.message ||
            "Unable to process your request.";

        toast.error(errorMessage);

        return false;
    }
};
