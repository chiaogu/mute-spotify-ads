import React, { Fragment } from 'react';
import styled from 'styled-components';
import Layout from './Layout';
import instructionVideo from './assets/instruction.mp4';
import LogoutButton from './LogoutButton';

export default function Instruction() {
  return (
    <Fragment>
      <Layout
        title='Waiting for connection'
        subtitle='Select "Mute Ads" from the device list on the bottom right of your Spotify client'
        progress={1}
        color='#63CB6B'
      >
        <Video loop autoPlay muted>
          <source src={instructionVideo} type="video/mp4"/>
        </Video>
      </Layout>
      <LogoutButton/>
    </Fragment>
  )
};

const Video = styled.video`
  width: 300px;
  height: 300px;
`;