import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import postsimageobj from "../../appwrite/userpostimage.js";
function Bloglinkcard({ $id, title, featuredimage }) {
  // const [imgsrc,setimgsrc]=useState(null)
  //   useEffect( ()=>{
  //     async function getdata(){
  //       const data=await postsimageobj.filepreview(featuredImage)
  //     setimgsrc(data)
  //     }
  //     getdata()
  //   },[])
  return (
    <Link to={`/post/${$id}`}>
      <div className=" rounded-2xl h-[300px] w-[280px] p-4 hover:text-white hover:shadow-[0px_0px_30px_10px_rgba(255,255,255,0.4)] transition-shadow duration-300">
          <img
            src={featuredimage}
            alt={title}
            className="rounded-2xl w-full h-[210px] mb-6"
          />
        <h2 className="text-lg ml-1 font-bold ">{title}</h2>
      </div>
    </Link>
  );
}

export default Bloglinkcard;
