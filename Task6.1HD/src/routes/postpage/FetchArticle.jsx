import React from "react";
import { useCollapse } from "react-collapsed";
import { db } from '../../utils/firebase';
import { doc, deleteDoc } from "firebase/firestore";

// Function to refresh the page.
function refresh() {
  window.location.reload(true);
}

// Function to delete an article document.
function deleteArticle(id) {
  const docRef = doc(db, 'articles', id);

  // Ask for confirmation before deleting.
  if (window.confirm('Are you sure you wish to delete this article?')) {
    deleteDoc(docRef)
      .then(() => {
        console.log('Document ' + id + ' deleted');
        alert('Document Deleted');
        refresh(); // Refresh the page to reflect the changes.
      })
      .catch(error => {
        console.log(error.message);
      });
  } else {
    return; // Cancel deletion if the user declines.
  }
}

const FetchArticle = (props) => {
  // Use the `useCollapse` hook to manage the expand/collapse behavior.
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <div className="showArticles">
      <div className="expansionHeader" {...getToggleProps()}>
        {isExpanded ? (
          <div style={{ display: 'block', margin: '0 auto'}}>
            {/* Delete button to delete the article. */}
            <button className="delButton" onClick={() => deleteArticle(props.id)}> 
              Delete
            </button>
            <h2>{props.title}</h2>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', justifyContent:'center'}}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}> 
            {/* Display the image at the top */}
            <img src={props.image} alt="Article_Image" width="200" height="170" />
            <div className="myAbstracts">
              {props.abstract}
            </div>
            </div>
            <div className="myTags">
              {props.tags}
            </div>
            <h2>{props.title}</h2>
          </div>
        )}
      </div>

      <div {...getCollapseProps()}>
        <div className="myContent">
          {/* Display the image at the top */}
          <img src={props.image} alt="Article_Image" width="200" height="170" />
          <p>Title: {props.title}</p>
          <p>Abstract: {props.abstract}</p>
          <p>Article: {props.article}</p>
          <p>Tags: {props.tags}</p>
          {/* Render other article details as needed */}
          <p>Date: {props.datetime}</p>
        </div>
      </div>
    </div>
  )
}

export default FetchArticle;
