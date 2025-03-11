import { motion } from "framer-motion";

const CircularAnimation = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
};

export default CircularAnimation;
