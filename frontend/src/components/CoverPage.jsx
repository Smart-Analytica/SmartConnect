import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CoverPage.css';
import Card from './Card';
import { useMediaQuery } from 'react-responsive';
import chatIcon from '../assets/chatIcon.png';

const CoverPage = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="cover-page">
      <div className="cover-content" style={{ width: isMobile ? '90%' : '80%' }}>
        <h1 className="cover-title">Welcome to Smart Labs</h1>
        <p className="cover-subtitle">Select an option below to continue:</p>
        
        {/* Card Container - Responsive layout */}
        <div className={`card-container ${isMobile ? 'mobile-layout' : ''}`}>

        <div onClick={() => navigate('/HealthAssistant')}>
          <Card title="Health Assistant" />
        </div>  

        <div onClick={() => navigate('/TelecomSupport')}>
          <Card title="Telecom Support" />
        </div>   

        <div onClick={() => navigate('/FinancialAdvisor')}>  
          <Card title="Financial Advisor" />
        </div>   
        </div>
      </div>
    </div>
  );
};

export default CoverPage;





