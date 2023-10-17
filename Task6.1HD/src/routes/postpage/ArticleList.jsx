import React, { useEffect, useState } from 'react';
import { db } from '../../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import FetchArticle from './FetchArticle';
import Draggable from 'react-draggable';
import '../homepage/TutorialList.css'

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
   // Define state to keep track of how many articles to show
   const [articlesToShow, setArticlesToShow] = useState(4);

   // Function to show more articles when the button is clicked
   const showMoreArticles = () => {
     setArticlesToShow(prevCount => prevCount + 2);
   };

  useEffect(() => {
    // Fetch articles from Firestore.
    getArticles();
  }, []);

  function getArticles() {
    // Create a reference to the 'articles' collection in Firestore.
    const articleCollectionRef = collection(db, 'articles');

    // Fetch documents from the collection.
    getDocs(articleCollectionRef)
      .then((response) => {
        // Map the response documents to an array of article objects.
        const articlesData = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));

        // Set the state with the fetched articles.
        setArticles(articlesData);
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <div>
        <div className="article-card-div">
        {articles.sort(() => 0.5 - Math.random()).slice(0, articlesToShow).map((article) => (
            // Make the article card draggable using 'react-draggable'.
            <Draggable
            key={article.id}
            axis="both"
            handle=".draggable-card" // Provide a handle to initiate dragging
            defaultPosition={{ x: 0, y: 0 }}
            position={null}
            grid={[25, 25]}
            scale={1}
            >
            <div className="draggable-card">
                {/* Render the article using the 'FetchArticle' component. */}
                <FetchArticle
                id={article.id}
                title={article.data.title}
                abstract={article.data.abstract}
                article={article.data.article}
                tags={article.data.tags}
                image={article.data.image}
                datetime={article.data.DateTime}
                />
            </div>
            </Draggable>
        ))}
        </div>
        <div className="myButton">
            <button onClick={showMoreArticles}>See All Articles</button>
        </div>

    </div>
  );
};

export default ArticleList;
