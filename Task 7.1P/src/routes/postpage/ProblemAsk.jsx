/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 01/09/2023                      */

import React, { useState } from 'react';
import QuestionsCondition from './QuestionsCondition';
import ArticleCondition from './ArticleCondition';
import './ProblemAsk.css';

function ProblemAsk() {
  const [postType, setPostType] = useState('Questions');
  const [formValidation, setFormValidation] = useState({});

  const handleChangePosting = (event) => {
    setPostType(event.target.value);
  };

  const DescText = () => {
    return postType === 'Questions'
      ? 'For post a question, the following section would be appeared.'
      : 'For post an article, the following section would be appeared.';
  };

  const FormSubmissionHandling = () => {
    // Check if all required fields are filled
    if (postType === 'Questions') {
      const { Title, Description, Tags } = formValidation;
      if (Title && Description && Tags) {
        alert('Thank you for posting.');
        window.location.reload();   // Reloads the webpage for new posts
      } else {
        alert('Please fill in all fields.');
      }
    } else if (postType === 'Articles') {
      const { Title, Abstract, Article, Tags } = formValidation;
      if (Title && Abstract && Article && Tags) {
        alert('Thank you for posting.');
        window.location.reload();
      } else {
        alert('Please fill in all fields.');
      }
    }
  };

  const handleFormValidation = (name, value) => {
    setFormValidation((prevValidation) => ({
      ...prevValidation,
      [name]: value.trim() !== '', // Check if the value is not empty
    }));
  };

  return (
    <div>
      <div className='selectPostType'>
        Select Post Type:
        <div className='radioButton'>
          <input
            type='radio'
            name='Post Type'
            value='Questions'
            checked={postType === 'Questions'}
            onChange={handleChangePosting}
          />
          Questions
        </div>
        <div>
          <input
            type='radio'
            name='Post Type'
            value='Articles'
            checked={postType === 'Articles'}
            onChange={handleChangePosting}
          />
          Articles
        </div>
      </div>
      <div className='formstart'>
        <div className='formitems'>What do you want to ask or share?</div>
      </div>
      <div className='myText'>
        <p>
          <b>
            This section is designed based on the type of the post. It could be developed by conditional rendering.{' '}
            <span style={{ color: 'red' }}>{DescText()}</span>
          </b>
        </p>
      </div>

      {postType === 'Questions' && <QuestionsCondition onInputChange={handleFormValidation} />}
      {postType === 'Articles' && <ArticleCondition onInputChange={handleFormValidation} />}

      <div className='button'>
        <button className='buttonDesign' onClick={FormSubmissionHandling}>
          Post
        </button>
      </div>
    </div>
  );
}

export default ProblemAsk;