import React from 'react';
import styled, { css } from 'styled-components';

export default function ProgressBar({ progress, color }){
  return <Root color={color} percentage={progress}/>;
}

const loading = css`
  @keyframes loading {
    0% {
      transform: scaleX(0) translateX(0);
    }
    100% {
      transform: scaleX(2) translateX(50%);
    }
  }
`

const Root = styled.div`
  position: relative;
  width: 185px;
  height: 4px;
  margin-bottom: 67px;
  align-self: flex-end;
  background-color: #2C2C2C;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transform-origin: 0 0;
    ${({percentage, color}) => `
      ${percentage > 0 ? `
        transform: scaleX(${percentage});
      ` : `
        ${loading}
        animation: loading 1.5s cubic-bezier(0.77, 0, 0.175, 1) infinite alternate;
      `}
      background-color: ${color};
    `};
  }
`;