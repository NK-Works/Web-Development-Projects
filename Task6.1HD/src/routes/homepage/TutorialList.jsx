/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 26/08/2023                      */

// Import necessary dependencies
import React, { useState } from 'react';
import SingleCard from "./SingleCard"; // Import the SingleCard component
import CardData from "./CardData"; // Import the array of card data
import './TutorialList.css'; // Import the CSS styles for this component
// Define a function to render a SingleCard component for each article
function CardComponent(article) {
  return (
    <SingleCard
      key={article.key}
      image={article.image}
      name={article.name}
      description={article.description}
      ratings={article.ratings}
      first_name={article.first_name}
      link={article.link}
    />
  );
}

// Define the ArticleList component
function TutorialList(props) {
  // Define state to keep track of how many articles to show
  const [articlesToShow, setArticlesToShow] = useState(3);

  // Function to show more articles when the button is clicked
  const showMoreArticles = () => {
    setArticlesToShow(prevCount => prevCount + 3);
  };

  const showButton = articlesToShow;

  // Return JSX elements that make up the ArticleList component
  return (
    <div className="myArticles">
      {/* Display the title */}
      <div className='myHeader'>
        <h1>{props.title}</h1>
      </div>
      
      <div className="myCollections">
        {CardData.sort(() => 0.5 - Math.random()).slice(0, articlesToShow).map(CardComponent)}
        
        {showButton && (
          <div className="myButton">
            <button onClick={showMoreArticles}>{props.text}</button>
          </div>
        )}
      </div>
    </div>
  );
}

// Export the ArticleList component as the default export
export default TutorialList;
