import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { lexRuntime } from '../aws-config';
import chatIcon from '../assets/chatIcon.png';
import closeIcon from '../assets/closeIcon.png';
import { useMediaQuery } from 'react-responsive';

const ChatbotButton = ({ isChatOpen, setIsChatOpen }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(Date.now().toString());
  const [language, setLanguage] = useState('es_US');
  const messagesEndRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  const toggleChat = async () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      resetChat();
    }
  };

  const sendMessageToLex = async (text = input, addToMessages = true) => {
    if (!text.trim()) return;
    if (addToMessages) {
      setMessages((prev) => [...prev, { sender: 'user', text }]);
    }

    const params = {
      botId: '5OTO1C7NCO',
      botAliasId: 'J0DOF33DTK',
      localeId: language,
      sessionId,
      text,
    };

    setInput('');
    try {
      const response = await lexRuntime.recognizeText(params).promise();
      const botMessages = response.messages
        .map((msg) => {
          if (msg.contentType === 'PlainText') {
            return { sender: 'bot', text: msg.content };
          } else if (msg.contentType === 'ImageResponseCard') {
            return {
              sender: 'bot',
              text: msg.imageResponseCard.title,
              buttons: msg.imageResponseCard.buttons.map((btn) => ({
                text: btn.text,
                value: btn.value,
              })),
            };
          }
          return null;
        })
        .filter(Boolean);

      if (!botMessages.length) {
        botMessages.push({ 
          sender: 'bot', 
          text: language === 'en_US' ? "I didn't understand that." : "No entendí eso." 
        });
      }

      setMessages((prev) => [...prev, ...botMessages]);
    } catch (error) {
      console.error('Error with Lex:', error);
      setMessages((prev) => [...prev, { 
        sender: 'bot', 
        text: language === 'en_US' ? "Something went wrong!" : "¡Algo salió mal!" 
      }]);
    }
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    resetChat(newLanguage);
  };

  const resetChat = async (newLanguage = language) => {
    setMessages([]);
    setSessionId(Date.now().toString());
    await sendMessageToLex(newLanguage === 'en_US' ? "Hello" : "Hola", false);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <StyledWrapper>
      <FloatingButton 
        onClick={toggleChat} 
        style={{ 
          bottom: isMobile ? '20px' : '30px', 
          right: isMobile ? '10px' : '20px',
          width: isMobile ? '45px' : '50px',
          height: isMobile ? '45px' : '50px'
        }}
      >
        <ChatIcon>
          <img 
            src={isChatOpen ? closeIcon : chatIcon} 
            alt={isChatOpen ? "Close chat" : "Open chat"} 
            className="icon-image" 
            style={{ width: isMobile ? '24px' : '28px', height: isMobile ? '24px' : '28px' }}
          />
        </ChatIcon>
      </FloatingButton>

      {isChatOpen && (
        <ChatWindow 
          style={{
            width: isMobile ? '90%' : isTablet ? '70%' : '500px',
            height: isMobile ? '70vh' : '450px',
            right: isMobile ? '5%' : '20px',
            bottom: isMobile ? '75px' : '80px'
          }}
        >
          <ChatHeader>
            <LanguageDropdown onChange={handleLanguageChange} value={language}>
              <option value="es_US">Español</option>
              <option value="en_US">English</option>
            </LanguageDropdown>
            <FloatingButton 
              onClick={toggleChat} 
              style={{ 
                position: 'static', 
                boxShadow: 'none', 
                width: isMobile ? '30px' : '40px',
                height: isMobile ? '30px' : '40px'
              }}
            >
              <ChatIcon>
                <img 
                  src={closeIcon} 
                  alt="Close chat" 
                  className="icon-image" 
                  style={{ width: isMobile ? '18px' : '22px', height: isMobile ? '18px' : '22px' }}
                />
              </ChatIcon>
            </FloatingButton>
          </ChatHeader>

          <ChatMessages>
            {messages.map((msg, index) => (
              <Message key={index} sender={msg.sender}>
                {msg.text && <MessageBubble sender={msg.sender}>{msg.text}</MessageBubble>}
                {msg.buttons && (
                  <ButtonContainer>
                    {msg.buttons.map((button, btnIndex) => (
                      <BotButton
                        key={btnIndex}
                        onClick={() => sendMessageToLex(button.value)}
                        style={{ fontSize: isMobile ? '12px' : '14px' }}
                      >
                        {button.text}
                      </BotButton>
                    ))}
                  </ButtonContainer>
                )}
              </Message>
            ))}
            <div ref={messagesEndRef} />
          </ChatMessages>

          <ChatInput>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessageToLex()}
              placeholder={language === 'en_US' ? "Reply..." : "Responder..."}
              style={{ fontSize: isMobile ? '14px' : '16px' }}
            />
            <button 
              onClick={() => sendMessageToLex()}
              style={{ fontSize: isMobile ? '14px' : '16px' }}
            >
              {language === 'en_US' ? "Send" : "Enviar"}
            </button>
          </ChatInput>
        </ChatWindow>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
`;

const FloatingButton = styled.button`
  position: fixed;
  border-radius: 50%;
  background: #4f95aa;
  border: none;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.57);
  transition: background 0.3s ease;
  
  &:hover {
    background: rgb(40, 78, 90);
  }
`;

const ChatIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  
  .icon-image {
    object-fit: contain;
  }
`;

const ChatWindow = styled.div`
  position: fixed;
  background: rgba(79, 149, 170, 0.41);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.52);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: rgba(79, 149, 170, 0.61);
  
  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const LanguageDropdown = styled.select`
  padding: 6px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background: rgba(79, 149, 170, 0.61);
  font-size: 14px;
  
  @media (max-width: 768px) {
    padding: 4px;
    font-size: 12px;
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Message = styled.div`
  margin: 8px 0;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.sender === 'user' ? 'flex-end' : 'flex-start')};
`;

const MessageBubble = styled.div`
  padding: 8px 12px;
  border-radius: 8px;
  display: inline-block;
  background: ${(props) => (props.sender === 'user' ? '#4c6767' : '#ffffff')};
  color: ${(props) => (props.sender === 'user' ? '#fff' : '#282936')};
  max-width: 80%;
  word-break: break-word;
  font-size: clamp(0.9rem, 2vw, 1rem);
`;

const ButtonContainer = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ChatInput = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
  background: rgba(59, 112, 129, 0);
  
  @media (max-width: 768px) {
    padding: 8px;
  }
  
  input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    background: rgba(95, 155, 175, 0.43);
    
    @media (max-width: 768px) {
      padding: 6px;
    }
  }
  
  button {
    margin-left: 10px;
    padding: 8px 12px;
    border: none;
    background-color: #4f95aa;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    
    @media (max-width: 768px) {
      padding: 6px 10px;
      margin-left: 6px;
    }
    
    &:hover {
      background-color: #3b7484;
    }
  }
`;

const BotButton = styled.button`
  padding: 6px 12px;
  background: rgb(45, 83, 95);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 5px 10px;
  }
  
  &:hover {
    background: rgb(77, 151, 173);
  }
`;

export default ChatbotButton;
