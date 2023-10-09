/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 01/10/2023                      */

import React, { useState, useRef } from 'react';
import './SharedForms.css';
import { db, storage } from "../../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { v4 } from "uuid";

function ArticleCondition() {
  const collectionRef = collection(db, "articles");
  const fileInputRef = useRef(null);

  const [inputData, setInputData] = useState({});
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Input Handler Function
  const inputHandler = (e) => {
    setInputData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  // Function to upload image to Firebase Storage
  const uploadImageToStorageOnly = async () => {
    if (file) {
      try {
        // Upload Image to Storage
        const storageRef = ref(storage, `/articles/${file.name + v4()}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
          (snapshot) => {
            // Track the upload progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error("Error:", error);
          },
          async () => {
            // Upload is complete, get image URL
            const imageLink = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("Image uploaded to Storage:", imageLink);
            alert("Image uploaded to Storage!");
            setUploadProgress(0);

            // Now, you can store the image link in Firestore
            setInputData((prevState) => ({
              ...prevState,
              image: imageLink,
            }));
          }
        );
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please select an image to upload.");
    }
  };

  // Form Submission Handler
  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      inputData.title &&
      inputData.abstract &&
      inputData.article &&
      inputData.tags &&
      inputData.image

    ) {
      try {
        // Add data to Firestore
        const docRef = await addDoc(collectionRef, {
          title: inputData.title,
          abstract: inputData.abstract,
          article: inputData.article,
          tags: inputData.tags,
          image: inputData.image, // Initialize as an empty string
        });

        console.log("Data Added to Firestore with ID: ", docRef.id);
        alert("Article Posted Successfully!");

        // Reset form fields
        setInputData({});
        setFile(null);
        fileInputRef.current.value = ''; // Reset file input
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please fill in all fields.");
      console.log("Empty fields are not allowed.");
    }
  };

  // File Handler
  const fileHandler = (e) => {
    setFile(e.target.files[0]);
  };

  // Trigger the file input when the "Browse" button is clicked
  const browseHandler = () => {
    fileInputRef.current.click();
  };

  // Helper function to get the prompt text
  const getPromptText = () => {
    if (file) {
      return "Image selected";
    } else {
      return "No image selected";
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='mainTitle'>
        Title
        <input
          type='text'
          onChange={inputHandler}
          className='givenInput'
          name='title'
          value={inputData.title || ''}
          placeholder='Enter a descriptive title'
        />
      </div>

      <div className='secTitle'>
        Add an Image:
        <div className='imageInput'>
          <input
            ref={fileInputRef}
            className='imgInput'
            onChange={fileHandler}
            id="image"
            type="file"
            style={{ display: 'none' }} // Hide the input field
          />
          <div className='progress-bar-container'>
            <div className='progress-bar' style={{ width: `${uploadProgress}%` }}>
              {`${uploadProgress.toFixed(2)}%`}
            </div>
          </div>

          <div>
            <div className='imgButton'>
              <button
                type='button'
                className='browse_upload-button'
                onClick={browseHandler}
              > Browse
              </button>
            </ div>

            <div className='imgButton'>
              <button
                type='button'
                className='browse_upload-button'
                onClick={uploadImageToStorageOnly}
              > Upload
              </button>
            </div>
          </div>
          <div className='file-prompt'>{getPromptText()}</div>
        </div>
      </div>
      <br /><br />
      <div className='secTitle'>Abstract</div>
      <textarea
        onChange={inputHandler}
        className='abstract'
        name='abstract'
        value={inputData.abstract || ''}
        placeholder='Enter a 1-paragraph abstract'
        type='text'
      />
      <div className='secTitle'>Article Text</div>
      <textarea
        onChange={inputHandler}
        className='article'
        name='article'
        value={inputData.article || ''}
        placeholder='Enter the article text'
        type='text'
      />
      <div className='secTitle'>
        Tags
        <input
          onChange={inputHandler}
          className='givenInput'
          name='tags'
          value={inputData.tags || ''}
          type='text'
          placeholder='Please add up to 3 tags to describe the article'
        />
      </div>
      <div className='button'>
        <button className='buttonDesign' type="submit">
          Post
        </button>
      </div>
    </form>
  );
}

export default ArticleCondition;
