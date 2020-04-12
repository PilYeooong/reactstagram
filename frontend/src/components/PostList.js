import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";

const apiUrl = "http://localhost:8000/api/posts/";

function PostList() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        const { data } = response;
        setPostList(data);
        console.log("loaded response :", response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      {postList.map((post) => <Post post={post} key={post.id}/>
      )}
    </div>
  );
}

export default PostList;
