import Cell from "./Cell"

const GameBoard = ({ cells }) => {

  return (
    <div className="game-board">
      {cells && cells.map((row, x) =>
        <div className="row" key={x}>
          {row.map((cell, y) =>
            <Cell
              key={`${x},${y}`}
              x={x}
              y={y}
              populated={cell}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default GameBoard