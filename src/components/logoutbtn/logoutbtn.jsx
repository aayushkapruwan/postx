import React from "react";
import { LogOut } from "lucide-react";
import authServiceInstance from "../../appwrite/authservice";
import { logout } from "../../slices/authslice";
import { useDispatch } from "react-redux";
function Logoutbtn({
  className = "w-full   flex justify-center items-center gap-x-6  md:hover:text-white   p-4",
  IDs,
}) {
  const dispatch = useDispatch();
  return (
    /* */
    <div
      key={IDs}
      className={className}
      onClick={() => {
        authServiceInstance.logout().then(() => {
          dispatch(logout());
        });
      }}
    >
      <LogOut size={20} />
      <button>Logout</button>
    </div>
  );
}

export default Logoutbtn;
