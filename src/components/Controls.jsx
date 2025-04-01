import { useState } from "react"

const Controls = ({ randomizeHandler, resetHandler, tickHandler, toggleGameLoop }) => {
  const [active, setActive] = useState(false);

  let startStopText = active ? "Stop" : "Start";

  const startButtonHandler = () => {
    setActive(!active)
    toggleGameLoop()
  }

  return (
    <div className="controls">
      <button onClick={() => startButtonHandler()}>{startStopText}</button>
      <button onClick={() => randomizeHandler(10, 10)}>Randomize</button>
      <button onClick={() => resetHandler(10, 10)}>Reset</button>
      <button onClick={() => tickHandler()}>Tick</button>
    </div>
  )
}

export default Controls