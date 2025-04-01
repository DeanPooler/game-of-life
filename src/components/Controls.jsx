import { useState } from "react"

const Controls = ({ randomizeCellGrid, resetCellGrid, doGameTick, toggleGameLoop }) => {
  const [active, setActive] = useState(false);

  let startStopText = active ? "Stop" : "Start";

  const startButtonHandler = () => {
    setActive(!active)
    toggleGameLoop()
  }

  return (
    <div className="control-wrapper">
      <div className="controls">
        <button onClick={() => startButtonHandler()}>{startStopText}</button>
        <button onClick={() => {randomizeCellGrid(); setActive(false)} }>Randomize</button>
        <button onClick={() => {resetCellGrid(); setActive(false)} }>Reset</button>
        <button onClick={() => doGameTick()}>Tick</button>
      </div>
    </div>
  )
}

export default Controls