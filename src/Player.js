import React, { Fragment } from 'react';
import styled from 'styled-components';
import Layout from './Layout';
import LogoutButton from './LogoutButton';
import { ReactComponent as MuteIcon } from './assets/icon-mute.svg';
import getTrackInfo from './getTrackInfo';

export default function Player({ state }) {
  const { type, name, artists, album } = getTrackInfo(state);
  return (
    <Fragment>
      <Layout
        title={name}
        subtitle={artists[0].name}
      >
        <AlbumCoverContainer>
          <AlbumCoverImage imageUrl={album.images[0].url} isBlur={type === 'ad'}/>
          {type === 'ad' && <Icon/>}
        </AlbumCoverContainer>
      </Layout>
      <LogoutButton/>
    </Fragment>
  )
};

const AlbumCoverContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const AlbumCoverImage = styled.div`
  position: absolute;
  z-index: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  ${({ imageUrl, isBlur }) => `
    background-image: url('${imageUrl}');
    ${isBlur && `
      opacity: 0.5;
      filter: blur(8px);
    `}
  `}
`;

const Icon = styled(MuteIcon)`
  width: 48px;
  height: 48px;
  z-index: 1;
`;