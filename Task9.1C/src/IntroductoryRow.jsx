/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 21/09/2023                      */

import { Link } from "react-router-dom"

// Import the CSS styles for this component
import './IntroductoryRow.css';

// Define a functional component called IntroductoryRow
const IntroductoryRow = ({ isAuthenticated, onLogout }) => {
  // Return JSX elements that make up the IntroductoryRow component
  return (

    <div className="rowBackground">
      {/* Empty div with the ID 'top' */}
      <div id="top"></div>

      <div className="deakin">
          <Link to='/'>
            DEV@Deakin
          </Link>
      </div>

      {/* Element with the class 'searchBox', containing an input field */}
      <div className="searchBox">
        <input type="text" className="searchBar" placeholder="Search" />
      </div>

      <div className="buttons">
      <Link to='question'>
          <button className="questionButton" value="Question">
            Questions
          </button>
        </Link>

        <Link to='post'>
          <button className="postButton" value="Post">
            Post
          </button>
        </Link>

         {/* Conditionally render "Login" or "Logout" button based on authentication status */}
         {isAuthenticated ? (
          <button className="loginoutbutton" onClick={onLogout}>
            Logout
          </button>
        ) : (
          <Link to='login'>
            <button className="loginoutbutton" value="Login">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

// Export the IntroductoryRow component as the default export
export default IntroductoryRow;
