/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 26/08/2023                      */

// Import necessary dependencies and components
import React from "react";
import './App.css'; // Import the CSS styles for the app
import IntroductoryRow from './IntroductoryRow.jsx'; // Import the IntroductoryRow component
import EmailBar from "./EmailBar"; // Import the EmailBar component
import HeadPhoto from './HeadPhoto.jsx'; // Import the HeadPhoto component
import ArticleList from "./ArticleList.jsx"; // Import the ArticleList component
import ContactUs from "./ContactUs.jsx"; // Import the ContactUs component

// Define the main App component
function App() {
  // Return JSX elements that make up the App
  return (
    <div className="App">
      <IntroductoryRow />
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
export default App;
