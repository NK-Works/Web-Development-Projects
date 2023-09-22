/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 21/09/2023                      */

import Input from "./Input"; 
import './SignupPage.css'; 
import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { createAuthUserWithEmailAndPassword, createuserdocfromAuthforMail } from './utils/firebase'; 

function Signup() {
  const navigate = useNavigate(); // Get the navigate function from React Router

  // State for form input fields
  const [contact, setContact] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { displayName, email, password, confirmPassword } = contact;
  console.log(contact);

  // State to store error message
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle form submission
  async function handleClick(event) {
    if (!displayName || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.'); // Display error message
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.'); // Display error message
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password); // Create user account with email/password
      await createuserdocfromAuthforMail(user, displayName, { password }); // Create user document in Firestore
      console.log(user);

      // Redirect to the login page after successful signup
      navigate('/login');
      // Clear error message on success
      setErrorMessage('');
    } catch (error) {
      console.log('Error in account creation', error.message);
      setErrorMessage('Error in account creation: ' + error.message); // Display error message
    }
  }

  // Function to handle input field changes
  function handlepass(event) {
    const value = event.target.value;
    const name = event.target.name;

    setContact((prevalue) => {
      return {
        ...prevalue,
        [name]: value
      }
    });
  }

  // Render the signup form
  return (
    <div className="signupPage">
      <div className="headText">
        Create a DEV@Deakin Account
      </div>
      <div className="input-fields">
        <h1>Name*</h1>
        <Input
          name='displayName'
          type='text'
          placeholder='Name'
          onChange={handlepass}
        />

        <br />
        <h2>Email*</h2>
        <Input
          name='email'
          type='email'
          placeholder='Email'
          onChange={handlepass}
        />

        <br />
        <h3>Password*</h3>
        <Input
          name='password'
          type='password'
          placeholder='Password'
          onChange={handlepass}
        />
        <br />
        <h4>Confirm Password*</h4>
        <Input
          name='confirmPassword'
          type='password'
          placeholder='Confirm Password'
          onChange={handlepass}
        />
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="mysignupButton">
        <button onClick={handleClick}>
          Signup
        </button>
      </div>
    </div>
  )
}

export default Signup; 