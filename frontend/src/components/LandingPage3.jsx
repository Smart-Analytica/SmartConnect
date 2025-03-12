import React, { useState, useEffect } from 'react';
import './Landing3.css';
import doctorImage from '../assets/finback.jpg';
import ChatbotButton from './ChatbotButton3';
import VoiceAssistantButton from './VoiceAssistantButton2';

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
          <h1 className={`animated-title3 ${windowWidth < 768 ? 'mobile-title' : ''}`}>
            Smart-Fi –<br />Your Financial Wellness Buddy!
            Empowering Your Financial Well-Being
          </h1>
          <p className="subtitle">
            Gain insights into your financial health with our AI-powered Financial Wellness Bot.
          </p>
          {/* <button 
            className="btn btn-primary rounded-pill px-4 py-2 mt-3"
            onClick={handleJoinTrialClick}
          >
            Join the chat →
          </button>
          <ChatbotButton isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} /> */}

<VoiceAssistantButton />


        </div>

        {/* Right Image */}
        <div className="col-lg-6 col-md-12 text-center">
          <img src={doctorImage} alt="Financial Wellness" className="hero-image img-fluid" />
        </div>
      </div>

      {/* Info Boxes */}
      <div className="info-boxes-container3">
        <div className="info-box our-bot-helps3">
          <h3>Our Bot Helps You:</h3>
          <ul>
            <li>✅ Assess Financial Wellness – Understand your financial stability with a personalized wellness score.</li>
            <li>✅ Track Your Progress – Monitor changes in your financial well-being over time.</li>
            <li>✅ Receive Actionable Insights – Get tailored recommendations to improve your financial health.</li>
            <li>✅ Plan for the Future – Get insights to make informed financial decisions and secure long-term stability.</li>
          </ul>
        </div>

        <div className="info-box for-demo-purposes3">
          <h3>Mock Account Details:</h3>
          <ul>
            <li>📌 10001 – Good wellness score</li>
            <li>📌 10002 – Moderate wellness score</li>
            <li>📌 10003 – Low wellness score</li>
          </ul>
          <p>(Note: This is sample data. Actual user data is securely processed through our system.)</p>
          <p>Start your journey to financial wellness today!</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
