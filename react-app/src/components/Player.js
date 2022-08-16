import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { state } from '../store/state';
import styled from '@emotion/styled';

import { Puyo } from './Puyo';

class Player {
  constructor() {
    this.keyStatus = {
      right: false,
      left: false,
      up: false,
      down: false,
    };
    this.rot = 0;

    this.puyoList = [];
    this.fixedPuyoList = [];

    this.canMove = (dir, puyo) => {
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
    };

    this.canMoveAll = (dir) => {
      let canMove = true;
      let newX;
      let newY;
      for (let index = 0; index < this.puyoList.length; index++) {
        const puyo = this.puyoList[index];
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
      }
      return canMove;
    };

    this.canRotate = (puyo) => {
      let canRotate = true;
      for (let index = 0; index < this.fixedPuyoList.length; index++) {
        const fixedPuyo = this.fixedPuyoList[index];
        if (fixedPuyo.puyoStatus.y === puyo.puyoStatus.y - 1 && fixedPuyo.puyoStatus.x === puyo.puyoStatus.x) {
          canRotate = false;
        }
        if (fixedPuyo.puyoStatus.y === puyo.puyoStatus.y + 1 && fixedPuyo.puyoStatus.x === puyo.puyoStatus.x) {
          canRotate = false;
        }
        if (fixedPuyo.puyoStatus.y === puyo.puyoStatus.y && fixedPuyo.puyoStatus.x === puyo.puyoStatus.x - 1) {
          canRotate = false;
        }
        if (fixedPuyo.puyoStatus.y === puyo.puyoStatus.y && fixedPuyo.puyoStatus.x === puyo.puyoStatus.x + 1) {
          canRotate = false;
        }
      }
      return canRotate;
    };

    // https://github.com/GRI-Inc/App-Club-Image-Graphics-App/blob/main/image-grid-motion-effect/src/js/cursor.js#L20
    // ブラウザのキーボードの入力を取得するイベントリスナを登録する
    this.handleKeyEvent = (e) => {
      let newX;
      let newY;
      switch (e.keyCode) {
        case 37: // 左向きキー
          if (!this.canMoveAll('left')) {
            e.preventDefault();
            return false;
          }
          for (let index = 0; index < this.puyoList.length; index++) {
            const puyo = this.puyoList[index];
            if (!this.canMove('left', puyo)) {
              e.preventDefault();
              return false;
            }
            newX = puyo.puyoStatus.x - 1;
            newY = puyo.puyoStatus.y;
            puyo.setPuyoPos(newX, newY, puyo);
          }
          e.preventDefault();
          return false;
        case 38: // 上向きキー
          const self = this.puyoList[0];
          const other = this.puyoList[1];

          const rot = (this.rot + 1) % 4;
          if (rot === 0) {
            if (!this.canMove('right', other)) {
              e.preventDefault();
              return false;
            }
            if (!this.canRotate(other)) {
              e.preventDefault();
              return false;
            }
            newX = self.puyoStatus.x + 1;
            newY = self.puyoStatus.y;
          }
          if (rot === 1) {
            if (!this.canMove('down', other)) {
              e.preventDefault();
              return false;
            }
            if (!this.canRotate(other)) {
              e.preventDefault();
              return false;
            }
            newX = self.puyoStatus.x;
            newY = self.puyoStatus.y + 1;
          }
          if (rot === 2) {
            if (!this.canMove('left', other)) {
              e.preventDefault();
              return false;
            }
            if (!this.canRotate(other)) {
              e.preventDefault();
              return false;
            }
            newX = self.puyoStatus.x - 1;
            newY = self.puyoStatus.y;
          }
          if (rot === 3) {
            if (!this.canMove('up', other)) {
              e.preventDefault();
              return false;
            }
            if (!this.canRotate(other)) {
              e.preventDefault();
              return false;
            }
            newX = self.puyoStatus.x;
            newY = self.puyoStatus.y - 1;
          }

          other.setPuyoPos(newX, newY, other);
          this.rot = this.rot + 1;
          this.keyStatus.up = true;
          e.preventDefault();
          return false;
        case 39: // 右向きキー
          if (!this.canMoveAll('right')) {
            e.preventDefault();
            return false;
          }
          for (let index = 0; index < this.puyoList.length; index++) {
            const puyo = this.puyoList[index];
            if (!this.canMove('right', puyo)) {
              e.preventDefault();
              return false;
            }
            newX = puyo.puyoStatus.x + 1;
            newY = puyo.puyoStatus.y;
            puyo.setPuyoPos(newX, newY, puyo);
          }
          e.preventDefault();
          return false;
        case 40: // 下向きキー
          if (!this.canMoveAll('down')) {
            e.preventDefault();
            return false;
          }
          for (let index = 0; index < this.puyoList.length; index++) {
            const puyo = this.puyoList[index];
            if (!this.canMove('down', puyo)) {
              e.preventDefault();
              return false;
            }
            newX = puyo.puyoStatus.x;
            newY = puyo.puyoStatus.y + 1;
            puyo.setPuyoPos(newX, newY, puyo);
          }
          e.preventDefault();
          return false;
      }
    };

    window.addEventListener('keydown', this.handleKeyEvent);
    window.addEventListener('keypress', this.handleKeyEvent);
  }

