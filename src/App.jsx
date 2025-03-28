import { useEffect, useState } from 'react'
import _ from "lodash"
import './App.css'
import Controls from './components/Controls'
import GameBoard from './components/GameBoard'

const App = () => {
  const startWidth = 10
  const startHeight = 10
  const [cells, setCells] = useState(Array.from({length: startWidth},()=> Array.from({length: startHeight}, () => false)));

  const resetCellGrid = (height, width) => {
    const cellsArray = []
    for (let x = 0; x < height; x++) {
      cellsArray[x] = [];
      for (let y = 0; y < width; y++) {
        cellsArray[x][y] = false;
      }
    }
    setCells(cellsArray);
  }

  const createRandomCellGrid = (height, width) => {
    const cellsArray = [];
    for (let x = 0; x < height; x++) {
      cellsArray[x] = [];
      for (let y = 0; y < width; y++) {
        cellsArray[x][y] = Math.random() < 0.5;
      }
    }
    setCells(cellsArray);
  }

  const handleCellChange = (x, y, value) => {
    let copy = [...cells]
    copy[x][y] = value
    setCells(copy)
  }

  const doGameTick = () => {
    let copy = _.cloneDeep(cells)
    
    cells.forEach((row, x) => {
      row.forEach((cell, y) => {
        const count = getAdjacentLiveCount(x, y)
        
        if (cells[x][y] && count < 2) {
          copy[x][y] = false
        }
    
        if (cells[x][y] && count > 3) {
          copy[x][y] = false
        }
        
        if (!cells[x][y] && count == 3) {
          copy[x][y] = true
        }

      })
    });
    setCells(copy)
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
  ]

  operations.forEach(([i, j]) => {
    const newX = x + i
    const newY = y + j
    if (newX >= 0 && newX < startWidth && newY >= 0 && newY < startHeight) {
      if (cells[newX][newY]) {
        count++
      }
    }
  })
    return count;
  }


  const setStartingPosition = () => {
    handleCellChange(0, 1, true)
    handleCellChange(1, 2, true)
    handleCellChange(2, 0, true)
    handleCellChange(2, 1, true)
    handleCellChange(2, 2, true)
  }

  useEffect(() => {
    setStartingPosition()
  }, [])
  
  return (
    <>
      <Controls
        randomizeHandler={createRandomCellGrid}
        resetHandler={resetCellGrid}
        tickHandler={doGameTick}
      />
      <GameBoard cells={cells} />
    </>
  )
}

export default App
