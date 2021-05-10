import Tile from './tile.js';
import React, { useState, useEffect } from 'react';

export default function Tiles () {
  const [boardState, setBoardState] = useState(shuffle([1,2,3,4,5,6,7,8,-1]));
  // const [boardState, setBoardState] = useState(([1,2,3,4,5,6,7,-1, 8]));
  const [hasWon, setHasWon] = useState(false);

  function isValidMove (indexV, indexHole) {
    //Either has a difference of 3 or (1 and on the same line)
    if (Math.abs(indexV - indexHole) === 3 || (Math.abs(indexV - indexHole) === 1) && (Math.floor(indexV/3) === Math.floor(indexHole/3))) {
      return true;
    } else {
      return false;
    }
  }

  function checkWin () {
    const correctNums = [1,2,3,4,5,6,7,8,-1]
    for (let i = 0; i < boardState.length; i++) {
      if (boardState[i] != correctNums[i]) {
        setHasWon(false);
        return;
      }
    }
    setHasWon(true);
  }

  useEffect(() => {
    checkWin();
  }, [boardState]); 
  
  function shuffle (array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function shuffleBoard () {
    const array = boardState.slice();
    const arrayNew = shuffle(array);
    setBoardState(arrayNew);
  
  }

  function handleClick (v) {
    //The NUMBER v has been clicked 
    let newBoard = boardState.slice();
    const indexV = newBoard.indexOf(v);
    const indexHole = newBoard.indexOf(-1);
    if (isValidMove (indexV, indexHole)) {
      newBoard[indexV] = -1;
      newBoard[indexHole] = v;
      setBoardState(newBoard);  
    }
  }

  function createTile(v) {
    return (
      <Tile 
        value={v} 
        onClick={()=> handleClick(v)} 
      />
    )
  }
  return (
    <>
    <div className="container">
    <h1>An amazing sliding puzzle game</h1>

      <div className="board-row">
        {createTile(boardState[0])}
        {createTile(boardState[1])}
        {createTile(boardState[2])}
      </div>
      <div className="board-row">
        {createTile(boardState[3])}
        {createTile(boardState[4])}
        {createTile(boardState[5])}
      </div>
      <div className="board-row">
        {createTile(boardState[6])}
        {createTile(boardState[7])}
        {createTile(boardState[8])}
      </div>
      <br></br>
    <button onClick={shuffleBoard}>Shuffle</button>
    {!hasWon 
    ? <p></p> 
    : <p>You've won! </p> 
    }
    </div>

    </>

  )
}