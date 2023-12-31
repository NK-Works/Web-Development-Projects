import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import IntroductoryRow from './IntroductoryRow.jsx';
import PostPage from './routes/postpage/PostPage.jsx';
import Login from "./LoginPage";
import Signup from "./SignupPage";
import Home from "./routes/homepage/HomePage";
import SearchQuestion from "./routes/postpage/SearchQuestion";
import { auth } from './utils/firebase';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === '/login' || location.pathname === '/login/signup';

  // Initialize the isAuthenticated state from local storage
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  const handleLogout = async() => {
    const user = auth.currentUser;
    if (window.confirm(`Are you sure you wish to logout of ${user.email}?`)) {
      // Clear authentication state and local storage
      localStorage.setItem('isAuthenticated', 'false');
      await auth.signOut();
      setIsAuthenticated(false);
      // Clear the isAuthenticated state in localStorage
      localStorage.removeItem('isAuthenticated');
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

  return (
    <div className="App">
      {!isLoginPage && <IntroductoryRow isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
      <Routes>
        <Route path='/login' element={<Login onLoginSuccess={onLoginSuccess} />} />
        <Route path='/login/signup' element={<Signup />} />
        
        {/* Protected routes */}
        {isAuthenticated ? (
          <>
            <Route path='/' element={<Home />} /> {/* Main page */}
            <Route path='/post' element={<PostPage />} />
            <Route path='/home' element={<Home />} />
            <Route path='/question' element={<SearchQuestion />} />
          </>
        ) : null}
        
        {/* Catch-all route */}
         <Route path='*' element={<h1>OOPS! Error 404: Content Not Available!</h1>} />
      </Routes>
    </div>
  );
}

export default App;
