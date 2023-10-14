import React, { useState, useRef } from 'react';
import './SharedForms.css';
import { db } from "../../utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown';
import 'codemirror/lib/codemirror.css'; // For Styling
import 'codemirror/mode/javascript/javascript'; // For Java Code
import 'codemirror/mode/jsx/jsx'; // Enable JSX Code

function QuestionsCondition() {
    // Define state to manage form inputs
    const [form, setForm] = useState({
        Title: '',
        Description: '',
        Code: '',
        Tags: '',
    });
    
    const [codePreview, setCodePreview] = useState('');
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
        if (!content.Title || !content.Description || !content.Tags || !content.Code) {
            alert("Please fill in all fields before posting.");
            return;
        }

        const ArticleCollRef = collection(db, 'questions');

        try {
            const docRef = await addDoc(ArticleCollRef, {
                Title: content.Title,
                Description: content.Description,
                Code: content.Code,
                Tags: content.Tags,
                DateTime: new Date().toLocaleString() + "",
            });

            console.log("Document written with ID: ", docRef.id);
            alert("Question Posted Successfully!");

            // Reset the form fields to their initial values
            setForm({
                Title: '',
                Description: '',
                Code: '',
                Tags: '',
            });
            setCodePreview('')
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error posting the question.");
        }
    };

    // Function to update the code preview when the CodeMirror input changes
    const updateCodePreview = (value) => {
        setCodePreview(value);
    };
    
    // Utilised this to remove the duplication error of the CodeMirror
    // It is caused by the new version of React i.e. React 18
    // See this link for more: https://stackoverflow.com/questions/72464452/codemirror-editor-duplicating 
    // I have resolved the error after taking help from this website
    // I also learnt that you can remove the error by simply removing the React.Strictmode from index.js
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
            <div>
            <div className='secTitle'>Describe your problem</div>
            <textarea
                onChange={onChange}
                className='problem'
                name='Description'
                value={form.Description}
                type='text'
            />     
            </div>
           
            <div className='codeTitle'> Code
                <CodeMirror
                    className='sendingCode'
                    value={form.Code}
                    ref={wrapper}
                    options={{
                        mode: 'javascript',
                        theme: 'material',
                        lineNumbers: true,
                    }}
                    onBeforeChange={(editor, data, value) => {
                        setForm((state) => ({
                            ...state,
                            Code: value, // Update the 'Code' property of the 'form' state
                        }));
                        updateCodePreview(value); // Update the code preview
                    }}
                    editorDidMount={(e) => editor.current = e}
                    editorWillUnmount={editorWillUnmount}
                />
            </div>
            <div className='secTitle'>Code Preview</div>
            {/* Trivia: To give colors to the Markdown Code Preview there is a need for supporting libraries */}
            {/* Markdown itself doesn't support code coloring. But the library for coloring was clashing with */}
            {/* React codemirror2 library so I dicided not to use them.*/}
            <div className='codePreview'>
                <ReactMarkdown children={codePreview} />  
            </div> 

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
