import { motion, useReducedMotion } from "framer-motion";

function PageTransition({ children }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : -8,
      }}
      transition={{
        duration: shouldReduceMotion ? 0.12 : 0.24,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        willChange: "opacity, transform",
      }}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
