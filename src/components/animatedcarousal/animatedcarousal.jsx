import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  {
    src: "https://images.pexels.com/photos/29078810/pexels-photo-29078810/free-photo-of-dramatic-dolomites-mountain-peaks-in-mist.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    src: "https://images.pexels.com/photos/31018631/pexels-photo-31018631/free-photo-of-bustling-urban-market-scene-with-apartment-block.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    src: "https://images.pexels.com/photos/31133768/pexels-photo-31133768/free-photo-of-vibrant-indoor-festive-decor-with-red-lanterns.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export default function Slideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-3/4 mx-auto relative rounded-2xl overflow-hidden">
      <div className="relative rounded-2xl w-full h-64">
        <AnimatePresence>
          <motion.div
            key={images[index].src}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute rounded-2xl w-full h-full"
          >
            <img
              src={images[index].src}
              alt="slideshow"
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />

          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center mt-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-3 w-3 mx-1 rounded-full transition-all duration-300 ${
              i === index ? "bg-gray-800" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
