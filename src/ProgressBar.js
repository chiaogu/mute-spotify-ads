import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useInterval from './useInterval';
import getTrackInfo from './getTrackInfo';

const PLAYING_INTERVAL = 1000;
const LOADING_TRANSITION_DURATION = 1500;
const LOADING_TRANSITION = `transform ${LOADING_TRANSITION_DURATION}ms cubic-bezier(0.77, 0, 0.175, 1)`;
const STATIC_TRANSITION = `transform 800ms cubic-bezier(0.075, 0.82, 0.165, 1)`;
const PLAYING_TRANSITION = ``;

function useLoadingProps({ errorMessage, playerState }) {
  const isLoading = !errorMessage && !playerState;
  const [percentage, setPercentage] = useState(0);

  useInterval(() => {
    setPercentage(percentage === 0 ? 1 : 0);
  }, !isLoading ? null : (percentage === 1 ? LOADING_TRANSITION_DURATION : 50));

  return {
    scale: percentage * 2,
    translate: percentage / 2,
    transition: percentage === 0 ? '' : LOADING_TRANSITION,
    color: '#63CB6B'
  }
}

function usePlayingProps(playerState) {
  const { paused, duration = 1 } = (playerState || {}) ;
  const { type } = getTrackInfo(playerState);
  const [currentPosition, setCurrentPosition] = useState(0);
  const intervalDuration = paused ? null : currentPosition > 0 ? PLAYING_INTERVAL : 50;

  useEffect(() => {
    setCurrentPosition((playerState || {}).position || 0);
  }, [playerState]);

  useInterval(() => {
    setCurrentPosition(Math.min(currentPosition + PLAYING_INTERVAL, duration));
  }, intervalDuration);

  return {
    scale: currentPosition / duration,
    transition: currentPosition <= 1 ? '' : PLAYING_TRANSITION,
    color: type === 'ad' ? '#ffffff' : '#63CB6B'
  }
}

export default function ProgressBar({ errorMessage, playerState }){
  const loadingProps = useLoadingProps({ errorMessage, playerState });
  const playingProps = usePlayingProps(playerState);

  if(errorMessage) return <Root scale={1} color='#D0383C' transition={STATIC_TRANSITION}/>;
  else if(playerState) return <Root {...playingProps}/>;
  return <Root {...loadingProps}/>;
}

const Root = styled.div`
  position: absolute;
  width: 185px;
  height: 4px;
  right: 0;
  bottom: 67px;
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
    ${({color, scale, translate = 0, transition}) => `
      transition: background-color 0.8s, ${transition};
      transform: scaleX(${scale}) translateX(${translate * 100}%);
      background-color: ${color};
    `};
  }
`;