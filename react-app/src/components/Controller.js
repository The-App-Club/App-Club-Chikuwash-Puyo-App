import styled from '@emotion/styled';
import React, { useState, useEffect, useRef } from 'react';
import { state } from '../store/state';

function Controller() {
  const _Controller = styled.div`
    position: fixed;
    bottom: 5px;
    display: flex;
    justify-content: center;
    width: 100vw;
    margin: 0 auto;
  `;
  const _Block = styled.div`
    border: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 70px;
    min-height: 70px;
  `;

  const left = useRef(null);
  const down = useRef(null);
  const right = useRef(null);
  const rotate = useRef(null);

  useEffect(() => {
    function canMove(dir, puyo) {
      let canMove = true;
      let newX;
      let newY;
      if (dir === 'left') {
        newX = puyo.puyoStatus.x - 1;
        newY = puyo.puyoStatus.y;
      }
      if (dir === 'right') {
        newX = puyo.puyoStatus.x + 1;
        newY = puyo.puyoStatus.y;
      }
      if (dir === 'up') {
        newX = puyo.puyoStatus.x;
        newY = puyo.puyoStatus.y - 1;
      }
      if (dir === 'down') {
        newX = puyo.puyoStatus.x;
        newY = puyo.puyoStatus.y + 1;
      }
      if (newY === state.row) {
        canMove = false;
      }
      if (state.col <= newX || newX < 0) {
        canMove = false;
      }
      if (state.row <= newY || newY < 0) {
        canMove = false;
      }
      return canMove;
    }

    function canMoveAll(dir, puyoList) {
      let canMove = true;
      let newX;
      let newY;
      for (let index = 0; index < puyoList.length; index++) {
        const puyo = puyoList[index];
        if (dir === 'left') {
          newX = puyo.puyoStatus.x - 1;
          newY = puyo.puyoStatus.y;
        }
        if (dir === 'right') {
          newX = puyo.puyoStatus.x + 1;
          newY = puyo.puyoStatus.y;
        }
        if (dir === 'down') {
          newX = puyo.puyoStatus.x;
          newY = puyo.puyoStatus.y + 1;
        }
        if (newY === state.row) {
          canMove = false;
        }
        if (state.col <= newX || newX < 0) {
          canMove = false;
        }
        if (state.row <= newY || newY < 0) {
          canMove = false;
        }
      }
      return canMove;
    }
    const leftImage = left.current;
    leftImage.addEventListener('touchstart', (e) => {
      const player = window['Player'];
      if (!canMoveAll('left', player.puyoList)) {
        e.preventDefault();
        return false;
      }
      for (let index = 0; index < player.puyoList.length; index++) {
        const puyo = player.puyoList[index];
        const newX = puyo.puyoStatus.x - 1;
        const newY = puyo.puyoStatus.y;
        puyo.setPuyoPos(newX, newY, puyo);
      }
      e.preventDefault();
      return false;
    });
    leftImage.addEventListener('mousedown', (e) => {
      const player = window['Player'];
      if (!canMoveAll('left', player.puyoList)) {
        e.preventDefault();
        return false;
      }
      for (let index = 0; index < player.puyoList.length; index++) {
        const puyo = player.puyoList[index];
        const newX = puyo.puyoStatus.x - 1;
        const newY = puyo.puyoStatus.y;
        puyo.setPuyoPos(newX, newY, puyo);
      }
      e.preventDefault();
      return false;
    });
    const downImage = down.current;
    downImage.addEventListener('touchstart', (e) => {
      const player = window['Player'];
      if (!canMoveAll('down', player.puyoList)) {
        e.preventDefault();
        return false;
      }
      for (let index = 0; index < player.puyoList.length; index++) {
        const puyo = player.puyoList[index];
        const newX = puyo.puyoStatus.x;
        const newY = puyo.puyoStatus.y + 1;
        puyo.setPuyoPos(newX, newY, puyo);
      }
      e.preventDefault();
      return false;
    });
    downImage.addEventListener('mousedown', (e) => {
      const player = window['Player'];
      if (!canMoveAll('down', player.puyoList)) {
        e.preventDefault();
        return false;
      }
      for (let index = 0; index < player.puyoList.length; index++) {
        const puyo = player.puyoList[index];
        const newX = puyo.puyoStatus.x;
        const newY = puyo.puyoStatus.y + 1;
        puyo.setPuyoPos(newX, newY, puyo);
      }
      e.preventDefault();
      return false;
    });

    const rightImage = right.current;
    rightImage.addEventListener('touchstart', (e) => {
      const player = window['Player'];
      if (!canMoveAll('right', player.puyoList)) {
        e.preventDefault();
        return false;
      }
      for (let index = 0; index < player.puyoList.length; index++) {
        const puyo = player.puyoList[index];
        const newX = puyo.puyoStatus.x + 1;
        const newY = puyo.puyoStatus.y;
        puyo.setPuyoPos(newX, newY, puyo);
      }
      e.preventDefault();
      return false;
    });
    rightImage.addEventListener('mousedown', (e) => {
      const player = window['Player'];
      if (!canMoveAll('right', player.puyoList)) {
        e.preventDefault();
        return false;
      }
      for (let index = 0; index < player.puyoList.length; index++) {
        const puyo = player.puyoList[index];
        const newX = puyo.puyoStatus.x + 1;
        const newY = puyo.puyoStatus.y;
        puyo.setPuyoPos(newX, newY, puyo);
      }
      e.preventDefault();
      return false;
    });
    const rotateImage = rotate.current;
    rotateImage.addEventListener('touchstart', (e) => {
      const player = window['Player'];
      let newX;
      let newY;
      const self = player.puyoList[0];
      const other = player.puyoList[1];

      const rot = (player.rot + 1) % 4;
      if (rot === 0) {
        if (!canMove('right', other)) {
          e.preventDefault();
          return false;
        }
        newX = self.puyoStatus.x + 1;
        newY = self.puyoStatus.y;
      }
      if (rot === 1) {
        if (!canMove('down', other)) {
          e.preventDefault();
          return false;
        }
        newX = self.puyoStatus.x;
        newY = self.puyoStatus.y + 1;
      }
      if (rot === 2) {
        if (!canMove('left', other)) {
          e.preventDefault();
          return false;
        }
        newX = self.puyoStatus.x - 1;
        newY = self.puyoStatus.y;
      }
      if (rot === 3) {
        if (!canMove('up', other)) {
          e.preventDefault();
          return false;
        }
        newX = self.puyoStatus.x;
        newY = self.puyoStatus.y - 1;
      }

      other.setPuyoPos(newX, newY, other);
      player.rot = player.rot + 1;
      player.setKeyStatus({ up: true });
      e.preventDefault();
      return false;
    });
    rotateImage.addEventListener('touchend', (e) => {
      const player = window['Player'];
      player.setKeyStatus({ up: false });
      e.preventDefault();
      return false;
    });
    rotateImage.addEventListener('mousedown', (e) => {
      const player = window['Player'];
      let newX;
      let newY;
      const self = player.puyoList[0];
      const other = player.puyoList[1];

      const rot = (player.rot + 1) % 4;
      if (rot === 0) {
        if (!canMove('right', other)) {
          e.preventDefault();
          return false;
        }
        newX = self.puyoStatus.x + 1;
        newY = self.puyoStatus.y;
      }
      if (rot === 1) {
        if (!canMove('down', other)) {
          e.preventDefault();
          return false;
        }
        newX = self.puyoStatus.x;
        newY = self.puyoStatus.y + 1;
      }
      if (rot === 2) {
        if (!canMove('left', other)) {
          e.preventDefault();
          return false;
        }
        newX = self.puyoStatus.x - 1;
        newY = self.puyoStatus.y;
      }
      if (rot === 3) {
        if (!canMove('up', other)) {
          e.preventDefault();
          return false;
        }
        newX = self.puyoStatus.x;
        newY = self.puyoStatus.y - 1;
      }

      other.setPuyoPos(newX, newY, other);
      player.rot = player.rot + 1;
      player.setKeyStatus({ up: true });
      e.preventDefault();
      return false;
    });
    rotateImage.addEventListener('mouseup', (e) => {
      const player = window['Player'];
      player.setKeyStatus({ up: false });
      e.preventDefault();
      return false;
    });
  }, []);

  return (
    <_Controller>
      <_Block
        ref={left}
        style={{
          backgroundImage: `url(../image/keyboard_arrow_left_black_24dp.svg)`,
          backgroundSize: '70px',
          backgroundOrigin: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      ></_Block>
      <_Block
        ref={down}
        style={{
          backgroundImage: `url(../image/keyboard_arrow_down_black_24dp.svg)`,
          backgroundSize: '70px',
          backgroundOrigin: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      ></_Block>
      <_Block
        ref={right}
        style={{
          backgroundImage: `url(../image/keyboard_arrow_right_black_24dp.svg)`,
          backgroundSize: '70px',
          backgroundOrigin: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      ></_Block>
      <_Block
        ref={rotate}
        style={{
          backgroundImage: `url(../image/refresh_black_24dp.svg)`,
          backgroundSize: '70px',
          backgroundOrigin: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      ></_Block>
    </_Controller>
  );
}

export { Controller };
