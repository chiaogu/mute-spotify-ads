import React from 'react';
import getTrackInfo from './getTrackInfo';

export default function Player({ state }) {
  return <span>{getTrackInfo(state).name}</span>;
}