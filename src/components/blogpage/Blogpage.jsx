import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postsdatabaseobj from "../../appwrite/userpostsdatabase";
import HtmlParser from "react-html-parser";
function Blogpage() {
  const { postid } = useParams();
  const [pst, setPst] = useState(null); // Store post data
  const [loading, setLoading] = useState(true); // Handle loading state
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

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!pst) return <p className="text-center text-red-500">Post not found.</p>;
  console.log(pst.featuredimage);

  return (
    <div className=" max-w-3xl mx-auto">
      <div className="  mx-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
        {pst.featuredimage && (
          <img
            src={pst.featuredimage} // Now it's a direct image URL
            alt={pst.title}
            className="w-full h-64 object-cover rounded-xl mb-4"
          />
        )}

        <h1 className="text-3xl font-bold text-gray-900 mb-2 tt">
          {pst.title}
        </h1>
        {HtmlParser(pst.content)}
      </div>
    </div>
  );
}

export default Blogpage;
