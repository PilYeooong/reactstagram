import React, { useState } from "react";
import { Input, Button } from "antd";
import { useAppContext } from "store";
import { axiosInstance, useAxios } from "utils/api";
import Comment from "./Comment";

function CommentList({ post }) {
  const {
    store: { jwtToken },
  } = useAppContext();

  const [commentContent, setCommentContent] = useState("");

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: commentList }, refetch] = useAxios({
    url: `/api/posts/${post.id}/comments/`,
    headers,
  });

  const handleCommentSave = async () => {
    const apiUrl = `/api/posts/${post.id}/comments/`;
    try{
      const response = await axiosInstance.post(apiUrl, { message: commentContent }, { headers });
      setCommentContent("");
      refetch();
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <div style={{ paddingTop: "1em" }}>
      {commentList && commentList.map(comment => 
        <Comment key={comment.id} comment={comment} />
      )}
      <Input.TextArea
        style={{ marginBottom: "0.5em" }}
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <Button block type="primary" disabled={commentContent.length === 0} onClick={handleCommentSave} >
        댓글쓰기
      </Button>
    </div>
  );
}

export default CommentList;
