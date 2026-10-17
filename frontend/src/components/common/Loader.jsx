import { motion } from "framer-motion";

function Loader() {

  return (

    <div className="flex justify-center items-center h-screen">

      <motion.div

        animate={{
          rotate: 360
        }}

        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear"
        }}

        className="
        w-12
        h-12
        rounded-full
        border-4
        border-blue-600
        border-t-transparent
        "

      />

    </div>

  );

}

export default Loader;