import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slideshow from "../components/animatedcarousal/animatedcarousal.jsx"
function Home() {
  const [userdata, setUserdata] = useState(null); // Set initial state to null
  const data = useSelector((state) => state.authslice.userdata);

  useEffect(() => {
    setUserdata(data);
  }, [data]); // Add `data` as a dependency

  if (!userdata || !userdata.email) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-6.75rem)]">
        <div className="text-center  bg-none shadow-lg ">
          <img
            src="/loading.gif"
            alt="Duck"
            className="rounded-full w-52 h-52 mx-auto mb-4  shadow-[0px_0px_30px_10px_rgba(255,255,255,0.4)]  "
          />
          <h2 className="text-xl font-semibold text-white">
            Please Login To Browse
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-6.75rem)]">
      <h1 className="text-purple-300 font-extrabold font-serif text-4xl mb-10"> {`welcome to our page, ${userdata.email}`}</h1>
            <Slideshow/>

    </div>
  );
}

export default Home;
