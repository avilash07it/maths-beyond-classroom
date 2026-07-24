import { motion } from "framer-motion";

function PageTransition({ children }) {
  return (
    <motion.div
     initial={{
    opacity: 0,
    filter: "blur(8px)",
  }}
  animate={{
    opacity: 1,
    filter: "blur(0px)",
  }}
  exit={{
    opacity: 0,
    filter: "blur(6px)",
  }}
  transition={{
    duration: 0.3,
  }}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;