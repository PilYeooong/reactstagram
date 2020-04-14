import React from "react";
import { Avatar, Card } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

function Post({ post, handleLike }) {
  const { author, photo, caption, location, tag_set, is_like } = post;
  const { username, avatar_url } = author;
  return (
    <div>
      <Card
        hoverable
        cover={<img src={photo} alt={caption} />}
        actions={[
          is_like ? (
            <HeartFilled onClick={() => handleLike({ post, isLike: false })} />
          ) : (
            <HeartOutlined onClick={() => handleLike({ post, isLike: true })} />
          ),
        ]}
        style={{ marginBottom: "1rem" }}
      >
        <Card.Meta
          avatar={
            <Avatar
              size="large"
              icon={
                <img
                  src={`http://localhost:8000` + avatar_url}
                  alt={username}
                />
              }
            />
          }
          title={location}
          description={caption}
        />
      </Card>
      {/* <img src={photo} alt={caption} style={{ width: "100px" }} />
      {caption}, {location} */}
    </div>
  );
}

export default Post;
