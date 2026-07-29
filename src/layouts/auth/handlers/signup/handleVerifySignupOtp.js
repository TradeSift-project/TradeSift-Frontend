import { toast } from "sonner";
import {verifyOtp} from '../../services/signup/verifyOtpServices'

export const handleVerifySignupOtpSubmit = async (
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

        const response = await verifyOtp({
            email,
            otp,
        });

        toast.success(
            response.message || "Registration complete."
        );

        navigate("/dashboard");

        return true;

    } catch (error) {
        const errorMessage =
            error.response?.data?.message ||
            "Unable to verify your email.";

        setError(errorMessage);
        toast.error(errorMessage);

        return false;
    }
};