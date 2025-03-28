const Cell = ({ x, y, populated }) => {
  const bg = populated ? "white" : "black"
  const textColor = populated ? "black" : "white"

  const style = {
    backgroundColor: bg,
    width: "50px",
    height: "50px",
    color: textColor
  }

  return (
    <div className="cell" style={style}>
      {x},{y}
    </div>
  )
}

export default Cell;