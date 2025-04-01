const Cell = ({ x, y, populated, changeCell }) => {
  const bg = populated ? "white" : "black"
  const textColor = populated ? "black" : "white"

  const style = {
    backgroundColor: bg,
    width: "50px",
    height: "50px",
    color: textColor
  }

  return (
    <div className="cell" style={style}
      onClick={ () => changeCell(x, y, !populated) }>
      {x},{y}
    </div>
  )
}

export default Cell;