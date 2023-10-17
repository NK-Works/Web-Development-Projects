import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import IntroductoryRow from './IntroductoryRow.jsx';
import PostPage from './routes/postpage/PostPage.jsx';
import Login from "./LoginPage";
import Signup from "./SignupPage";
import Home from "./routes/homepage/HomePage";
import SearchQuestion from "./routes/postpage/SearchQuestion";
import { auth, db } from './utils/firebase';
import DeakinLogin from "./DeakinLogin";
import Help from "./HelpPage"
import Tutorials from "./routes/homepage/TutorialPage";
import Plan from "./routes/subscriptionpage/PaymentPlans";
import Success from "./routes/subscriptionpage/PaymentSuccess";
import UnsubscribeSuccess from "./routes/subscriptionpage/UnsubsribeSuccess";
import { doc, getDoc } from 'firebase/firestore';
import FreeAccount from "./routes/subscriptionpage/FreeAccountMessage";
import Post from "./routes/discussionpage/PostOnDiscuss";
import Question from "./routes/discussionpage/DiscussionMain";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === '/login' || location.pathname === '/login/signup';

  // Initialize the isAuthenticated state from local storage
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [subscriptionStatus, setSubscriptionStatus] = useState('free');

  const handleLogout = async() => {
    // Get the current user
    const user = auth.currentUser;
    if (window.confirm(`Are you sure you wish to logout of ${user.email}?`)) {
      localStorage.setItem('isAuthenticated', 'false');
      await auth.signOut();
      setIsAuthenticated(false);
     
      navigate('/');
      window.location.reload(true);
    }
  }
  const onLoginSuccess = () => {
    // Set authentication state and store it in local storage
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);

    // Redirect to the home page
    navigate('/home');
  };
  // Fetch the subscription status when the user is authenticated
  useEffect(() => {
    const id = localStorage.getItem('userId');
    const userDocRef = doc(db, "user_data", id);
      getDoc(userDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.subscriptionStatus) {
              setSubscriptionStatus(userData.subscriptionStatus);
              console.log(userData.subscriptionStatus);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching subscription status:", error);
        });

  }, [isAuthenticated]);
  return (
    <div className="App">
      
        {!isLoginPage && <IntroductoryRow isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
      <Routes>
        <Route path='/login' element={<Login onLoginSuccess={onLoginSuccess} />} />
        <Route path='/login/signup' element={<Signup />} />
        
        {isAuthenticated ? (
          <>
            <Route path='/' element={<Home />} />
            {subscriptionStatus === "free" ? (
              // Render this message for users with a free subscription
              <Route path='/post' element={<FreeAccount />} />
            ) : (
              // Render the "Post" feature for users with a paid subscription
              <Route path='/post' element={<PostPage />} />
              )}
            <Route path='/home' element={<Home />} />
            <Route path='/query' element={<Post />} />
            <Route path='/discuss' element={<Question />} />
            <Route path='/question' element={<SearchQuestion />} />
            <Route path='/membership' element={<Plan />} />
            <Route path='/membership/success' element={<Success />} />
            <Route path='/unsubscribe' element={<UnsubscribeSuccess />} />
            <Route path='/help' element={<Help />} />
            <Route path='/tutorial' element={<Tutorials />} />
          </>
        ) : 
        <>
        <Route path='/' element={<DeakinLogin />} /> 
        <Route path='/home' element={<DeakinLogin />} /> 
        </>
          }
        
        <Route path='*' element={<h1>OOPS! Error 404: Content Not Available!</h1>} />
      </Routes>
    </div>
  );
}

export default App;
