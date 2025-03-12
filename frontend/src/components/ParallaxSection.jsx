import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

const ParallaxSection = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  return (
    <StyledParallax>
      <div className="content">
        <h1>Smart Asthma Care: Instant Guidance, Anytime</h1>
        <p>Harness the power of AI for smarter asthma care: instant advice, monitoring, and support at your fingertips.</p>
        <div className="button-group">
          <button className="btn btn-primary">Chatbot</button>
          <button className="btn btn-secondary">Admin Login</button>
        </div>
      </div>
    </StyledParallax>
  );
};

const StyledParallax = styled.div`
  height: 100vh;
  background-image: url('/background.jpg');
  background-attachment: ${props => props.isMobile ? 'scroll' : 'fixed'};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .content {
    text-align: left;
    color: #000;
    padding: 20px;
    max-width: 600px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
    margin: 0 15px;
    
    @media (max-width: 768px) {
      padding: 15px;
      text-align: center;
      max-width: 90%;
    }
    
    h1 {
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: bold;
      color: #3b4a9e;
    }
    
    p {
      font-size: clamp(1rem, 2vw, 1.25rem);
      margin-top: 20px;
      color: #4a4a4a;
    }
    
    .button-group {
      margin-top: 30px;
      display: flex;
      gap: 10px;
      
      @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
      }
      
      .btn {
        margin-right: 10px;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: clamp(0.9rem, 2vw, 1rem);
        
        @media (max-width: 480px) {
          margin-right: 0;
          margin-bottom: 10px;
          width: 100%;
          max-width: 200px;
        }
      }
      
      .btn-primary {
        background-color: #3b4a9e;
        color: white;
        border: none;
      }
      
      .btn-secondary {
        background-color: #d9e0ef;
        color: #3b4a9e;
        border: none;
      }
    }
  }
`;

export default ParallaxSection;
