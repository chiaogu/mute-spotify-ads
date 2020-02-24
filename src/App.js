import React from 'react';
import styled from 'styled-components';
import useSpotifyPlayer from './useSpotifyPlayer';
import Player from './Player';
import Instruction from './Instruction';
import Error from './Error';
import ProgressBar from './ProgressBar';

function Page({ isPlayerReady, errorMessage, playerState }) {
  if(errorMessage) return <Error message={errorMessage}/>;
  else if(playerState) return <Player state={playerState}/>;
  else if(isPlayerReady) return <Instruction/>;
  return null;
}

export default function App() {
  const { isPlayerReady, errorMessage, playerState } = useSpotifyPlayer();
  return (
    <Root>
      <Window>
        <Page {...{ isPlayerReady, errorMessage, playerState }}/>
        <ProgressBar {...{ isPlayerReady, errorMessage, playerState }}/>
      </Window>
    </Root>
  )
}

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Window = styled.div`
  position: relative;
  width: 300px;
  height: 485px;
  background-color: #000000;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);
`;
