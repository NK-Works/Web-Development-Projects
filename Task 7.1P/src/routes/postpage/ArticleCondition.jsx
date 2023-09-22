/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 01/09/2023                      */

import React, { useState } from 'react';
import './SharedForms.css';

function ArticleCondition({ onInputChange }) {
  // Define state to manage form inputs
  const [form, setForm] = useState({
    Title: '',
    Abstract: '',
    Article: '',
    Tags: '',
  });

  // Handle input changes and update form state
  const onChange = (e) => {
    const { value, name } = e.target;

    setForm((state) => ({
      ...state,
      [name]: value,
    }));

    // Notify the parent component of input changes
    onInputChange(name, value);
  };

  return (
    <div>
      <div className='mainTitle'>
        Title
        <input
          type='text'
          onChange={onChange}
          className='givenInput'
          name='Title'
          value={form.Title}
          placeholder='Enter a descriptive title'
        />
      </div>
      <div className='secTitle'>Abstract</div>
      <textarea
        onChange={onChange}
        className='abstract'
        name='Abstract'
        value={form.Abstract}
        placeholder='Enter a 1-paragraph abstract'
        type='text'
      />
      <div className='secTitle'>Article Text</div>
      <textarea
        onChange={onChange}
        className='article'
        name='Article'
        value={form.Article}
        placeholder='Enter the article text'
        type='text'
      />
      <div className='secTitle'>
        Tags
        <input
          onChange={onChange}
          className='givenInput'
          name='Tags'
          value={form.Tags}
          type='text'
          placeholder='Please add up to 3 tags to describe the article'
        />
      </div>
    </div>
  );
}

export default ArticleCondition;
