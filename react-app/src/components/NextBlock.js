import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import styled from '@emotion/styled';

import { state } from '../store/state';

function NextBlock({ tik, toe }) {
  const [colWidth, setColWidth] = useState(clamp(((window.innerHeight * (1 - 0.2)) / state.col) * 0.5, 30, 100));
  const [colHeight, setColHeight] = useState(clamp(((window.innerHeight * (1 - 0.2)) / state.col) * 0.5, 30, 100));

  function clamp(n, min, max) {
    if (n > max) {
      return max;
    } else if (n < min) {
      return min;
    } else {
      return n;
    }
  }

  function handleResize(e) {
    setColWidth(clamp(((window.innerHeight * (1 - 0.2)) / state.col) * 0.5, 30, 100));
    setColHeight(clamp(((window.innerHeight * (1 - 0.2)) / state.col) * 0.5, 30, 100));
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    // https://www.pluralsight.com/guides/how-to-cleanup-event-listeners-react
    return function cleanUpListener() {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const _NextBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const _Block = styled.div`
    width: ${colWidth}px;
    height: ${colHeight}px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
  `;

  return (
    <_NextBlock>
      <_Block style={{ background: `url(${tik})` }}></_Block>
      <_Block style={{ background: `url(${toe})` }}></_Block>
    </_NextBlock>
  );
}

export { NextBlock };
