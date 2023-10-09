/* This code is made by Anneshu Nag, Student ID- 2210994760 */
/*                     Dated- 01/10/2023                    */

import React, { useState } from 'react';
import './SharedForms.css';
import { db } from "../../utils/firebase";
import { addDoc, collection } from "firebase/firestore";

function QuestionsCondition() {
    // Define state to manage form inputs
    const [form, setForm] = useState({
        Title: '',
        Description: '',
        Tags: '',
    });

    // Handle input changes and update form state
    const onChange = (e) => {
        const { value, name } = e.target;

        setForm((state) => ({
            ...state,
            [name]: value,
        }));
    };

    const handleUpload = async (content) => {
        // Check if any of the form fields are empty
        if (!content.Title || !content.Description || !content.Tags) {
            alert("Please fill in all fields before posting.");
            return;
        }

        const ArticleCollRef = collection(db, 'questions');

        try {
            const docRef = await addDoc(ArticleCollRef, {
                Title: content.Title,
                Description: content.Description,
                Tags: content.Tags,
                DateTime: new Date().toLocaleString() + "",
            });

            console.log("Document written with ID: ", docRef.id);
            alert("Question Posted Successfully!");

            // Reset the form fields to their initial values
            setForm({
                Title: '',
                Description: '',
                Tags: '',
            });
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error posting the question.");
        }
    };

    return (
        <form>
            <div className='mainTitle'>
                Title
                <input
                    type='text'
                    onChange={onChange}
                    className='givenInput'
                    name='Title'
                    value={form.Title}
                    placeholder='Start your question with how, what, why, etc.'
                />
            </div>
            <div className='secTitle'>Describe your problem</div>
            <textarea
                onChange={onChange}
                className='problem'
                name='Description'
                value={form.Description}
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
                    placeholder='Please add up to 3 tags to describe what your question is about e.g., Java'
                />
            </div>
            <div className='button'>
                <button className='buttonDesign' onClick={(e) => { e.preventDefault(); handleUpload(form); }}>
                    Post
                </button>
            </div>
        </form>
    );
}

export default QuestionsCondition;
