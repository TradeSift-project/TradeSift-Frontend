import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import AuthHero from "./components/AuthHero";
import AuthLayout from "./components/AuthLayout";

import { fadeUp } from "../../animations/variants";
import { handleSignupSubmit } from "./handlers/signup/handleSignupSubmit";
import useAutoClearError from "./hooks/useAutoClearer";
import { handleFormNavigation } from "./handlers/handleKeyDown";
import { useNavigate } from "react-router";


export default function Signup() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formData = {
    firstName,
    lastName,
    organizationName,
    email,
    password,
    confirmPassword,
    agreedToTerms,
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const success = await handleSignupSubmit(
      e,
      formData,
      setError
    );

    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);

    if (!success) return;

    setTimeout(() => {
      navigate("/verify-otp", {
        state: {
          email,
          mode: "signup",
        },
      });
    }, 2000);
  };

  const handleKeyDown = (e) =>
    handleFormNavigation(e, () => onSubmit(e));

  useAutoClearError(error, setError)


  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className='flex h-screen flex-col lg:flex-row overflow-hidden"'>

      <AuthHero />

      <AuthLayout
        mode='signup'

        headerTitle='Create your account'
        headerSubtitle='Start your AI-native trade workflow in minutes.'

        firstName={firstName}
        setFirstName={setFirstName}

        lastName={lastName}
        setLastName={setLastName}

        organizationName={organizationName}
        setOrganizationName={setOrganizationName}

        email={email}
        setEmail={setEmail}

        password={password}
        setPassword={setPassword}

        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}

        showPassword={showPassword}
        setShowPassword={setShowPassword}

        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}

        agreedToTerms={agreedToTerms}
        setAgreedToTerms={setAgreedToTerms}

        error={error}
        setError={setError}

        submitBtnText="Create Account"
        isSubmitBtnLoading={isSubmitting}

        handleSubmit={onSubmit}
        handleKeyDown={handleKeyDown}
      />


    </motion.div>
  );
}