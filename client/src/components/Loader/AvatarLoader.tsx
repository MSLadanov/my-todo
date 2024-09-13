import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border: 4px solid transparent;
  border-top: 4px solid #3498db; 
  border-radius: 50%;
  width: 40px; 
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const AvatarLoader = () => {
  return <Loader />;
};

export default AvatarLoader;