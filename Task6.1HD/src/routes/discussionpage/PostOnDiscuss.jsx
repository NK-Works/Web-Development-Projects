import React from "react";
import { useState } from "react";
import Question from "./DiscussionMain";
import "./PostonDiscuss.css"

function Post() {
  const [activeTab, setActiveTab] = useState("postThought");

  return (
    <div className="yourShare">
  <h2>Share Your Queries</h2>
  <div className="query">Write your query below!</div>
  <br/>
  {activeTab === "postThought" && <Question />}
</div>

  );
}

export default Post;
