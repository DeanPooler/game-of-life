import { useEffect, useState } from 'react'
import _ from "lodash"
import './App.css'
import Controls from './components/Controls'
import GameBoard from './components/GameBoard'
import gridService from './services/gridService'

const App = () => {
  const startWidth = 100;
  const startHeight = 100;
  const [isGameLoopActive, setIsGameLoopActive] = useState(false);
  const [tickCount, setTickCount] = useState(0);
  const [cells, setCells] = useState(gridService.createEmptyCellGrid(startHeight, startWidth));

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
    setCells(gridService.getNextGridState(cells));
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
