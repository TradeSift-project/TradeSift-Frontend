import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

import Logo from "../../../../assets/Logo.png";

import AuthHeader from "./AuthHeader";
import AuthDivider from "./AuthDivider";
import AuthFooter from "./AuthFooter";
import AuthOAButtons from "./AuthOAButtons";
import { initiateGoogleOAuth } from "../services/googleAuth/googleAuthService";
import AuthError from "./AuthError";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const MotionLink = motion.create(Link);

const AuthLayout = ({
    mode,

    headerTitle,
    headerSubtitle,

    firstName,
    setFirstName,

    lastName,
    setLastName,

    organizationName,
    setOrganizationName,

    email,
    setEmail,

    password,
    setPassword,

    confirmPassword,
    setConfirmPassword,

    showPassword,
    setShowPassword,

    showConfirmPassword,
    setShowConfirmPassword,

    agreedToTerms,
    setAgreedToTerms,

    rememberMe,
    setRememberMe,

    error,
    setError,

    submitBtnText,
    isSubmitBtnLoading,
    handleSubmit,
    handleKeyDown,
    handleForgotPassword,
}) => {
    return (
        <section className="flex h-full w-full lg:w-[58%] flex-col overflow-y-auto bg-white px-5 py-5 sm:px-8 lg:px-10 xl:px-14">

            {/* Top Login Link */}
            <div className="order-last mt-8 w-full border-t border-neutral-100 pt-6 font-geist lg:order-first lg:mt-0 lg:border-0 lg:pt-0">
                <p className="flex justify-center gap-1 text-sm text-[#6B7280]/80 lg:justify-end">
                    {
                        mode === 'signup' ? 'Already have an account?' : 'New to TradeSift?'
                    }
                    <Link
                        to=   {
                        mode === 'signup' ? '/login' : '/signup'
                    }
                        className="text-amber-500 hover:text-amber-600 hover:underline"
                    >
                         {
                        mode === 'signup' ? 'Sign In' : 'Create Account'
                    }
                    </Link>
                </p>
            </div>

            <div className="flex flex-1 items-center justify-center lg:block">
                <div className="mx-auto mt-6 w-full max-w-[440px] space-y-4 sm:mt-12 lg:ml-[12%] lg:mt-14 lg:mx-0">

                    {/* Mobile Logo */}
                    <MotionLink
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        to="/"
                        className="flex h-12 items-center gap-3 pb-10 lg:hidden"
                    >
                        <img
                            src={Logo}
                            alt=""
                            className="h-10 w-auto object-contain"
                        />

                        <span className="mt-4 font-geist text-lg font-bold">
                            TradeSift
                        </span>
                    </MotionLink>

                    <AuthHeader title={headerTitle} subtitle={headerSubtitle} />

                    {mode === "signup" ? (<SignupForm
                        form={{
                            firstName,
                            setFirstName,
                            lastName,
                            setLastName,
                            organizationName,
                            setOrganizationName,
                            email,
                            setEmail,
                        }}
                        password={{
                            password,
                            setPassword,
                            confirmPassword,
                            setConfirmPassword,
                            showPassword,
                            setShowPassword,
                            showConfirmPassword,
                            setShowConfirmPassword,
                        }}
                        agreement={{
                            agreedToTerms,
                            setAgreedToTerms,
                        }}
                        handlers={{
                            handleKeyDown,
                            handleSubmit,
                            error,
                            setError,
                        }}
                        submitBtnText={submitBtnText}
                        isSubmitBtnLoading={isSubmitBtnLoading}
                    />
                    ) : (
                        <LoginForm
                            form={{
                                email,
                                setEmail,
                            }}

                            password={{
                                password,
                                setPassword,
                                showPassword,
                                setShowPassword,
                            }}

                            remember={{
                                rememberMe,
                                setRememberMe,
                            }}

                            handlers={{
                                handleKeyDown,
                                handleSubmit,
                                handleForgotPassword,
                            }}

                            submitBtnText={submitBtnText}
                            isSubmitBtnLoading={isSubmitBtnLoading}
                        />
                    )}



                    <AuthError error={error} />

                    <AuthDivider />

                    <AuthOAButtons
                        onGoogleLogin={initiateGoogleOAuth}
                    />

                    <AuthFooter />
                </div>
            </div>
        </section>
    );
};

export default AuthLayout;