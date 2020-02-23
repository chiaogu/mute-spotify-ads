import { useState, useEffect } from 'react';
import getTrackInfo from './getTrackInfo';

const PLAYER_NAME = 'Mute Ads';

function insertSdkToBody() {
  const script = document.createElement('script');
  script.setAttribute('src', 'https://sdk.scdn.co/spotify-player.js');
  document.body.appendChild(script);
}

async function initSpotifyPlayer({ onStateChange, onError, onReady }) {
  insertSdkToBody();
  await new Promise(resolve => window.onSpotifyWebPlaybackSDKReady = resolve);

  const player = new window.Spotify.Player({ name: PLAYER_NAME, getOAuthToken });
  player.addListener('initialization_error', onPlayerError);
  player.addListener('authentication_error', onPlayerError);
  player.addListener('account_error', onPlayerError);
  player.addListener('playback_error', onPlayerError);
  player.addListener('ready', onPlayerReady);
  player.addListener('not_ready', onPlayerNotReady);
  player.addListener('player_state_changed', onPlayerStateChange);
  player.connect();

  let previousType;
  let volume = await player.getVolume();

  async function getOAuthToken(callback) {
    const queryString = new URLSearchParams(window.location.search);
    const refreshToken = queryString.get('refresh_token');
    if(!refreshToken) return window.location.href = '/api/login';
    const refreshTokenUrl = `/api/refresh-token?refresh_token=${refreshToken}`;
    try {
      const { access_token } = await (await fetch(refreshTokenUrl)).json();
      callback(access_token);
    } catch(error) {
      onError(error.message);
    }
  }

  async function onTrackTypeChange(type) {
    if(type === 'ad') {
      volume = await player.getVolume();
      await player.setVolume(0);
    } else {
      await player.setVolume(volume);
    }
  }

  function onPlayerStateChange(state) {
    onStateChange(state);
    const currentType = getTrackInfo(state).type;
    if(previousType !== currentType) onTrackTypeChange(currentType);
    previousType = currentType;
  }

  function onPlayerError({ message }) {
    onError(message);
  }

  function onPlayerReady({ device_id }) {
    onReady(device_id);
  }

  function onPlayerNotReady({ device_id }) {
    onError({ message: `Device ${device_id} has gone offline` })
  }
}

export default function useSpotifyPlayer() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [playerState, setPlayerState] = useState(null);

  useEffect(() => {
    initSpotifyPlayer({
      onStateChange(state) {
        setErrorMessage();
        setPlayerState(state);
      },
      onError(message) {
        setErrorMessage(message);
        setIsPlayerReady(false);
      },
      onReady() {
        setIsPlayerReady(true);
      }
    });
  }, []);

  return { isPlayerReady, errorMessage, playerState };
}