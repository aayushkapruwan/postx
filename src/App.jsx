import { useEffect, useState } from "react";
import { login, logout } from "./slices/authslice.js";
import { useDispatch } from "react-redux";
import Header from "./components/header/header.jsx";
import authServiceInstance from "./appwrite/authservice.js";
import loadingGif from './assets/loading.gif'; // Import the loading GIF
import { motion } from "framer-motion";
function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  useEffect(
    () =>{
      authServiceInstance
      .getCurrentUser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login({ ...userdata }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        alert("network error :404",error);
      })//if request not sent to network by authserviceinstance
      .finally(() => {
        setloading(false);
      })
    }
    ,
    []
  );
  if (!loading) {
    return (
      <>
        <Header />
      </>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
        <img
          className="h-50 w-50 rounded-full"
          src={loadingGif}
          alt=""
        />

        <span className="text-4xl font-bold text-black">
          Loading
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="inline-block"
              animate={{ scale: [1, 1.5, 1] }} // Dots grow and shrink
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
                delay: i * 0.2, // Staggered effect
              }}
            >
              .
            </motion.span>
          ))}
        </span>
      </div>
    );
  }
}

export default App;
