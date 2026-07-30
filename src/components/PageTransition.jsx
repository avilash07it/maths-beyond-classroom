import { motion } from "framer-motion";

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 14,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -10,
      }}
      transition={{
        duration: 0.24,
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
