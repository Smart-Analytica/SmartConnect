import React, { useState, useEffect } from 'react';
import './Landing2.css';
import doctorImage from '../assets/telback.jpg';
import ChatbotButton from './ChatbotButton2';

const LandingPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleJoinTrialClick = () => {
    setIsChatOpen(true);
  };
  
  return (
    <div className="landing-page container-fluid">
      <div className="row align-items-center">
        {/* Left Content */}
        <div className="col-lg-6 col-md-12 content">
          <h1 className={`animated-title2 ${windowWidth < 768 ? 'mobile-title' : ''}`}>
            Smart Connect – <br />Smart Telecom Assistance
          </h1>
          <p className="subtitle">
          Enhancing Customer Experience with AI-Driven Conversations.
          </p>
          <button 
            className="btn btn-primary rounded-pill px-4 py-2 mt-3"
            onClick={handleJoinTrialClick}
          >
            Join the chat →
          </button>
          <ChatbotButton isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
        </div>

        {/* Right Image */}
        <div className="col-lg-6 col-md-12 text-center">
          <img src={doctorImage} alt="Telecom" className="hero-image img-fluid" />
        </div>
      </div>
      
      {/* Info Boxes */}
      <div className="info-boxes-container2">
        <div className="info-box our-bot-helps2">
          <h3>Our Bot Helps You:</h3>
          <ul>
            <li>▪️ Track Bill Payments – Get real-time updates on your payment status.</li>
            <li>▪️ Follow Up on Overdue Bills – Receive reminders and assistance with pending payments.</li>
            <li>▪️ Service Status Updates – Check if your services are active, suspended, or require updates.</li>
            <li>▪️ Resolve Billing Disputes – Raise and track disputes seamlessly.</li>
          </ul>
        </div>

        <div className="info-box for-demo-purposes2">
          <h3>Mock Customer IDs:</h3>
          <ul>
            <li> ▪️ 12345 – "John Doe"</li>
            <li> ▪️ 11223 – "David Smith"</li>
            <li> ▪️ 67890 – "Sarah Johnson"</li>
          </ul>
          <p>Experience hassle-free billing management with our AI bot today!</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
