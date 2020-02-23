import React from 'react';
import styled from 'styled-components';
import { ReactComponent as PowerIcon } from './assets/icon-power.svg';

export default function LogoutButton() {
  return <Root/>
}

const Root = styled(PowerIcon)`
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;