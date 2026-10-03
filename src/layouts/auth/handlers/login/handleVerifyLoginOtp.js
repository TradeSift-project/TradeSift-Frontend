import { toast } from "sonner";
import { verifyLoginOtp } from "../../services/authService";

export const handleVerifyLoginOtp = async (
    email,
    otp,
    setError,
    navigate
) => {
    if (!email) {
        const errorMessage = "Email address is missing.";

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

        const response = await verifyLoginOtp({
            email,
            otp,
        });

        toast.success(
            response.message || "Login successful."
        );

        navigate("/dashboard");

        return true;

    } catch (error) {
        const errorMessage =
            error.response?.data?.message ||
            "Unable to verify login code.";

        setError(errorMessage);
        toast.error(errorMessage);

        return false;
    }
};