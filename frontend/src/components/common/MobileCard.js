import { motion } from "framer-motion";

function MobileCard({
  children,
  className = "",
  onClick,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`
        bg-white
        rounded-3xl
        shadow-md
        border
        border-slate-100
        p-5
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

export default MobileCard;