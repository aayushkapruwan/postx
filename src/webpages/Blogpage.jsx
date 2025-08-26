import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import postsdatabaseobj from "../appwrite/userpostsdatabase";
import HtmlParser from "react-html-parser";
import { useSelector } from "react-redux";
import Button from "../components/input&btncomponent.jsx/button";
import postsimageobj from "../appwrite/userpostimage";

function Blogpage() {
  const st = useSelector((state) => state.authslice.status);
  const userdata = useSelector((state) => state.authslice.userdata);
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
        console.log(postData);

        setPst(postData);
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
    return null; // if not found
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

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  if (!pst)
    return <p className="text-center text-red-500 mt-10">Post not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 mt-8">
      <div className="bg-white shadow-lg rounded-3xl border border-gray-200 overflow-hidden transition duration-300 hover:shadow-2xl">
        {/* Post Actions */}
        {pst.userid === userdata.$id && (
          <div className="flex gap-4 justify-end p-4 bg-gray-50 border-b border-gray-200">
            {!delload ? (
              <Button
                type="text"
                text="Delete"
                bgColor="bg-red-500"
                className="rounded-2xl px-6 py-2 hover:bg-red-600 transition duration-300"
                onClick={deletepost}
              />
            ) : (
              <p className="text-gray-500">Deleting...</p>
            )}
            <Button
              type="text"
              text="Edit"
              className="rounded-2xl px-6 py-2 bg-blue-500 hover:bg-blue-600 transition duration-300 text-white"
              onClick={() => navigate(`/Editpost/${postid}`)}
            />
          </div>
        )}

        {/* Featured Image */}
        {pst.featuredimage && (
          <div className="w-full h-72 sm:h-96 overflow-hidden">
            <img
              src={pst.featuredimage}
              alt={pst.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
            {pst.title}
          </h1>
          <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
            {HtmlParser(pst.content)}
          </div>
        </div>
      </div>

      {/* Space below footer */}
      <div className="h-16"></div>
    </div>
  );
}

export default Blogpage;
