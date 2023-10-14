/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 21/09/2023                      */

// Import necessary dependencies and components
import React from "react";
import HeadPhoto from './HeadPhoto.jsx'; // Import the HeadPhoto component
import ArticleList from "./ArticleList.jsx"; // Import the ArticleList component
import ContactUs from "./ContactUs.jsx"; // Import the ContactUs component
import EmailBar from "./EmailBar.jsx"

// Define the main App component
function Home() {
  // Return JSX elements that make up the App
  return (
    <div>
      <HeadPhoto />
      <ArticleList
        title="Featured Articles"
        text="See all articles" />
      <ArticleList
        title="Featured Tutorials"
        text="See all tutorials" />
      <EmailBar />
      <ContactUs />
    </div>
  );
}

// Export the App component as the default export
export default Home;
