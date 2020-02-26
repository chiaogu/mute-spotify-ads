import React from 'react';
import styled from 'styled-components';
import { ReactComponent as PowerIcon } from './assets/icon-power.svg';
import gtag from 'ga-gtag';

export default function LogoutButton() {
  return <Root onClick={() => {
    gtag('event', 'logout');
    const url = 'https://www.spotify.com/logout/'
    const spotifyLogoutWindow = window.open(url);
    setTimeout(() => {
      spotifyLogoutWindow.close();
      window.location.href = '/';
    }, 1000);
  }}/>
}

const Root = styled(PowerIcon)`
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;