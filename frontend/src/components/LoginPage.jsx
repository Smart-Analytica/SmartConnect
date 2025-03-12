import React from 'react';
import './LoginPage.css';
import logo from '../assets/logo.png';
import doctorsImage from '../assets/logindoc.png';
import pillsImage from '../assets/pills.png';
import clipboardImage from '../assets/clipboard.png';
import boardImage from '../assets/board.png';
import { useMediaQuery } from 'react-responsive';

const LoginPage = ({ setShowLogin }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  return (
    <div className="login-container">
      <div className="login-header">
        <h1>SMART LABS</h1>
        <img src={logo} alt="Smart Labs Logo" className="smart-labs-logo" />
      </div>
      
      <div className="login-form-container">
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="form-control" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control" placeholder="Enter your password" />
          </div>
          <div className="login-buttons">
            <button type="button" className="back-btn" onClick={() => setShowLogin(false)}>
              Back
            </button>
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
        </form>
      </div>
      
      {!isMobile && (
        <div className="login-background">
          <img src={doctorsImage} alt="Doctors" className="doctors-image" />
        </div>
      )}
      
      {!isMobile && (
        <div className="decorative-elements">
          <img src={pillsImage} alt="Pills" className="decorative pills-image" />
          <img src={clipboardImage} alt="Clipboard" className="decorative clipboard-image" />
          <img src={boardImage} alt="Board" className="decorative board-image" />
        </div>
      )}
    </div>
  );
};

export default LoginPage;
