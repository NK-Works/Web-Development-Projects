/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 26/08/2023                      */

// Import the CSS styles for this component
import './IntroductoryRow.css';

// Define a functional component called IntroductoryRow
const IntroductoryRow = (props) => {
  // Return JSX elements that make up the IntroductoryRow component
  return (
    <div className="rowBackground">
      {/* Empty div with the ID 'top' */}
      <div id="top"></div>
      
      <div className="deakin">
        DEV@Deakin
      </div>
      
      {/* Element with the class 'searchBox', containing an input field */}
      <div className="searchBox">
        <input type="text" className="searchBar" placeholder="Search" /> 
      </div>
      
      <div className="buttons">
        <button className="postButton" value="Post">
          Post
        </button>
        
        <button className="loginButton" value="Login">
          Login
        </button>
      </div>
    </div>
  );
};

// Export the IntroductoryRow component as the default export
export default IntroductoryRow;
