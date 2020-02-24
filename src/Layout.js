import React from 'react';
import styled from 'styled-components';

export default function Layout({ title, subtitle, progress, color, children }) {
  return (
    <Root>
      {children}
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Root>
  )
};

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin: 18px 18px 0 18px;
  font-size: 16px;
  font-family: 'Ubuntu Mono';
  font-weight: 100;
  color: #ffffff;
`;

const Subtitle = styled.h3`
  margin: 8px 18px 0 18px;
  font-size: 14px;
  font-family: 'Ubuntu Mono';
  font-weight: 100;
  line-height: 1.2;
  color: rgba(255,255,255,0.5);
`;
