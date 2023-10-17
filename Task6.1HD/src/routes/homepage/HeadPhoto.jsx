/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 26/08/2023                      */

import { useState, useEffect } from 'react';
// Import the CSS styles for this component
import "./HeadPhoto.css";
import deakinUniImage from './images/deakin_uni.jpg';
import deakin2Image from './images/deakin2.jpg';
import deakin3Image from './images/deakin3.png';


// Define a functional component called HeadPhoto
const HeadPhoto = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    deakinUniImage,
    deakin2Image,
    deakin3Image,
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the index of the next image
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(interval);
    };
  }, []);
  
  // Return JSX elements that make up the HeadPhoto component
  return (
    <div className="intro_area">
    <img
      className="head_photo"
      src={images[currentIndex]}
      alt={`Image ${currentIndex + 1}`}
    />
    {/* Display a heading with the class 'text_main' */}
    <h1 className="text_main">WELCOME TO DEAKIN</h1>
  </div>
  );
};

// Export the HeadPhoto component as the default export
export default HeadPhoto;
