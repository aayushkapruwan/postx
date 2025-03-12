import React, { useState } from "react";
import Logo from "../logo/logo";
import { Link } from "react-router-dom";
import Logoutbtn from "../logoutbtn/logoutbtn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu } from "lucide-react";
import { ID } from "appwrite";
import { Home, LogIn, UserPlus, FileText, PlusSquare } from "lucide-react";

function Header() {
  const userstatus = useSelector((state) => state.authslice.status);
  console.log(userstatus);

  const navigate = useNavigate();
  const navbuttons = [
    { name: "Home", url: "/", icon: <Home size={20} />, active: true },
    {
      name: "Login",
      url: "/signin",
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
      url: "/Addpost",
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
      <div className="fixed top-0 z-100 bg-[rgb(154,62,170)]/95 mx-auto left-0 right-0 rounded-b-sm shadow-purple-200   rounded-t-sm  w-[100%] ">
        <div className="h-13     flex  justify-center items-center  ">
          <div className="flex max-w-[665px] items-center justify-between md:max-w-[1024px] md:px-20items-center h-full w-full px-10 overflow-clip">
            <Link to="/">
              <Logo widthtailwind="h-11" heighttailwind="h-11" />
            </Link>
            {/* //small screenham */}
            <div
              onClick={ham}
              className={`z-50  md:hidden ${
                active ? "text-white/90" : "text-black/90"
              }`}
            >
              <Menu />{" "}
            </div>
            {/* //smallscreenham 
        //smallscreen */}
            <div
              className={` md:hidden
            transition-transform duration-[300ms] ease-in-out transform
            fixed translate-x-0 right-0 top-0 flex flex-col items-center sm:rounded-l-md bg-black/90 text-[20px]
            w-full gap-5
            sm:w-2/4  h-screen pt-15 text-white
            ${active ? "  translate-x-0  " : "  translate-x-full"}`}
            >
              {navbuttons.map((navbtn) =>
                navbtn.active ? (
                  <div
                    onClick={() => {
                      navigate(navbtn.url);
                      setactive(false);
                    }}
                    key={ID.unique()}
                    className="w-full relative  flex justify-center items-center gap-x-6   p-4 text-center"
                  >
                    <div className=" absolute w-[95%] h-[75%] rounded-md hover:bg-gray-500/30 m-auto"></div>
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
                  vertical="true"
                  className="w-full   flex justify-center items-center gap-x-6   p-4 text-center"
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
                    onClick={() => {
                      navigate(navbtn.url);
                    }}
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
      <div className="pt-21 "></div>
    </>
  );
}
export default Header;
