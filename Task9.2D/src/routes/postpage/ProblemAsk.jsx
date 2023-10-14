/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 01/09/2023                      */

import React, { useState } from 'react';
import QuestionsCondition from './QuestionsCondition';
import ArticleCondition from './ArticleCondition';
import './ProblemAsk.css';

function ProblemAsk() {
  const [postType, setPostType] = useState('Questions');

  const handleChangePosting = (event) => {
    setPostType(event.target.value);
  };

  const DescText = () => {
    return postType === 'Questions'
      ? 'For post a question, the following section would be appeared.'
      : 'For post an article, the following section would be appeared.';
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

      {postType === 'Questions' && <QuestionsCondition  />}
      {postType === 'Articles' && <ArticleCondition />}

    </div>
  );
}

export default ProblemAsk;