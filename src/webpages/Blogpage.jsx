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
  const [pst, setPst] = useState(""); // Store post data
  const [loading, setLoading] = useState(true); // Handle loading state
  if (!st) {
    return <p className="text-red-700 text-center">please login to explore</p>
  }
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await postsdatabaseobj.getpost(postid);
        setPst(postData);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postid]);
  const [delload, setdelload] = useState(false);

  async function deletepost() {
    setdelload(true);
    const parts = pst.featuredimage.split("/");
    const fileId = parts[parts.length - 2];
    await postsimageobj.deletefile(fileId);

    await postsdatabaseobj.deletepost(pst.$id).then(() => {
      setPst(false);
      navigate("/allposts");
    });
  }

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (!pst) return <p className="text-center text-red-500">Post not found.</p>;

  return (
    <div className=" max-w-4xl mx-auto max-h-xl">
      <div className="  mx-10 p-6 h-1/3 bg-purple-300 shadow-lg rounded-2xl border border-gray-200">
        {pst.userid === userdata.$id ? (
          <div className="mb-3 flex gap-5">
            {!delload ? (
              <div className="w-1/5" onClick={deletepost}>
                <Button
                  type="text"
                  text="delete"
                  bgColor="bg-red-500"
                  className=" rounded-3xl"
                />
              </div>
            ) : (
              <p className="text-center text-gray-500">Loading...</p>
            )}

            <div
              className="w-1/5"
              onClick={() => {
                navigate(`/Editpost/${postid}`);
              }}
            >
              <Button type="text" text="edit" className=" rounded-3xl" />
            </div>
          </div>
        ) : undefined}

        {pst.featuredimage && (
          <img
            src={pst.featuredimage} // Now it's a direct image URL
            alt={pst.title}
            className=" w-full h-1/3 sm:h-96 aspect-square  object-center rounded-xl mb-4"
          />
        )}

        <h1 className="text-2xl font-bold text-gray-900 mb-2 tt">
          {pst.title}
        </h1>
        <div className="text-xl">{HtmlParser(pst.content)}</div>
      </div>
      <div className="h-14"></div>
    </div>
  );
}

export default Blogpage;
