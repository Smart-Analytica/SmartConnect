import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const VoiceAssistantButton = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/voice-assistant');
  };

  return (
    <ButtonContainer>
      <button className="voice-assistant-btn" onClick={handleClick}>
        Voice Assistant →
      </button>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  
  @media (max-width: 768px) {
    justify-content: center;
    margin-right: 0;
  }
  
  .voice-assistant-btn {
    background-color:rgba(67, 118, 127, 0.66);
    color: #0F1B11;
    border: none;
    padding: 8px 25px;
    border-radius: 30px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: #3c3c3c;
      color: white;
    }
  }
`;

export default VoiceAssistantButton;
