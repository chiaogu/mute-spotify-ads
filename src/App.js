import React from 'react';
import useSpotifyPlayer from './useSpotifyPlayer';
import Player from './Player';
import Instruction from './Instruction';
import Loading from './Loading';
import Error from './Error';

export default function App() {
  const { isPlayerReady, errorMessage, playerState } = useSpotifyPlayer(false);
  if(errorMessage) return <Error message={errorMessage}/>;
  else if(playerState) return <Player state={playerState}/>;
  else if(isPlayerReady) return <Instruction/>;
  return <Loading/>;
}