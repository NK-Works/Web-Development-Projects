/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 26/08/2023                      */

// Import the CSS styles for this component
import "./HeadPhoto.css";

// Define a functional component called HeadPhoto
const HeadPhoto = () => {
  // Return JSX elements that make up the HeadPhoto component
  return (
    <div className="intro_area">
      <img className="head_photo" src={require('./images/deakin_uni.jpg')} alt="main_image" />
      
      {/* Display a heading with the class 'text_main' */}
      <h1 className="text_main">WELCOME TO DEAKIN</h1>
    </div>
  );
};

// Export the HeadPhoto component as the default export
export default HeadPhoto;
