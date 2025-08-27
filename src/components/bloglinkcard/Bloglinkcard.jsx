import { Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Bloglinkcard({ $id, title, featuredimage, createdAt, createdBy }) {
  const [userdata, setUserdata] = useState(null);
  const data = useSelector((state) => state.authslice.userdata);
  console.log(data);

  // Sync local state with Redux data
  useEffect(() => {
    setUserdata(data);
  }, [data]);

  // Convert createdAt to a "time ago" format
  const timeAgo = useMemo(() => {
    if (!createdAt) return "Just now";

    const diff = Math.floor((Date.now() - new Date(createdAt)) / 1000);

    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;

    return new Date(createdAt).toLocaleDateString();
  }, [createdAt]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="group w-80 sm:w-88 md:w-96 rounded-3xl bg-amber-100 shadow-md hover:shadow-xl hover:shadow-black/60 transition-all duration-300 overflow-hidden relative">

        {/* Image */}
        <div className="h-full w-auto flex items-center justify-center bg-gray-200">
          <img
            src={featuredimage || "https://via.placeholder.com/500x400"}
            alt={title}
            loading="lazy"
            className="h-full  w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Created At */}
        <div className="mt-2 ml-3 text-[13px] font-bold text-gray-700">
          <p>{timeAgo}</p>
        </div>

        {/* Title */}
        <div className="p-3 pb-10">
          <h2 className="text-[15px] font-bold text-black group-hover:text-blue-700 transition-colors duration-300 line-clamp-2 leading-snug">
            {title}
          </h2>
        </div>

        {/* Footer Section */}
        <div className="absolute bottom-3 left-3 w-[90%]">
          <div className="flex items-center justify-between">
            <p className="text-[13px] truncate max-w-[70%]">
              posted by{" "}
              <span className="font-semibold text-gray-900">
                {createdBy || userdata?.email || "Anonymous"}
              </span>
            </p>
            <div className="flex items-center text-gray-700">
              <i className="fa-brands fa-gratipay ml-3 cursor-pointer hover:text-red-600 transition-colors duration-200"></i>
              <i className="fa-solid fa-message ml-3 cursor-pointer hover:text-blue-600 transition-colors duration-200"></i>
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}

export default Bloglinkcard;
