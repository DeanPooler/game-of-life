const Cell = ({ x, y, populated, changeCell }) => {
  const bg = populated ? "gray" : "silver"

  const style = {
    backgroundColor: bg,
  }

  return (
    <div className="cell" style={style}
      onClick={ () => changeCell(x, y, !populated) }>
    </div>
  )
}

export default Cell;