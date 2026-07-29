import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router";

import AuthHero from "./components/AuthHero";
import AuthLayout from "./components/AuthLayout";

import { fadeUp } from "../../animations/variants";
import { handleLoginSubmit } from "./handlers/login/handleLoginSubmit";
import { handleForgotPasswordRequest } from "./handlers/forgotPass/handleForgotPasswordRequest";
import useAutoClearError from "./hooks/useAutoClearer";
import { handleFormNavigation } from "./handlers/handleKeyDown";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const oauthError = searchParams.get("error");

        if (!oauthError) return;

        const errorMessages = {
            access_denied: "Google sign-in was cancelled.",
            google_auth_failed: "Google sign-in failed. Please try again.",
            oauth_failed: "Google sign-in failed. Please try again.",
        };

        const message =
            errorMessages[oauthError] ||
            `Google sign-in failed: ${oauthError}`;

        toast.error(message);

        // Remove ?error=... from URL
        setSearchParams({}, { replace: true });
    }, [searchParams, setSearchParams]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const formData = {
        email,
        password,
        rememberMe,
    };

    const onSubmit = async (e) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const success = await handleLoginSubmit(
            e,
            formData,
            setError,
            navigate
        );

        setTimeout(() => {
            setIsSubmitting(false);
        }, 2000);
    };

    const handleKeyDown = (e) =>
        handleFormNavigation(
            e,
            () => onSubmit(e)
        );

    const handleForgotPassword = () =>
        handleForgotPasswordRequest(
            email,
            setError,
            navigate
        );

    useAutoClearError(
        error,
        setError
    );

    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex h-screen flex-col overflow-hidden lg:flex-row"
        >
            <AuthHero />

            <AuthLayout
                mode="login"

                headerTitle="Welcome back"
                headerSubtitle="Sign in to continue to your TradeSift workspace."

                email={email}
                setEmail={setEmail}

                password={password}
                setPassword={setPassword}

                showPassword={showPassword}
                setShowPassword={setShowPassword}

                rememberMe={rememberMe}
                setRememberMe={setRememberMe}

                error={error}
                setError={setError}

                submitBtnText="Sign In"
                isSubmitBtnLoading={isSubmitting}

                handleSubmit={onSubmit}
                handleKeyDown={handleKeyDown}

                handleForgotPassword={
                    handleForgotPassword
                }
            />
        </motion.div>
    );
}