import { motion } from "framer-motion";

function SecondaryButton({

    title,

    onClick,

    icon,

    className = ""

}) {

    return (

        <motion.button

            whileTap={{ scale: 0.97 }}

            whileHover={{ scale: 1.01 }}

            onClick={onClick}

            className={`
                w-full
                h-14
                rounded-2xl
                bg-white
                border
                border-slate-200
                text-slate-800
                font-semibold
                shadow-md
                flex
                items-center
                justify-center
                gap-2
                ${className}
            `}
        >

            {icon}

            {title}

        </motion.button>

    );

}

export default SecondaryButton;