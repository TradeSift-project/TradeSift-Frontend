import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SubmitButton = ({
  text = "Continue",
  icon = true,
  loading = false,
  disabled = false,
}) => {
  return (
    <motion.button
      type="submit"
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 py-3 text-[13px] font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Please wait..." : text}

      {icon && !loading && <ArrowRight className="h-4 w-4" />}
    </motion.button>
  );
};

export default SubmitButton;