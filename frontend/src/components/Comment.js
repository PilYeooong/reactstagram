import React from "react";
import { Comment as AntdComment, Tooltip, Avatar } from "antd";
import moment from "moment";

export default function Comment({ comment }) {
  const { author: { username, name, avatar_url }, message, created_at } = comment;
  return (
    <AntdComment
      author={name.length === 0 ? username : name}
      avatar={
        <Avatar
          src={avatar_url}
          alt={username}
        />
      }
      content={
        <p>
          {message}
        </p>
      }
      datetime={
        <Tooltip title={moment().format(created_at)}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    ></AntdComment>
  );
}
