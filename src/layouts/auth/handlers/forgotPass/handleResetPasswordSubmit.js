import { toast } from "sonner";

import { validateResetPassword } from "../../validations/validateResetPassword";
import { resetPassword } from "../../services/authService";

export const handleResetPasswordSubmit = async (
    email,
    newPassword,
    newPasswordConfirmation,
    setError,
    navigate
) => {
    // Frontend validation — setError only, no toast
    const validationError = validateResetPassword({
        newPassword,
        newPasswordConfirmation,
    });

    if (validationError) {
        setError(validationError);
        return false;
    }

    try {
        setError("");

        const response = await resetPassword({
            email,
            newPassword,
            newPasswordConfirmation,
        });

        toast.success(
            response.message ||
            "Password reset successfully. Please log in."
        );

        navigate("/login");

        return true;

    } catch (error) {
        const errorMessage =
            error.response?.data?.message ||
            "Unable to reset your password.";

        toast.error(errorMessage);

        return false;
    }
};
