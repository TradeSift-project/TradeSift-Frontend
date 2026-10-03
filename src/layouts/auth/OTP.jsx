import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";


import Logo from "../../../assets/Logo.png";
import { fadeUp } from "../../animations/variants";
import { handleVerifyLoginOtp } from "./handlers/login/handleVerifyLoginOtp";
import { handleVerifySignupOtpSubmit } from "./handlers/signup/handleVerifySignupOtp";
import { handleResendLoginOtp } from "./handlers/login/handleResendLoginOtp";
import { handleResendSignupOtp } from "./handlers/signup/handleResendSignupOtp";
import { handleVerifyForgotPasswordOtp } from "./handlers/forgotPass/handleVerifyForgotPasswordOtp";
import { handleResendForgotPasswordOtp } from "./handlers/forgotPass/handleResendForgotPassword";


export default function OTP() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const email = state?.email;
    const mode = state?.mode || "signup";

    const [otp, setOtp] = useState([
        "",
        "",
        "",
        "",
        "",
        "",
    ]);

    const [timer, setTimer] = useState(30);
    const [error, setError] = useState("");

    const inputsRef = useRef([]);

    const isLogin = mode === "login";
    const isForgotPassword = mode === "forgot-password";

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        if (!error) return;

        const timeout = setTimeout(() => {
            setError("");
        }, 3000);

        return () => clearTimeout(timeout);
    }, [error]);

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const updated = [...otp];

        updated[index] = value;

        setOtp(updated);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (!otp[index] && index > 0) {
                inputsRef.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();

        const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);

        if (!pasted) return;

        const updated = [...otp];

        pasted.split("").forEach((digit, index) => {
            updated[index] = digit;
        });

        setOtp(updated);

        inputsRef.current[
            Math.min(pasted.length, 5)
        ]?.focus();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const otpValue = otp.join("");

        if (otpValue.length !== 6) {
            setError(
                "Please enter the 6-digit verification code."
            );

            return;
        }

        const success = isLogin
            ? await handleVerifyLoginOtp(
                email,
                otpValue,
                setError,
                navigate
            )
            : isForgotPassword
                ? await handleVerifyForgotPasswordOtp(
                    email,
                    otpValue,
                    setError,
                    navigate
                )
                : await handleVerifySignupOtpSubmit(
                    email,
                    otpValue,
                    setError,
                    navigate
                );

        if (!success) return;
    };

    const resendCode = async () => {
        const success = isLogin
            ? await handleResendLoginOtp(
                email,
                setError
            )
            : isForgotPassword
                ? await handleResendForgotPasswordOtp(
                    email,
                    setError
                )
                : await handleResendSignupOtp(
                    email,
                    setError
                );

        if (!success) return;

        setOtp([
            "",
            "",
            "",
            "",
            "",
            "",
        ]);

        setTimer(30);

        inputsRef.current[0]?.focus();
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
                        {isLogin
                            ? "Verify your login"
                            : isForgotPassword
                                ? "Verify your identity"
                                : "Verify your email"
                        }
                    </h1>

                    <p className="mt-2 text-sm text-neutral-500">
                        {isLogin
                            ? "We've sent a verification code to"
                            : "We've sent a verification code to"
                        }
                    </p>

                    <p className="mt-1 font-medium text-neutral-900">
                        {email ?? "your email"}
                    </p>
                </header>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >
                    <div
                        className="flex justify-between gap-2 sm:gap-3"
                        onPaste={handlePaste}
                    >
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputsRef.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) =>
                                    handleChange(
                                        e.target.value,
                                        index
                                    )
                                }
                                onKeyDown={(e) =>
                                    handleKeyDown(e, index)
                                }
                                className="h-12 w-12 rounded-xl border border-neutral-200 text-center text-xl font-semibold outline-none transition-all duration-200 hover:border-neutral-400 focus:scale-[1.03] focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 focus:shadow-lg focus:shadow-black/5 sm:h-14 sm:w-14 sm:text-2xl"
                            />
                        ))}
                    </div>

                    {error && (
                        <p className="text-center text-sm text-red-500">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
                    >
                        {isLogin
                            ? "Verify Login"
                            : isForgotPassword
                                ? "Verify Code"
                                : "Verify Email"
                        }

                        <ArrowRight className="h-4 w-4" />
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-neutral-500">
                        Didn't receive the code?
                    </p>

                    {timer > 0 ? (
                        <p className="mt-2 text-sm font-medium text-neutral-400">
                            Resend in 00:
                            {String(timer).padStart(2, "0")}
                        </p>
                    ) : (
                        <button
                            type="button"
                            onClick={resendCode}
                            className="mt-2 text-sm font-medium text-amber-500 hover:text-amber-600"
                        >
                            Resend Code
                        </button>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <Link
                        to={
                            isLogin
                                ? "/login"
                                : isForgotPassword
                                    ? "/login"
                                    : "/signup"
                        }
                    >
                        ← Back to{" "}
                        {isLogin
                            ? "Login"
                            : isForgotPassword
                                ? "Login"
                                : "Signup"
                        }
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}