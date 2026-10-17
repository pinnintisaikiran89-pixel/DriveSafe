
import { motion } from "framer-motion";

function PrimaryButton({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      className={`!flex !w-full items-center justify-center gap-2 rounded-xl !border-0 !bg-red-600 px-4 py-3.5 text-sm font-bold !text-white shadow-[0_8px_24px_rgba(220,38,38,0.22)] transition-all duration-200 hover:!bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <span className="!text-white">
        {children}
      </span>
    </motion.button>
  );
}

export default PrimaryButton;
