import React from "react";
import { Button } from "antd";
import PostList from "components/PostList";
import AppLayout from "components/AppLayout";
import StoryList from "components/StoryList";
import SuggestionList from "components/SuggestionList";
import { useHistory } from "react-router-dom";


function Home() {
  const history = useHistory();
  const handleClick = () => {
    history.push("/post/new");
  };
  const sidebar = (
    <>
      <Button type="primary" block style={{ marginBottom: "1rem" }} onClick={handleClick}>새 포스팅 쓰기</Button>
      <StoryList style={{ marginBottom: "1rem" }} />
      <SuggestionList style={{ marginBottom: "1rem" }} />
    </>
  );

  return (
    <AppLayout sidebar={sidebar}>
      <PostList />
    </AppLayout>
  )
};

export default Home;