/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 01/10/2023                      */

import React, { useState } from "react";
import { Routes, Route, Outlet, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import IntroductoryRow from './IntroductoryRow.jsx';
import PostPage from './routes/postpage/PostPage.jsx';
import Login from "./LoginPage";
import Signup from "./SignupPage";
import Home from "./routes/homepage/HomePage";
import SearchQuestion from "./routes/postpage/SearchQuestion";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === '/login' || location.pathname === '/login/signup';

  // State to track user authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Define the onLoginSuccess callback
  const onLoginSuccess = () => {
    navigate('/home');
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      {!isLoginPage && <IntroductoryRow />}
      <Routes>
        <Route path='/post' element={<PostPage />} />
        <Route
          path='/login'
          element={<Login onLoginSuccess={onLoginSuccess} />} // Pass the callback
        />
        <Route path='/login/signup' element={<Signup />} />
        {isAuthenticated ? (
          <Route path='/home' element={<Home />} /> // Only allow access to Home when isAuthenticated is true
        ) : null}
        <Route path='/question' element={<SearchQuestion />} />
        <Route path='/*' element={<Outlet />} />
      </Routes>
    </div>
  );
}

export default App;
