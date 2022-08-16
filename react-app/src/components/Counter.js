import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import styled from '@emotion/styled';

function Counter() {
  const _Counter = styled.div`
    position: fixed;
    border: 1px solid #000;
    bottom: 25px;
    right: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 800px) {
      width: 60px;
      height: 120px;
    }

    @media screen and (min-width: 799px) {
      width: 60px;
      height: 120px;
    }
  `;

  // https://codepen.io/testerez/pen/QWLGzee?editors=0010

  const useRaf = (onFrame) => {
    const requestRef = useRef();
    const startTimeRef = useRef();
    const callback = (time) => {
      if (!startTimeRef.current) {
        startTimeRef.current = time;
      }
      const progress = time - startTimeRef.current;
      onFrame(progress);
      requestRef.current = window.requestAnimationFrame(callback);
    };

    useEffect(() => {
      requestRef.current = window.requestAnimationFrame(callback);
      return () => {
        cancelAnimationFrame(requestRef.current);
      };
    }, []);
  };

  const [count, setCount] = useState(0);
  useRaf((progress) => {
    setCount((progress / 100) % 100);
  });

  return <_Counter>{Math.round(count)}</_Counter>;
}

export { Counter };
