/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 01/10/2023                      */

import React, {useRef} from "react";
import { useCollapse } from "react-collapsed";
import { db } from '../../utils/firebase';
import { doc, deleteDoc } from "firebase/firestore";
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css'; // Codemirror styles
import 'codemirror/mode/javascript/javascript'; // Specify the language mode
import 'codemirror/theme/material.css'; // Choose a theme

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
  const codemirrorOptions = {
    theme: 'material', // Choose a theme
    lineNumbers: true,
    mode: 'javascript', // Specify the language mode
    readOnly: true, // Make it read-only for display purposes
  };

  const editor = useRef()
  const wrapper = useRef()
    
  const editorWillUnmount = () => {
    if (editor.current && editor.current.display && editor.current.display.wrapper) {
      editor.current.display.wrapper.remove();
    }
    if (wrapper.current) {
      wrapper.current.hydrated = false;
    }
  }

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
          <div className='fetchCode'> Code:
            <CodeMirror 
              className="myCodeSnippet" 
              value={props.code} 
              ref={wrapper}
              options={codemirrorOptions}
              editorDidMount={(e) => editor.current = e}
              editorWillUnmount={editorWillUnmount} 
              /> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default FetchQuestion;
