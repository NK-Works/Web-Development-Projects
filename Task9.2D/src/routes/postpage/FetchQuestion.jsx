/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 01/10/2023                      */

import React from "react";
import { useCollapse } from "react-collapsed";
import { db } from '../../utils/firebase';
import { doc, deleteDoc } from "firebase/firestore";

// Function to refresh the page.
function refresh() {
  window.location.reload(true);
}

// Function to delete a question document.
function deleteQuestion(id) {
  const docRef = doc(db, 'questions', id);

  // Ask for confirmation before deleting.
  if (window.confirm('Are you sure you wish to delete this question?')) {
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

const FetchQuestion = (props) => {
  // Use the `useCollapse` hook to manage the expand/collapse behavior.
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <div className="showQuestions">
      <div className="expansionHeader" {...getToggleProps()}>
        {isExpanded ? (
          <div>
            {/* Delete button to delete the question. */}
            <button className="delButton" onClick={() => deleteQuestion(props.id)}> 
              Delete
            </button>
            <h2>{props.title}</h2>
          </div>
        ) : (
          <div>
            <div className="myTags">
              {props.tags}
            </div>
            <h2>{props.title}</h2>
          </div>
        )}
      </div>
      <div {...getCollapseProps()}>
        <div className="myContent">
          <p>Description: {props.description}</p>
          <p>Tags: {props.tags}</p>
          <p>Date: {props.datetime}</p>
        </div>
      </div>
    </div>
  )
}

export default FetchQuestion;
