import Postform from "../components/postform/Postform.jsx";
import React from "react";
import { useSelector } from "react-redux";

function Addpost() {
  const st = useSelector((state) => state.authslice.status);
  if (!st) {
    return <p className="text-red-700 text-center">please login to explore</p>
  }
  return (
    <div>
      <Postform />
    </div>
  );
}

export default Addpost;
