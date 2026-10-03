// handlers/forgotPassword/handleVerifyForgotPasswordOtp.js

import { toast } from "sonner";

import { verifyForgotPasswordOtp } from "../../services/authService";

export const handleVerifyForgotPasswordOtp = async (
    email,
    otp,
    setError,
    navigate
) => {
    if (!email) {
        const errorMessage =
            "Email address is missing.";

        setError(errorMessage);
        toast.error(errorMessage);

        return false;
    }

    if (!otp || otp.length !== 6) {
        const errorMessage =
            "Please enter the 6-digit verification code.";

        setError(errorMessage);
        toast.error(errorMessage);

        return false;
    }

    try {
        setError("");

        const response =
            await verifyForgotPasswordOtp({
                email,
                otp,
            });

        toast.success(
            response.message ||
            "OTP verified."
        );

        navigate("/reset-password", {
            state: {
                email,
            },
        });

        return true;

    } catch (error) {
        const errorMessage =
            error.response?.data?.message ||
            "Unable to verify reset code.";

        setError(errorMessage);
        toast.error(errorMessage);

        return false;
    }
};