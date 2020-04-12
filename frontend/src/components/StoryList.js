import React from "react";
import { Card } from "antd";
import "./StoryList.scss"

function StoryList({ style }) {
  return (
    <div style={style}>
      <Card title="Stories" size="small">
        Stories from people you follow will show up here.
      </Card>
    </div>
  );
};

export default StoryList;