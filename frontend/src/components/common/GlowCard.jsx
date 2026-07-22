import { motion } from "framer-motion";

/**
 * Base glass/glow card used across playlist cards, widgets, and panels.
 * Pass hover={false} for static (non-interactive) panels.
 */
function GlowCard({ children, onClick, hover = true, className = "", as = "div" }) {
  const Motion = as === "button" ? motion.button : motion.div;

  return (
    <Motion
      onClick={onClick}
      whileHover={
        hover
          ? { scale: 1.02, borderColor: "rgba(0,255,100,0.45)" }
          : undefined
      }
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`bg-hkf-card/80 border border-[rgba(0,255,100,.12)] rounded-xl
      backdrop-blur-sm ${hover ? "hover:shadow-glow cursor-pointer" : ""} ${className}`}
    >
      {children}
    </Motion>
  );
}

export default GlowCard;
