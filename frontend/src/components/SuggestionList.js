import React from "react";
import { Card } from "antd";
import "./SuggestionList.scss"
import Suggestion from "./Suggestion";

function SuggestionList({ style }) {
  return (
    <div style={style}>
      <Card title="Suggestions for you" size="small">
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
      </Card>
    </div>
  )
};

export default SuggestionList;