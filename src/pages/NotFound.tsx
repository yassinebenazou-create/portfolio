import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MoveLeft } from "lucide-react";

/**
 * Pure Minimalist 404 Page.
 * Focuses on effortless elegance, negative space, and refined typography.
 * Strips away all decorative clutter for a high-end, gallery-like feel.
 */
const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-transparent">
      <div className="w-full max-w-xl flex flex-col items-center text-center">
        {/* Subtle, large numbers */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.15, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="select-none pointer-events-none mb-12"
        >
          <h1 className="text-[8rem] md:text-[12rem] font-bold tracking-tighter Welcome-text font-pixel">
            404
          </h1>
        </motion.div>

        {/* Clean Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
            Page not found.
          </h2>
          <p className="text-white/40 text-lg font-light max-w-sm mx-auto leading-relaxed">
            The path <span className="text-primary/60 font-mono italic">"{location.pathname}"</span> does not exist in this sector.
          </p>
        </motion.div>

        {/* Minimalist Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16"
        >
          <Link to="/" className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-500 font-medium tracking-[0.2em] uppercase text-[10px]">
            <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
            Return to Core
          </Link>
        </motion.div>
      </div>

      {/* Single, almost invisible divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.1 }}
        transition={{ delay: 1.2, duration: 1.5 }}
        className="absolute bottom-12 w-32 h-[1px] bg-white origin-center"
      />
    </div>
  );
};

export default NotFound;
