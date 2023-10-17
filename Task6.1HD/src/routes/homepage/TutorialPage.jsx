/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 21/09/2023                      */

// Import necessary dependencies and components
import React from "react";
import TutorialList from "./TutorialList";

// Define the main App component
function Tutorials() {
  // Return JSX elements that make up the App
  return (
    <div>
       <TutorialList
        title="Featured Tutorials"
        text="See More Tutorials" />
    </div>
  );
}

// Export the App component as the default export
export default Tutorials;
