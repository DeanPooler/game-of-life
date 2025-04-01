import { useEffect, useState } from 'react'
import _ from "lodash"
import './App.css'
import Controls from './components/Controls'
import GameBoard from './components/GameBoard'
import gridService from './services/gridService'
import useWindowDimensions from './hooks/useWindowDimensions'

const App = () => {
  const { height, width } = useWindowDimensions();
  const gridWidth = (width / 11) - 1;
  const gridHeight = (height / 11) - 1;
  const [isGameLoopActive, setIsGameLoopActive] = useState(false);
  const [tickCount, setTickCount] = useState(0);
  const [cells, setCells] = useState(gridService.createEmptyCellGrid(gridHeight, gridWidth));
  

  const resetCellGrid = () => {
    if (isGameLoopActive) {
      setIsGameLoopActive(false)
    }

    const emptyCellGrid = gridService.createEmptyCellGrid(gridHeight, gridWidth);
    setCells(emptyCellGrid);
  }

  const randomizeCellGrid = () => {
    if (isGameLoopActive) {
      setIsGameLoopActive(false)
    }
    
    const randomCellArray = gridService.createRandomCellGrid(gridHeight, gridWidth);
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
    const xOffset = Math.floor(gridWidth / 2);
    const yOffset = Math.floor(gridHeight / 2);

    handleCellChange(0 + yOffset, 1 + xOffset, true);
    handleCellChange(1 + yOffset, 2 + xOffset, true);
    handleCellChange(2 + yOffset, 0 + xOffset, true);
    handleCellChange(2 + yOffset, 1 + xOffset, true);
    handleCellChange(2 + yOffset, 2 + xOffset, true);
  }

  useEffect(() => {
    setStartingPosition();
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      isGameLoopActive && doGameTick()
      isGameLoopActive && setTickCount(tickCount + 1)
    }, 300)
    return () => clearTimeout(timer)
  }, [isGameLoopActive, tickCount])
  
  return (
    <>
      <Controls
        randomizeCellGrid={randomizeCellGrid}
        resetCellGrid={resetCellGrid}
        doGameTick={doGameTick}
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
