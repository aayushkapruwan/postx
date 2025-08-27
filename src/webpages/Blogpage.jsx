import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import postsdatabaseobj from "../appwrite/userpostsdatabase";
import HtmlParser from "react-html-parser";
import { useSelector } from "react-redux";
import Button from "../components/input&btncomponent.jsx/button";
import postsimageobj from "../appwrite/userpostimage";

function Blogpage() {
    const [userdata, setUserdata] = useState(null);
    const data = useSelector((state) => state.authslice.userdata);
    console.log(data);
  
    // Sync local state with Redux data
    useEffect(() => {
      setUserdata(data);
    }, [data]);
  const st = useSelector((state) => state.authslice.status);
  const navigate = useNavigate();
  const { postid } = useParams();
  const [pst, setPst] = useState("");
  const [loading, setLoading] = useState(true);
  const [delload, setdelload] = useState(false);

  if (!st) {
    return (
      <p className="text-red-700 text-center text-lg mt-10">
        Please login to explore
      </p>
    );
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await postsdatabaseobj.getpost(postid);
        setPst(postData);
        console.log(postData);
        
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postid]);

  function getFileIdFromUrl(url) {
    const parts = url.split("/");
    const fileIndex = parts.indexOf("files");
    if (fileIndex !== -1 && parts[fileIndex + 1]) {
      return parts[fileIndex + 1];
    }
    return null;
  }

  async function deletepost() {
    setdelload(true);
    const fileId = getFileIdFromUrl(pst.featuredimage);
    await postsimageobj.deletefile(fileId);
    await postsdatabaseobj.deletepost(pst.$id).then(() => {
      setPst(false);
      navigate("/allposts");
    });
  }

  const timeAgo = useMemo(() => {
    if (!pst?.$createdAt) return "Just now";

    const diff = Math.floor((Date.now() - new Date(pst.$createdAt)) / 1000);
    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    return new Date(pst.$createdAt).toLocaleDateString();
  }, [pst?.$createdAt]);

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  if (!pst)
    return <p className="text-center text-red-500 mt-10">Post not found.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="bg-white shadow-lg rounded-3xl border border-gray-200 overflow-hidden transition duration-300 hover:shadow-2xl">
        {/* Featured Image with Blurry Background */}
        {pst.featuredimage && (
          <div className="relative w-full h-[28rem] sm:h-[32rem] overflow-hidden">
            {/* Blurry Background */}
            <div
              className="absolute inset-0 bg-center bg-cover blur-3xl scale-110"
              style={{
                backgroundImage: `url(${pst.featuredimage})`,
              }}
            ></div>

            {/* Overlay for subtle dark effect */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Main Image */}
            <div className="relative z-10 flex items-center justify-center w-full h-full">
              <img
                src={pst.featuredimage}
                alt={pst.title}
                loading="lazy"
                className="max-h-full max-w-full object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105
               filter blur-sm animate-pulse" // initial blur
                onLoad={(e) =>
                  e.currentTarget.classList.remove("blur-sm", "animate-pulse")
                } // remove blur after load
              />
            </div>
          </div>
        )}

        {/* Blog Content */}
        <div className="p-6 sm:p-10 relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            {pst.title}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
              {pst.createdBy?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div>
              <p className="text-gray-800 font-semibold text-lg">
                {pst.createdBy || "Anonymous"}
              </p>
              <p className="text-gray-500 text-sm">{timeAgo}</p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 text-xl leading-relaxed">
            {HtmlParser(pst.content)}
          </div>
        </div>

        {/* Post Actions */}
        {pst.userid === userdata.$id && (
          <div className="flex gap-4 justify-end p-6 bg-gray-50 border-t border-gray-200">
            {!delload ? (
              <Button
                type="text"
                text="Delete"
                bgColor="bg-red-500"
                className="rounded-xl px-6 py-2 hover:bg-red-600 transition duration-300"
                onClick={deletepost}
              />
            ) : (
              <p className="text-gray-500">Deleting...</p>
            )}
            <Button
              type="text"
              text="Edit"
              className="rounded-xl px-6 py-2 bg-blue-500 hover:bg-blue-600 transition duration-300 text-white"
              onClick={() => navigate(`/Editpost/${postid}`)}
            />
          </div>
        )}
      </div>
      <div className="h-20"></div>
    </div>
  );
}

export default Blogpage;
