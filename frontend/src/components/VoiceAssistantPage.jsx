import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import './Landing2.css';
import { useLocation } from 'react-router-dom';
import assistantVideo from '../assets/assistant.mp4';

const VoiceAssistantPage = () => {
  const location = useLocation();
  const buttonContainerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/voice-assistant') return;

    const assistantId = 'xxxxx-xxx';
    const apiKey = 'xxxx-xxxx';

    const buttonConfig = {
      position: 'bottom-right',
      color: '#4f95aa',
      icon: 'microphone',
    };

    // Remove any existing buttons to prevent duplicates
    document.querySelectorAll('.vapi-ai-button').forEach((btn) => {
      btn.parentNode?.removeChild(btn);
    });

    // Remove existing script (if any)
    const existingScript = document.querySelector(
      'script[src="https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js"]'
    );
    if (existingScript) {
      existingScript.parentNode.removeChild(existingScript);
    }

    // Load script only when on the correct page
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.vapiSDK && buttonContainerRef.current) {
        window.vapiSDK.run({
          apiKey,
          assistant: assistantId,
          config: buttonConfig,
          container: buttonContainerRef.current,
        });
    
        // Use MutationObserver to detect when the button is added to the DOM
        const observer = new MutationObserver(() => {
          const button = document.querySelector('.vapi-ai-button');
          if (button) {
            console.log('Button found!');
            button.addEventListener('click', () => {
              console.log('Microphone button clicked!');
              alert('Microphone button clicked!');
            });
            observer.disconnect(); // Stop observing after finding the button
          }
        });
    
        observer.observe(document.body, { childList: true, subtree: true });
      }
    };
    
    document.head.appendChild(script);

    // Cleanup on unmount or route change
    return () => {
      // Remove script
      const loadedScript = document.querySelector(
        'script[src="https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js"]'
      );
      if (loadedScript) {
        loadedScript.parentNode.removeChild(loadedScript);
      }

      // Remove buttons directly from DOM
      document.querySelectorAll('.vapi-ai-button').forEach((btn) => {
        btn.parentNode?.removeChild(btn);
      });

      // Clean up SDK state
      if (window.vapiSDK) {
        delete window.vapiSDK;
      }
    };
  }, [location.pathname]); // Depend on the route
  
  return (
    <PageContainer>
      <Header style={{ marginTop: windowWidth < 768 ? '40px' : '80px' }}>
        <h1 style={{ fontSize: windowWidth < 768 ? '20px' : '24px' }}>Smart Care Assistant</h1>
      </Header>

      <div 
        className="info-box for-demo-purposesvoice" 
        style={{
          position: 'relative',
          width: '100%',
          height: windowWidth < 768 ? '40vh' : '60vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'translate(-50%, -50%)',
            zIndex: '1',
          }}
        >
          <source src={assistantVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div ref={buttonContainerRef}></div>
      
      <Footer>
        <p>Experience the future of healthcare with our AI voice assistant.</p>
      </Footer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  background-color: rgba(121, 176, 188, 0);
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    height: auto;
    min-height: 100vh;
  }
`;

const Header = styled.header`
  width: 100%;
  text-align: center;

  h1 {
    font-weight: bold;
    color: rgb(43, 59, 48);
  }
`;

const Footer = styled.footer`
  margin-bottom: 20px;
  width: 100%;
  text-align: center;

  p {
    font-size: 14px;
    color: #6b6b6b;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 10px;
    
    p {
      font-size: 12px;
    }
  }
`;

export default VoiceAssistantPage;
