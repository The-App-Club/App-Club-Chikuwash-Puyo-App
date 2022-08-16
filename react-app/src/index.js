import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { state } from './store/state';

import { Game } from './components/Game';
import { Player } from './components/Player';
import { Header } from './components/Header';
import { Puyo } from './components/Puyo';
import { Controller } from './components/Controller';
import { Counter } from './components/Counter';
import { Stage } from './components/Stage';

const puyo1 = new Puyo('chikuwa-01', './image/chikuwash_01.svg');
puyo1.setPuyoPos(0, 0, puyo1);
const puyo2 = new Puyo('chikuwa-02', './image/chikuwash_02.svg');
puyo2.setPuyoPos(1, 0, puyo2);

const player = new Player();
player.addPuyo(puyo1);
player.addPuyo(puyo2);
window['Player'] = player;

function App() {
  const [board, setBoard] = useState(state.board);

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
      window['reqId'] = requestRef.current;
    };
    // https://qiita.com/nouka/items/69a74eebc43e7496007b
    useEffect(() => {
      requestRef.current = window.requestAnimationFrame(callback);
      return () => {
        cancelAnimationFrame(requestRef.current);
      };
    }, []);
  };

  useRaf((progress) => {
    // main loop canvasでやったほうがきれいにできそう
    // https://codesandbox.io/s/mystifying-framework-hdk7k?file=/src/Canvas.tsx
    // https://bom-shibuya.hatenablog.com/entry/2020/10/27/182226
    setBoard([...state.board]);
    const player = window['Player'];
    const { isGameOver } = { ...player.playing() };
    if (isGameOver) {
      alert(`Game Over...`);
      window.location.href = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    }
  });

  return <Game board={board}></Game>;
}

ReactDOM.render(
  <React.StrictMode>
    <>
      <Header tik={state.tik} toe={state.toe}></Header>
      <App />
      <Controller></Controller>
    </>
  </React.StrictMode>,
  document.getElementById('root')
);
