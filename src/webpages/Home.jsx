import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

function Home() {
  const [userdata, setUserdata] = useState(null);
  const data = useSelector((state) => state.authslice.userdata);

  useEffect(() => {
    setUserdata(data);
  }, [data]);

  if (!userdata || !userdata.email) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center text-center bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20 animate-fade-in">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-full shadow-[0_0_30px_8px_rgba(255,255,255,0.2)] mb-6">
            <BookOpen className="w-16 h-16 text-white animate-bounce" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
            Please Login To Browse
          </h2>
          <p className="text-gray-300 text-lg mt-3">
            Discover amazing blogs, connect with people, and share your stories.
          </p>
          <Link
            to="/login"
            className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-transform duration-300 ease-in-out"
          >
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-center text-purple-300 font-extrabold font-serif text-2xl md:text-4xl mb-10 animate-fade-in">
        {`Welcome, ${userdata.email}!`}
      </h1>

      {/* Action Cards */}
<div className="flex justify-center w-full">
  <div className="flex flex-wrap justify-center gap-6 max-w-5xl w-full px-4">
    <Link
      to="/allposts"
      className="bg-white/10 backdrop-blur-md hover:bg-white/20 transition p-6 rounded-3xl shadow-lg flex flex-col items-center text-center transform hover:-translate-y-1 hover:scale-105 duration-300"
    >
      <BookOpen className="w-12 h-12 text-purple-300 mb-4" />
      <h2 className="text-xl font-bold text-purple-100 mb-2">Browse Blogs</h2>
      <p className="text-gray-500 text-sm sm:text-base">Explore and read amazing content from the community.</p>
    </Link>

    <Link
      to="/addpost"
      className="bg-white/10 backdrop-blur-md hover:bg-white/20 transition p-6 rounded-3xl shadow-lg flex flex-col items-center text-center transform hover:-translate-y-1 hover:scale-105 duration-300"
    >
      <BookOpen className="w-12 h-12 text-pink-300 mb-4" />
      <h2 className="text-xl font-bold text-pink-100 mb-2">Create Blog</h2>
      <p className="text-gray-500 text-sm sm:text-base">Share your knowledge and stories with the community.</p>
    </Link>
  </div>
</div>



    </div>
  );
}

export default Home;
