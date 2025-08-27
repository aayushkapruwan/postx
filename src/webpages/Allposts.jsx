import React, { useState, useEffect } from "react";
import Bloglinkcard from "../components/bloglinkcard/Bloglinkcard.jsx";
import postsdatabaseobj from "../appwrite/userpostsdatabase";
import { useSelector } from "react-redux";

function AllPosts() {
  const st = useSelector((state) => state.authslice.status);
  const [posts, setPosts] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function getx() {
      const postsx = await postsdatabaseobj.getposts();
      setPosts(postsx.documents);
      console.log(postsx.documents);
      
      if (postsx.documents) {
        setloading(false);
      }
    }
    getx();
  }, []);

  if (loading) {
    if (!st) {
      return (
        <p className="text-red-700 text-center mt-5">
          Please login to explore
        </p>
      );
    }
    return (
      <p className="text-center text-gray-500 mt-5">Loading...</p>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {posts.map((post) => (
            <Bloglinkcard
              key={post.$id}
              $id={post.$id}
              title={post.title}
              featuredimage={post.featuredimage}
              createdAt={post.$createdAt}
              createdBy={post.createdBy || "Anonymous"}
            />
          ))}
        </div>
      </div>
      <div className="h-16"></div>
    </>
  );
}

export default AllPosts;
