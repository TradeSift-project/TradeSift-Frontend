import { toast } from "sonner";
import { resendRegistrationOtp } from "../../services/authService";


export const handleResendSignupOtp = async (
    email,
    setError,
    setTimer,
    setOtp,
    inputsRef
) => {
    if (!email) {
        const errorMessage = "Email address is missing.";

        setError(errorMessage);
        toast.error(errorMessage);

        return false;
    }

    try {
        setError("");

        const response = await resendRegistrationOtp(email);

        toast.success(response.message);

        // Reset OTP fields
        setOtp(["", "", "", "", "", ""]);

        // Restart resend cooldown
        setTimer(30);

        // Focus first OTP input
        inputsRef.current[0]?.focus();

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