  resetRot() {
    this.rot = 0;
  }

  isBottomFill(puyo) {
    let isBottomFill = false;
    for (let index = 0; index < this.fixedPuyoList.length; index++) {
      const fixedPuyo = this.fixedPuyoList[index];
      if (fixedPuyo.puyoStatus.y === puyo.puyoStatus.y + 1 && fixedPuyo.puyoStatus.x === puyo.puyoStatus.x) {
        isBottomFill = true;
      }
    }
    return isBottomFill;
  }

  isGameOver() {
    let isGameOver = false;
    for (let index = 0; index < state.board[0].length; index++) {
      const cell = state.board[0][index];
      if (cell.bin === 1) {
        isGameOver = true;
      }
    }
    return isGameOver;
  }

  checkEraseSequencialCombination(puyo) {
    // TODO 再帰したほうがきれいにできる気がした
    let collectList = [];
    const dirs = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ];
    for (let index = 0; index < this.fixedPuyoList.length; index++) {
      let tmpList = [];
      // fixedPuyoを中心に見た4方向の座標リストを保持
      const fixedPuyo = this.fixedPuyoList[index];

      for (let index = 0; index < dirs.length; index++) {
        const dir = dirs[index];
        const [x, y] = [...dir];
        const newX = fixedPuyo.puyoStatus.x + x;
        const newY = fixedPuyo.puyoStatus.y + y;
        if (0 <= newX && newX <= state.col) {
          tmpList.push([fixedPuyo.puyoStatus.x + x, fixedPuyo.puyoStatus.y + y]);
        }
        if (0 <= newX && newX <= state.row) {
          tmpList.push([fixedPuyo.puyoStatus.x + x, fixedPuyo.puyoStatus.y + y]);
        }
      }
      collectList.push(...tmpList);
    }

    // WIP 引数のpuyo から見て近い位置座標の 連続チェック 区間切れのgroupby
    console.log(puyo, collectList);
  }

  playing() {
    let isNextChikuwa = false;
    const self = this.puyoList[0];
    const other = this.puyoList[1];

    state.board[self.puyoStatus.y][self.puyoStatus.x] = { bin: 0, path: self.puyoStatus.path, puyo: self };
    state.board[other.puyoStatus.y][other.puyoStatus.x] = { bin: 0, path: other.puyoStatus.path, puyo: other };

    if (this.isBottomFill(self) || this.isBottomFill(other)) {
      state.board[self.puyoStatus.y][self.puyoStatus.x] = { bin: 1, path: self.puyoStatus.path, puyo: self };
      state.board[other.puyoStatus.y][other.puyoStatus.x] = { bin: 1, path: other.puyoStatus.path, puyo: other };
      isNextChikuwa = true;
      this.fixedPuyoList = this.fixedPuyoList.concat(...this.puyoList);

      // 接地したタイミングで実行

      this.checkEraseSequencialCombination(self);
      this.checkEraseSequencialCombination(other);

      // チェック結果の戻り値受け取って、binフラグ寝かせて pathとpuyoをnullにする

      // framerで爆破アニメーション？　ちくわっしゅ！

    } else if (self.puyoStatus.y + 1 === state.row || other.puyoStatus.y + 1 === state.row) {
      state.board[self.puyoStatus.y][self.puyoStatus.x] = { bin: 1, path: self.puyoStatus.path, puyo: self };
      state.board[other.puyoStatus.y][other.puyoStatus.x] = { bin: 1, path: other.puyoStatus.path, puyo: other };
      isNextChikuwa = true;
      this.fixedPuyoList = this.fixedPuyoList.concat(...this.puyoList);
    }

    if (isNextChikuwa) {
      this.puyoList = [];
      const puyo1 = new Puyo('chikuwa-01', './image/chikuwash_01.svg');
      puyo1.setPuyoPos(0, 0, puyo1);
      const puyo2 = new Puyo('chikuwa-02', './image/chikuwash_02.svg');
      puyo2.setPuyoPos(1, 0, puyo2);
      this.addPuyo(puyo1);
      this.addPuyo(puyo2);
      this.resetRot();
      window['Player'] = this;
    }

    console.log('playing...');

    if (this.isGameOver()) {
      return { isGameOver: true };
    } else {
      return { isGameOver: false };
    }
  }

  addPuyo(puyo) {
    this.puyoList.push(puyo);
  }

  setKeyStatus(keyStatus) {
    this.keyStatus = Object.assign(this.keyStatus, keyStatus);
  }
}

export { Player };
