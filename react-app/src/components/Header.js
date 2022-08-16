import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import styled from '@emotion/styled';
import { NextBlock } from './NextBlock';
import { Score } from './Score';

function Header({ tik, toe }) {
  const _Header = styled.header`
    display: flex;
    justify-content: space-evenly;
    width: calc(100vw - 20%);
    margin: 20px auto;
  `;
  return (
    <_Header>
      <Score></Score>
      <NextBlock tik={tik} toe={toe}></NextBlock>
    </_Header>
  );
}

export { Header };
