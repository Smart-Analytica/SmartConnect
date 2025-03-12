import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

const Card = ({ title }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  return (
    <StyledWrapper isMobile={isMobile}>
      <div className="cards">
        <div className="card">
          <div className="card_title">{title}</div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .cards {
    perspective: 500px;
    margin: ${props => props.isMobile ? '10px' : '20px'};
    display: inline-block;
  }
  
  .card {
    width: ${props => props.isMobile ? '160px' : '200px'};
    height: ${props => props.isMobile ? '200px' : '250px'};
    background: rgba(35, 142, 178, 0.2);
    border: 3px solid rgba(151, 151, 59, 0);
    border-radius: 10px;
    position: relative;
    transform-style: preserve-3d;
    will-change: transform;
    transition: transform .5s;
    cursor: pointer;
  }
  
  .card:hover {
    transform: translateZ(10px) rotateX(20deg) rotateY(20deg);
  }
  
  .card_title {
    color: rgb(76, 77, 105);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: transform .5s;
    font: bold ${props => props.isMobile ? '1.2rem' : '1.5rem'} monospace;
    text-align: center;
  }
  
  .card:hover .card_title {
    transform: translateZ(50px);
  }
  
  @media (max-width: 480px) {
    .card {
      width: 140px;
      height: 180px;
    }
    
    .card_title {
      font-size: 1rem;
    }
  }
`;

export default Card;
