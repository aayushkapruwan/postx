import React, { useState } from "react";
import ayImage from "./ay.jpg";
import Hamburger from "hamburger-react";
function Header() {
  const [active, setactive] = useState(false);
  function ham() {
    setactive(!active);
  }
  return (
<>
<div className="fixed  w-screen bg-gray-400/95 ">
     <div className="h-16     flex  justify-center items-center  ">
      <div className="flex max-w-[665px] justify-between md:max-w-[1024px] md:px-20items-center h-full w-full px-10 overflow-clip">
        <img
          src={ayImage}
          className="  h-14 mt-0.5 opacity-90 rounded-full w-14 "
          alt=""
        />
        {/* //small screenham */}
        <div
          onClick={ham}
          className={`z-50  md:hidden ${
            active ? "text-white/90" : "text-black/90"
          }`}
        >
          <Hamburger />
        </div>
        {/* //smallscreenham 
        //smallscreen */}
        <div
          className={` md:hidden
            transition-transform duration-[300ms] ease-in-out transform
            fixed translate-x-0 right-0 top-0 flex flex-col items-center bg-black/90 text-[20px]
            w-full gap-5
            sm:w-2/4  h-screen pt-15 text-white
            ${active ? "  translate-x-0  " : "  translate-x-full"}`}
        >
          <div className="w-full   flex justify-center items-center gap-x-6  hover:bg-gray-500/30  p-4 text-center">
            <i className="fa-solid fa-house"></i>
            <p>Home</p>
          </div>
          <div className="w-full flex justify-center items-center gap-x-6 hover:bg-gray-500/30  p-4  text-center">
            <i className="fa-solid fa-address-card"></i>
            <p>About</p>
          </div>
          <div className="w-full flex justify-center items-center gap-x-6 hover:bg-gray-500/30  p-4  text-center">
            <i className="fa-solid fa-tv"></i>
            <p>Projects</p>
          </div>
          <div className="w-full flex justify-center items-center gap-x-6 hover:bg-gray-500/30  p-4  text-center">
            <i className="fa-solid fa-file"></i>
            <p>Resume</p>
          </div>
        </div>
        {/* //smallscreen 
        //large-screen */}
        <div className="hidden md:flex transition ease-linear ">
          <div className="w-full   flex justify-center items-center gap-x-6  transition-transform duration-300  hover:bg-gray-500/30 md:hover:bg-gray-500/70 md:hover:rounded-4xl    p-4 text-center">
            <i className="fa-solid fa-house"></i>
            <p>Home</p>
          </div>
          <div className="w-full flex justify-center items-center gap-x-6 transition-transform duration-300  hover:bg-gray-500/30 md:hover:bg-gray-500/70 md:hover:rounded-4xl    p-4  text-center">
            <i className="fa-solid fa-address-card"></i>
            <p>About</p>
          </div>
          <div className="w-full flex justify-center items-center gap-x-6 transition-transform duration-300  hover:bg-gray-500/30  md:hover:bg-gray-500/70 md:hover:rounded-4xl   p-4  text-center">
            <i className="fa-solid fa-tv"></i>
            <p>Projects</p>
          </div>
          <div className="w-full flex justify-center items-center gap-x-6 transition-transform duration-300  hover:bg-gray-500/30  md:hover:bg-gray-500/70 md:hover:rounded-4xl   p-4  text-center">
            <i className="fa-solid fa-file"></i>
            <p>Resume</p>
          </div>
        </div>
        {/* //large-screen */}
      </div>
    </div>
 </div>
 <div className="pt-16"></div>
</>
  );
}
export default Header;
