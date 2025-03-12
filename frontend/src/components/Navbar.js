// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.css';
// import logo from '../assets/logo.png';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleRefresh = () => {
//     navigate('/');
//     window.location.reload();
//   };

//   return (
//     <nav className="navbar">
//       {/* SMART LABS Text - Clickable */}
//       <Link to="/" className="navbar-brand d-flex align-items-center" onClick={handleRefresh}>
//         <span className="fw-bold fs-6" style={{ fontSize: windowWidth < 768 ? '0.9rem' : '1rem' }}>
//           SMART LABS
//         </span>
//       </Link>

//       {/* Logo - Clickable */}
//       <Link to="/" className="d-flex align-items-center" onClick={handleRefresh}>
//         <img src={logo} alt="Logo" className="navbar-logo" />
//       </Link>
//     </nav>
//   );
// };

// export default Navbar;






import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRefresh = () => {
    navigate('/');
    window.location.reload();
  };

  const navbarColor = getNavbarColor(location.pathname);

  return (
    <StyledNavbar style={{ backgroundColor: navbarColor }}>
      <Link to="/" onClick={handleRefresh}>
        <Logo src={logo} alt="Logo" />
      </Link>

        <Title style={{ fontSize: windowWidth < 600 ? '0.9rem' : '1rem' }}>
          SMART LABS
        </Title>

    </StyledNavbar>
  );
};

const getNavbarColor = (path) => {
  switch (path) {
    case '/CoverPage':
      return 'rgba(140, 141, 141, 0.43)';
    case '/landing1':
      return 'rgba(50, 166, 195, 0.51)';
    case '/voice-assistant':
      return 'rgba(50, 166, 195, 0.51)';  
    case '/landing2':
      return 'rgba(77, 77, 77, 0.193)';
    case '/landing3':
      return 'rgba(122, 103, 88, 0.51)';
    case '/voice-assistant2':
      return 'rgba(122, 103, 88, 0.51)';   
    default:
      return 'rgba(83, 85, 86, 0.2)';
  }
};

const StyledNavbar = styled.nav`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 98%;            /* Change this value to adjust navbar width */
  max-width: 1500px;     /* Optional maximum width limit */
  min-width: 320px;      /* Optional minimum width */
  
  z-index: 1000;
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  padding: 10px 10px;
`;



const Title = styled.span`
  font-weight: bold;
  color:rgb(0, 0, 0);
`;

const Logo = styled.img`

  height: 40px;
  margin-left:-3px;
  margin-top:-3px;
    filter: brightness(0) invert(0);
`;

export default Navbar;
