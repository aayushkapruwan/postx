import React, { useState, useEffect } from "react";
import Container from "../components/container/container.jsx";
import Bloglinkcard from "../components/bloglinkcard/Bloglinkcard.jsx";
import postsdatabaseobj from "../appwrite/userpostsdatabase";
function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function getx() {
      const postsx = await postsdatabaseobj.getposts();
      setPosts(postsx.documents);
      if (postsx.documents) {
        setloading(false);
      }
    }
    getx();
  }, []);
  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }
  return (
    <>
      <div className="w-full mx-auto flex items-center  md:block justify-center">
        <div className="flex justify-center gap-2 items-center lg:justify-normal  flex-col flex-wrap md:flex-row px-2 ">
          {posts.map((post) => (
            <div key={post.$id} className="bg-purple-300 rounded-2xl   ">
              <Bloglinkcard
                $id={post.$id}
                title={post.title}
                featuredimage={post.featuredimage}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="h-14"></div>
    </>
  );
}

export default AllPosts;
