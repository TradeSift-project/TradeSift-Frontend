import { toast } from "sonner";
import { validateSignup } from "../../validations/validateSignup";
import { signup } from "../../services/authService";

export const handleSignupSubmit = async (
    e,
    data,
    setError,
) => {
    e.preventDefault();

    const validationError = validateSignup(data);

    if (validationError) {
        setError(validationError);
        return false;
    }

    try {
        setError("");

        const response = await signup({
            firstName: data.firstName,
            lastName: data.lastName,
            organisation: data.organizationName,
            email: data.email,
            password: data.password,
            passwordConfirmation: data.confirmPassword,
            agreedToTerms : data.agreedToTerms

        });

        toast.success(response.message);

        return true;

    } catch (error) {
        const errorMessage =
            error.response?.data?.message ||
            "Unable to create your account.";

        setError(errorMessage);
        toast.error(errorMessage);

        return false;
    }
};