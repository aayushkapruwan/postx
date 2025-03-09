import React, { useState } from "react";
import Logo from "../logo/logo";
// import { Link } from "react-router-dom";
import Logoutbtn from "../logoutbtn/logoutbtn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Hamburger from "hamburger-react";
import { ID } from "appwrite";
import { Home, LogIn, UserPlus, FileText, PlusSquare } from "lucide-react";

function Header() {
  const userstatus = useSelector((state) => state.authslice.status);
  console.log(userstatus);

  // const navigate = useNavigate();
  const navbuttons = [
    { name: "Home", url: "/home", icon: <Home size={20} />, active: true },
    {
      name: "Login",
      url: "/login",
      icon: <LogIn size={20} />,
      active: !userstatus,
    },
    {
      name: "Signup",
      url: "/signup",
      icon: <UserPlus size={20} />,
      active: !userstatus,
    },
    {
      name: "Allposts",
      url: "/allposts",
      icon: <FileText size={20} />,
      active: userstatus,
    },
    {
      name: "Addposts",
      url: "/addposts",
      icon: <PlusSquare size={20} />,
      active: userstatus,
    },
  ];
  const [active, setactive] = useState(false);
  function ham() {
    setactive(!active);
  }
  return (
    <>
      <div className="fixed  w-screen bg-gray-400/95 ">
        <div className="h-16     flex  justify-center items-center  ">
          <div className="flex max-w-[665px] items-center justify-between md:max-w-[1024px] md:px-20items-center h-full w-full px-10 overflow-clip">
            {/* <Link to="/"> */}
            <Logo widthtailwind="h-11" heighttailwind="h-11" />
            {/* </Link> */}
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
              {navbuttons.map((navbtn) =>
                navbtn.active ? (
                  <div
                    // onClick={() => {
                    //   navigate(navbtn.url);
                    // }}
                    key={ID.unique()}
                    className="w-full   flex justify-center items-center gap-x-6  hover:bg-gray-500/30  p-4 text-center"
                  >
                    {navbtn.icon}
                    <button className="inline-flex items-center gap-2">
                      {navbtn.name}
                    </button>
                  </div>
                ) : null
              )}
              {userstatus && (
                <Logoutbtn
                  IDs={ID.unique}
                  className="w-full   flex justify-center items-center gap-x-6  hover:bg-gray-500/30  p-4 text-center"
                />
              )}
            </div>
            {/* //smallscreen 
        //large-screen */}
            <div className="hidden md:flex transition ease-linear ">
              {navbuttons.map((navbtn) =>
                navbtn.active ? (
                  <div
                    key={ID.unique()}
                    // onClick={() => {
                    //   navigate(navbtn.url);
                    // }}
                    className="w-full   flex justify-center items-center gap-x-6  md:hover:text-white   p-4 "
                  >
                    {navbtn.icon}
                    <button>{navbtn.name}</button>
                  </div>
                ) : null
              )}
              {userstatus && (
                <Logoutbtn
                  IDs={ID.unique}
                  className="w-full   flex justify-center items-center gap-x-6  md:hover:text-white   p-4"
                />
              )}
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
