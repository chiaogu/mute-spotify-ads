import React, { Fragment } from 'react';
import styled from 'styled-components';
import Layout from './Layout';
import LogoutButton from './LogoutButton';
import { ReactComponent as WarningIcon } from './assets/icon-warning.svg';

export default function Error({ message }) {
  return (
    <Fragment>
      <Layout
        title='Error'
        subtitle={message}
        progress={1}
        color='#D0383C'
      >
        <Background>
          <Icon/>
        </Background>
      </Layout>
      <LogoutButton/>
    </Fragment>
  )
};

const Background = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2C2C2C;
`;

const Icon = styled(WarningIcon)`
  width: 48px;
  height: 48px;
`;