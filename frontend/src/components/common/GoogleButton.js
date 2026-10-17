
import { motion } from "framer-motion";

function GoogleButton({
  onClick,
  loading = false,
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={loading}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {/* Official multicolor Google symbol */}
      <svg
        className="h-5 w-5 shrink-0"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
        />
        <path
          fill="#4285F4"
          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.72 6C44.43 37.98 46.98 31.85 46.98 24.55Z"
        />
        <path
          fill="#FBBC05"
          d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.72-6c-2.14 1.43-4.89 2.27-8.19 2.27-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
        />
      </svg>

      <span>
        {loading ? "Connecting..." : "Continue with Google"}
      </span>
    </motion.button>
  );
}

export default GoogleButton;
