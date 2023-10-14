/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 21/09/2023                      */

import Input from "./Input"; 
import './LoginPage.css'; 
import { useState } from "react"; 
import { Link, useNavigate } from 'react-router-dom';
import { signInWithGooglePopup, createuserdocfromAuthforGoogle, signinAuthUserWithEmailAndPassword } from './utils/firebase.js'; 

function Login({ onLoginSuccess }) {
  const navigate = useNavigate(); // Get the navigate function from React Router

  // Function to handle Google login
  const userlogGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup(); // Sign in with Google
      const userDocRef = await createuserdocfromAuthforGoogle(user); // Create user document in Firestore
      console.log('User document reference:', userDocRef);
      // localStorage.setItem('userId', userDocRef);


      // Redirect to the home page after successful Google login
      onLoginSuccess();
      navigate('/home');
    } catch (error) {
      console.log('Error in Google login', error.message);
    }
  }

  // State for form input fields
  const [contact, setcontact] = useState({
    email: '',
    password: ''
  })

  // State for login error message
  const [loginError, setLoginError] = useState(null);

  const { email, password } = contact;
  console.log(contact);

  // Function to handle form submission
  async function handleClick(event) {
    try {
      const response = await signinAuthUserWithEmailAndPassword(email, password); // Sign in with email/password
      console.log(response);

      // Check if the login was successful
      if (response.user) {
        console.log('Login successful');
        setLoginError(null); // Clear any previous login error

        // Redirect to the home page after successful user login
        onLoginSuccess();
        navigate('/home');
      } else {
        console.log('Login failed');
        setLoginError('Login failed. Please check your email and password.'); // Set login error message
      }
    } catch (error) {
      console.log('Error in login', error.message);
      setLoginError('An error occurred during login. Please try again later.');
    }
  }

  // Function to handle input field changes
  function handlepass(event) {
    const value = event.target.value;
    const name = event.target.name;
    setcontact((prevalue) => {
      return {
        ...prevalue,
        [name]: value
      }
    });
  }

  // Render the login form
  return (
    <div className="loginPage">
      <div className="signupButton">
        <Link to='/login/signup'>
          <button>
            Signup
          </button>
        </Link>
      </div>

      <div className="inputHolder">
        <div className="emailInput">
          Your Email <br />
          <Input
            name='email'
            type='email'
            placeholder='Email'
            onChange={handlepass}
          />
        </div>
        <div className="passwordInput">
          Your Password <br />
          <Input
            name='password'
            type='password'
            placeholder='Password'
            onChange={handlepass}
          />
        </div>
      </div>

      {loginError && <p className="error-message">{loginError}</p>}

      <div className="myloginButton">
        <button onClick={handleClick}>
          Login
        </button>
      </div>
      <div className="googleLoginButton">
        <button onClick={userlogGoogle}>
          Login with Google
        </button>
      </div>
    </div>
  )
}

export default Login; 
