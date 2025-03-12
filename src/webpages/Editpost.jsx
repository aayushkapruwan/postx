import { useParams } from "react-router-dom";
import Postform from "../components/postform/Postform.jsx";
import React, { useEffect, useState } from "react";
import postsdatabaseobj from "../appwrite/userpostsdatabase.js";

function Editpost() {
  const [pstdata, setpstdata] = useState(null);
  const { postid } = useParams();

  useEffect(() => {
    async function fetchpostdata() {
      const data = await postsdatabaseobj.getpost(postid);
      setpstdata(data);
    }

    if (postid) {
      fetchpostdata();
    }
  }, [postid]);

  if (!pstdata) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Postform post={pstdata} />
    </div>
  );
}

export default Editpost;
