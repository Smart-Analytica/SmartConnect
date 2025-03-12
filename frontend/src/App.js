import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import LandingPage2 from './components/LandingPage2';
import LandingPage3 from './components/LandingPage3';
import LoginPage from './components/LoginPage';
import VoiceAssistantPage from './components/VoiceAssistantPage';
import CoverPage from './components/CoverPage';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar setShowLogin={setShowLogin} />
        {showLogin ? (
          <LoginPage setShowLogin={setShowLogin} />
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage2   />} />
            <Route path="/landing1" element={<LandingPage />} />
            <Route path="/landing2" element={<LandingPage2 />} />
            <Route path="/landing3" element={<LandingPage3 />} /> 
            <Route path="/voice-assistant" element={<VoiceAssistantPage />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
