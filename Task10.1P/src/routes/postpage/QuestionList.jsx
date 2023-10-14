/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 01/10/2023                      */

import React, { useEffect, useState } from 'react';
import { db } from '../../utils/firebase';
import { collection, getDocs } from "firebase/firestore";
import FetchQuestion from "./FetchQuestion";
import Draggable from 'react-draggable';

const QuestionList = (props) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions from Firestore.
    getQuestions();
  }, []);

  function getQuestions() {
    // Create a reference to the 'questions' collection in Firestore.
    const questionCollectionRef = collection(db, 'questions');

    // Fetch documents from the collection.
    getDocs(questionCollectionRef)
      .then(response => {
        // Map the response documents to an array of question objects.
        const ques = response.docs.map(doc => ({
          data: doc.data(),
          id: doc.id,
        }));

        // Set the state with the fetched questions.
        setQuestions(ques);
      })
      .catch(error => console.log(error.message));
  }

  // Filter questions based on the search input provided in props.
  const filteredQuestion = questions.filter((question) => {
    var result = question.data.Title.toLowerCase().includes(props.searchQuestion.toLowerCase()) ||
      question.data.Tags.toLowerCase().includes(props.searchQuestion.toLowerCase()) ||
      question.data.DateTime.toLowerCase().includes(props.searchQuestion.toLowerCase());
    return result;
  });

  return (
    <div className="questioncard-div">
      {filteredQuestion.map(question => (
        // Make the question card draggable using 'react-draggable'.
        <Draggable
          key={question.id}
          axis="both"
          handle=".draggable-card" // Provide a handle to initiate dragging
          defaultPosition={{ x: 0, y: 0 }}
          position={null}
          grid={[25, 25]}
          scale={1}
        >
          <div className="draggable-card">
            {/* Render the question using the 'FetchQuestion' component. */}
            <FetchQuestion
              id={question.id}
              title={question.data.Title}
              description={question.data.Description}
              tags={question.data.Tags}
              datetime={question.data.DateTime}
              code={question.data.Code}
            />
          </div>
        </Draggable>
      ))}
    </div>
  );
}

export default QuestionList;
