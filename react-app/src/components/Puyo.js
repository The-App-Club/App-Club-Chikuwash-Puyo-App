import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { state } from '../store/state';
import styled from '@emotion/styled';

class Puyo {
  constructor(id, path) {
    this.puyoStatus = {
      id: id,
      x: 0,
      y: 0,
      path: path,
      rotation: 90,
    };

    function clamp(n, min, max) {
      if (n > max) {
        return max;
      } else if (n < min) {
        return min;
      } else {
        return n;
      }
    }

    this.handleResize = (e) => {
      window.removeEventListener('resize', this.handleResize);
    };

    window.addEventListener('resize', this.handleResize);
  }

  setPuyoPos(newX, newY, puyo) {
    const oldX = this.puyoStatus.x;
    const oldY = this.puyoStatus.y;
    this.puyoStatus.x = newX;
    this.puyoStatus.y = newY;
    state.board[oldY][oldX] = { bin: 0, path: null, puyo: {} };
  }
}

export { Puyo };
