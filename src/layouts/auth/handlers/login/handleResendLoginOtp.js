
import { toast } from "sonner";
import { resendLoginOtp } from "../../services/authService";


export const handleResendLoginOtp = async (
    email,
    setError
) => {
    if (!email) {
        const errorMessage = "Email address is missing.";

        setError(errorMessage);
        toast.error(errorMessage);

        return false;
    }

    try {
        setError("");

        const response = await resendLoginOtp(email);

        toast.success(
            response.message ||
            "OTP resent to your email."
        );

        return true;

    } catch (error) {
        const errorMessage =
            error.response?.data?.message ||
            "Unable to resend login code.";

        setError(errorMessage);
        toast.error(errorMessage);

        return false;
    }
};

