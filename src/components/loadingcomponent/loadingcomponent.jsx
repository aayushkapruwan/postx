import React from "react";
import { Circle } from "lucide-react";
import { motion } from "framer-motion";

const colors = [
  "#8B0000", // dark red
  "#FF0000", // red
  "#FF4500", // orange-red
  "#FF8C00", // orange
  "#FFD700", // gold
  "#00CED1", // cyan
  "#FFD700", // gold
  "#FF8C00", // orange
  "#FF4500", // orange-red
  "#FF0000", // red
  "#8B0000"  // dark red
];
const LoadingIcon = () => {
 return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-6.75rem)] w-screen bg-black">
      {/* Loader Circles */}
      <div className="flex gap-1">
        {colors.map((color, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.5, opacity: 0.6 }}
            animate={{ scale: [0.5, 1.3, 0.5], opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 1.2,
              delay: index * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Circle size={28} style={{ color }} />
          </motion.div>
        ))}
      </div>

      {/* Loading Text */}
      <p className="text-white text-xs mt-3">Loading...</p>
    </div>
  );
};

export default LoadingIcon;