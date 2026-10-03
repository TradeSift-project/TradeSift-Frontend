import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeUp } from "../../animations/variants";
import useAutoClearError from "./hooks/useAutoClearer";
import { handleFormNavigation } from "./handlers/handleKeyDown";

import AuthHero from "./components/AuthHero";
import AuthLayout from "./components/AuthLayout";
import { handleForgotPasswordSubmit } from "./handlers/forgotPass/handleForgotPasswordSubmit.js";


export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const formData = {
        email,
    };

    const onSubmit = (e) =>
        handleForgotPasswordSubmit(
            e,
            formData,
            setError,
            navigate
        );

    const handleKeyDown = (e) =>
        handleFormNavigation(e, () =>
            onSubmit(e)
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
<AuthHero/>
            <AuthLayout
                mode="forgot-password"

                headerTitle="Forgot your password?"
                headerSubtitle="Enter your email and we'll send you a verification code to reset your password."

                email={email}
                setEmail={setEmail}

                error={error}
                setError={setError}

                submitBtnText="Send Verification Code"
                isSubmitBtnLoading={false}

                handleSubmit={onSubmit}
                handleKeyDown={handleKeyDown}
            />

        </motion.div>
    );
}

