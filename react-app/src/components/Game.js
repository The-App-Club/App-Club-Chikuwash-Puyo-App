import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

import { state } from '../store/state';

function Game({ board }) {
  const _Game = styled.div`
    @media screen and (max-width: 800px) {
      width: calc(100vw - 20%);
      margin: 20px auto;
    }

    @media screen and (min-width: 799px) {
      width: calc(100vw - 20%);
      margin: 50px auto;
    }
  `;

  const _Row = styled.div`
    display: flex;
    justify-content: center;
  `;

  const _Block = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
  `;
  const gameRef = useRef(null);

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

  return (
    <_Game ref={gameRef}>
      {board.map((rows, rowIndex) => {
        return (
          <_Row key={rowIndex} className="row">
            {rows.map((col, colIndex) => {
              return (
                <_Block
                  key={colIndex}
                  className={col ? 'col wall' : 'col'}
                  style={{
                    width: `${colWidth}px`,
                    height: `${colHeight}px`,
                    backgroundImage: `url(${board[rowIndex][colIndex].path})`,
                  }}
                ></_Block>
              );
            })}
          </_Row>
        );
      })}
    </_Game>
  );
}

export { Game };
