import React from "react";
import CircularAnimation from "../circularmotion/circularmotion.jsx";
import { LogOut } from "lucide-react";
import authServiceInstance from "../../appwrite/authservice";
import { logout } from "../../slices/authslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Logoutbtn({
  className = "w-full   flex justify-center items-center gap-x-6  md:hover:text-white   p-4",
  IDs,
  vertical = "false",
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  if (loading === true) {
    return <CircularAnimation />;
  }
  return (
    /* */
    <div
      key={IDs}
      className={`relative ${className}`}
      onClick={() => {
        setloading(true);
        authServiceInstance.logout().then(() => {
          dispatch(logout());
          navigate("");
        });
      }}
    >
      {vertical === "true" && (
        <div className=" absolute w-[95%] h-[75%] rounded-md hover:bg-gray-500/30 m-auto"></div>
      )}
      <LogOut size={20} />
      <button>Logout</button>
    </div>
  );
}

export default Logoutbtn;
