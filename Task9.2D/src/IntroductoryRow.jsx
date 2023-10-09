import { Link } from "react-router-dom";
import { useState } from "react"; // Import useState
import './IntroductoryRow.css';

const IntroductoryRow = ({ isAuthenticated, onLogout }) => {
  
  // State to manage the dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="rowBackground">
      <div id="top"></div>

      <div className="deakin">
        <Link to='home'>
          DEV@Deakin
        </Link>
      </div>

      <div className="searchBox">
        <input type="text" className="searchBar" placeholder="Search" />
      </div>

      <div className="buttons">
        {/* Dropdown Button */}
        <div className="dropdown">
          <button
            className="dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            onClick={toggleDropdown}
          >
            Explore
          </button>
          <div
            className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
            aria-labelledby="dropdownMenuButton"
          >
            <Link to='/home' className="dropdown-item">
              Home
            </Link>
            <Link to='/post' className="dropdown-item">
              Post
            </Link>
            <Link to='/membership' className="dropdown-item">
              Membership
            </Link>
            <Link to='/question' className="dropdown-item">
              Questions
            </Link>
          </div>
        </div>

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

export default IntroductoryRow;
