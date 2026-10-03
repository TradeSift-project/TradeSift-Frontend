import { toast } from "sonner";

import { resendForgotPasswordOtp } from "../../services/authService";

export const handleResendForgotPasswordOtp = async (
    email,
    setError
) => {
    if (!email) {
        const errorMessage =
            "Email address is missing.";

        setError(errorMessage);
        toast.error(errorMessage);

        return false;
    }

    try {
        setError("");

        const response =
            await resendForgotPasswordOtp(email);

        toast.success(
            response.message ||
            "A new code has been sent."
        );

        return true;

    } catch (error) {
        const errorMessage =
            error.response?.data?.message ||
            "Unable to resend verification code.";

        setError(errorMessage);
        toast.error(errorMessage);

        return false;
    }
};