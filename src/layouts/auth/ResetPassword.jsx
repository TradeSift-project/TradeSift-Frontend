import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Logo from "../../../assets/Logo.png";
import { fadeUp } from "../../animations/variants";
import PasswordInput from "./components/PasswordInput";
import AuthError from "./components/AuthError";
import { handleResetPasswordSubmit } from "./handlers/forgotPass/handleResetPasswordSubmit";
import useAutoClearError from "./hooks/useAutoClearer";


export default function ResetPassword() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const email = state?.email;

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");

    useAutoClearError(error, setError);

    const onSubmit = (e) => {
        e.preventDefault();

        handleResetPasswordSubmit(
            email,
            newPassword,
            confirmPassword,
            setError,
            navigate
        );
    };

    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex min-h-screen items-center justify-center bg-neutral-50 px-5"
        >
            <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">

                <Link
                    to="/"
                    className="mb-10 flex items-center justify-center gap-3"
                >
                    <img
                        src={Logo}
                        alt="TradeSift"
                        className="h-10 w-auto"
                    />

                    <span className="pt-5 font-geist text-xl font-bold">
                        TradeSift
                    </span>
                </Link>

                <header className="mb-8 text-center">
                    <h1 className="font-geist text-3xl font-bold text-neutral-900">
                        Change your password
                    </h1>

                    <p className="mt-2 text-sm text-neutral-500">
                        Enter a new password for your account.
                    </p>
                </header>

                <form
                    onSubmit={onSubmit}
                    className="space-y-4"
                >
                    <PasswordInput
                        id="newPassword"
                        label="New Password"
                        value={newPassword}
                        onChange={setNewPassword}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        placeholder="Enter your new password"
                    />

                    <PasswordInput
                        id="confirmPassword"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        showPassword={showConfirmPassword}
                        setShowPassword={setShowConfirmPassword}
                        placeholder="Confirm your new password"
                    />

                    <AuthError error={error} />

                    <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
                    >
                        Change Password
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link
                        to="/login"
                        className="text-sm text-neutral-500 hover:text-neutral-700 transition"
                    >
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
