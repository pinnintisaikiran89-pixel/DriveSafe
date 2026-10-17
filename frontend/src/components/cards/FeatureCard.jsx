import { motion } from "framer-motion";

function FeatureCard({
  title,
  subtitle,
  icon,
  onClick,
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.25,
      }}
      onClick={onClick}
      className="
        bg-white
        rounded-[28px]
        p-6
        shadow-md
        border
        border-slate-100
        cursor-pointer
      "
    >
      <div
        className="
          w-14
          h-14
          rounded-2xl
          bg-blue-100
          flex
          items-center
          justify-center
          text-blue-600
        "
      >
        {icon}
      </div>

      <h2 className="font-bold text-xl mt-5 text-slate-800">
        {title}
      </h2>

      <p className="text-slate-500 mt-2 leading-6">
        {subtitle}
      </p>
    </motion.div>
  );
}

export default FeatureCard;