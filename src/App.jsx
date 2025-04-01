import { useEffect, useState } from 'react'
import _ from "lodash"
import './App.css'
import Controls from './components/Controls'
import GameBoard from './components/GameBoard'
import gridService from './services/gridService'

const App = () => {
  const startWidth = 10;
  const startHeight = 10;
  const [isGameLoopActive, setIsGameLoopActive] = useState(false);
  const [tickCount, setTickCount] = useState(0);
  const [cells, setCells] = useState(Array.from({length: startWidth},()=> Array.from({length: startHeight}, () => false)));

  const resetCellGrid = () => {
    const emptyCellGrid = gridService.createEmptyCellGrid(startHeight, startWidth);
    setCells(emptyCellGrid);
  }

  const randomizeCellGrid = () => {
    const randomCellArray = gridService.createRandomCellGrid(startHeight, startWidth);
    setCells(randomCellArray);
  }

  const handleCellChange = (x, y, value) => {
    let copy = [...cells];
    copy[x][y] = value;
    setCells(copy);
  }

  const toggleGameLoop = () => {
    setIsGameLoopActive(!isGameLoopActive)
  }

  const doGameTick = () => {
    let copy = _.cloneDeep(cells);
    
    cells.forEach((row, x) => {
      row.forEach((_cell, y) => {
        const count = getAdjacentLiveCount(x, y);
        
        if (cells[x][y] && count < 2) {
          copy[x][y] = false;
        }
    
        if (cells[x][y] && count > 3) {
          copy[x][y] = false;
        }
        
        if (!cells[x][y] && count == 3) {
          copy[x][y] = true;
        }
      });
    });
    setCells(copy);
  }

  const getAdjacentLiveCount = (x, y) => {
    let count = 0;
    const operations = [
      [0, 1],
      [0, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
      [-1, -1],
      [1, 0],
      [-1, 0],
  ];

  operations.forEach(([i, j]) => {
    const newX = x + i;
    const newY = y + j;
    if (newX >= 0 && newX < startWidth && newY >= 0 && newY < startHeight) {
      if (cells[newX][newY]) {
        count++;
      }
    }
  })
    return count;
  }


  const setStartingPosition = () => {
    handleCellChange(0, 1, true);
    handleCellChange(1, 2, true);
    handleCellChange(2, 0, true);
    handleCellChange(2, 1, true);
    handleCellChange(2, 2, true);
  }

  useEffect(() => {
    setStartingPosition();
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      isGameLoopActive && doGameTick()
      isGameLoopActive && setTickCount(tickCount + 1)
    }, 500)
    return () => clearTimeout(timer)
  }, [isGameLoopActive, tickCount])
  
  return (
    <>
      <Controls
        randomizeHandler={randomizeCellGrid}
        resetHandler={resetCellGrid}
        tickHandler={doGameTick}
        toggleGameLoop={toggleGameLoop}
      />
      <GameBoard 
        cells={cells}
        changeCell={handleCellChange}
      />
    </>
  )
}

export default App
