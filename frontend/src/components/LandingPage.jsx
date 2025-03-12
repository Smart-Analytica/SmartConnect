import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import doctorImage from '../assets/doctor.png';
import VoiceAssistantButton from './VoiceAssistantButton';

const LandingPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="landing-page container-fluid">
      <div className="row align-items-center">
        {/* Left Content */}
        <div className="col-lg-6 col-md-12 content">
          <h1 className={`animated-title ${windowWidth < 768 ? 'mobile-title' : ''}`}>
            Smart Care:<br />Providing Instant Guidance and Support for COVID-19 and More, Anytime and Anywhere
          </h1>
          <p className="subtitle">
            Harness the power of AI for smarter care instant advice, monitoring, and support at your fingertips.
          </p>
          <VoiceAssistantButton />
        </div>

        {/* Right Image */}
        <div className="col-lg-6 col-md-12 text-center">
          <img src={doctorImage} alt="Doctor" className="hero-image img-fluid" />
        </div>
      </div>
      
      {/* Info Boxes */}
      <div className="info-boxes-container">
        <div className="info-box our-bot-helps">
          <h3>Our Bot Helps You:</h3>
          <ul>
            <li>✅ Symptom Assessment – Get real-time guidance on COVID-19 symptoms and severity.</li>
            <li>✅ Vaccination Updates – Stay informed about vaccination schedules, availability, and registration.</li>
            <li>✅ Nearby Healthcare Facilities – Find hospitals, testing centers, and pharmacies near you.</li>
            <li>✅ Health Monitoring – Track your health status and receive personalized care tips.</li>
            <li>✅ Mental Health Support – Access stress relief tips and connect with mental health professionals for emotional well-being.</li>
          </ul>
        </div>

        <div className="info-box for-demo-purposes">
          <h3>COVID-19 Care Essentials:</h3>
          <ul>
            <li>📌 Rest and hydration – Get plenty of rest and drink fluids like water, herbal teas, and clear broths.</li>
            <li>📌 Steam inhalation – Inhale steam with eucalyptus or mint to relieve nasal congestion.</li>
            <li>📌 Saltwater gargle – Gargle with warm salt water to soothe a sore throat.</li>
            <li>📌 Vitamin C and Zinc – Boost immunity with fruits rich in Vitamin C (like oranges) and zinc supplements.</li>
          </ul>
          <p>Get instant healthcare guidance with Smart Care – Just speak, and we'll handle the rest!</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
