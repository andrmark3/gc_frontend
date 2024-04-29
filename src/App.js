import './App.css';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserLoginPage from './containers/UserLoginContainer/UserLoginPage';
import UserEditPage from './containers/UserEditContainer/UserEditPage';
import UserRegistrationPage from './containers/UserRegistrationContainer/UserRegistrationPage';
import EventPage from './containers/EventContainer/EventPage';

import SideBar from './components/SideBar/SideBar';
import { eventEmitter } from './services/axiosInterceptor';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginUserData = async (userData) => {
    sessionStorage.setItem('userData', JSON.stringify(userData));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    sessionStorage.removeItem('userData');
    setIsLoggedIn(false);
  };


  useEffect(() => {
    // Define the function to check logged in status
    const checkLoggedIn = () => {
      const token = Cookies.get('token');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    // Call the function after the initial render
    checkLoggedIn();

    // Listen for 'logout' event and trigger handleLogout
    const logoutListener = () => {
      handleLogout();
    };
    eventEmitter.on('logout', logoutListener);

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      eventEmitter.off('logout', logoutListener);
    };
  }, []); // Empty dependency array ensures this runs only once after initial render


  return (
    <Router>
      <div className="main">
        <SideBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <div className="content">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/events" /> : <Navigate to="/login" />} />
            <Route path="/login" element={<UserLoginPage onLogin={handleLoginUserData} />} />
            <Route path="/signup" element={<UserRegistrationPage onLogin={handleLoginUserData} />} />
            <Route path="/profile" element={<UserEditPage />} />
            <Route path="/events" element={isLoggedIn ? <EventPage /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
