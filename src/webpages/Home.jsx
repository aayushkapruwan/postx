import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Home() {
  const [userdata, setUserdata] = useState(null); // Set initial state to null
  const data = useSelector((state) => state.authslice.userdata);

  useEffect(() => {
    setUserdata(data);
  }, [data]); // Add `data` as a dependency

  if (!userdata || !userdata.email) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-6.75rem)]">
        <div className="text-center p-6 bg-amber-50 shadow-lg rounded-2xl">
          <img
            src="/loading.gif"
            alt="Duck"
            className="rounded-2xl w-full h-52 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800">
            Please Login To Browse
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-6.75rem)]">
      <div className="text-center p-6 bg-amber-50 shadow-lg rounded-2xl">
        <img
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDNrbmYwaDgzNTYzbm91cG02dThrN2N4cnBkYXZhbGIxZjEycWFueSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4oMoIbIQrvCjm/giphy.gif"
          alt="Duck"
          className="rounded-2xl w-full h-52 mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-800">
          {`Welcome ${userdata.email}`}
        </h2>
      </div>
    </div>
  );
}

export default Home;
