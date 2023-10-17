import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import deakinAvatar from "./assets/deakinAvatar.svg";
import user from "./assets/user.png";
import './Help.css';

function Help() {
  const theme = {
    background: "white",
    headerBgColor: "#2795a9",
    headerFontColor: "white",
    headerFontSize: "15px",
    botBubbleColor: "#2795a9",
    botFontColor: "#fff",
    userBubbleColor: "#D3D3D3",
    userFontColor: "black",
  };

  const steps = [
    {
      id: "Welcome",
      message: "Welcome to DEV@Deakin Help Bot",
      trigger: "question",
    },
    {
      id: "question",
      message: "We are here to help you",
      trigger: "help",
    },
    {
      id: "help",
      options: [
        { value: "Question", label: "Question", trigger: "Question" },
        { value: "Article", label: "Article", trigger: "Article" },
      ],
    },
    // Question Flow
    {
      id: "Question",
      message: "You have a query regarding the Question. Please enter your query",
      trigger: "questionhelp",
    },
    {
      id: "questionhelp",
      options: [
        {
          value: "YesNotification",
          label: "Will people get notified if I post a question?",
          trigger: "first",
        },
        {
          value: "ChangeMind",
          label: "What if I change my mind about the post I have made?",
          trigger: "second",
        },
        {
          value: "RandomQuestion",
          label: "Can I ask random questions?",
          trigger: "third",
        },
        { value: "BackToHelp", label: "Back to Help", trigger: "help" },
      ],
    },
    {
      id: "first",
      message: "Yes. Other users will get notified if you post a new question.",
      trigger: "questionhelp",
    },
    {
      id: "second",
      message: "You can always delete the post, and it will be permanently deleted. Don't worry about it.",
      trigger: "questionhelp",
    },
    {
      id: "third",
      message: "No, IT and job-related questions only, please.",
      trigger: "questionhelp",
    },
    // Article Flow
    {
      id: "Article",
      message: "What do you wish to know about?",
      trigger: "articlehelp",
    },
    {
      id: "articlehelp",
      options: [
        {
          value: "KindOfArticle",
          label: "What kind of article can I post?",
          trigger: "firstarticle",
        },
        {
          value: "FeedbackOnArticles",
          label: "Can I get feedback on my articles?",
          trigger: "secondarticle",
        },
        {
          value: "NoticeMyArticles",
          label: "What if I want people to notice my articles?",
          trigger: "thirdarticle",
        },
        { value: "BackToHelp", label: "Back to Help", trigger: "help" },
      ],
    },
    {
      id: "firstarticle",
      message: "Of course, IT-related articles.",
      trigger: "articlehelp",
    },
    {
      id: "secondarticle",
      message: "Indeed, we have a comment section under your posting.",
      trigger: "articlehelp",
    },
    {
      id: "thirdarticle",
      message: "Other users will get notified if you post a new article.",
      trigger: "articlehelp",
    },
  ];

  return (
     <div className="help-container">
      <div className="help-content">
        <ThemeProvider theme={theme}>
          <ChatBot
            steps={steps}
            botAvatar={deakinAvatar}
            userAvatar={user}
          />
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Help;
