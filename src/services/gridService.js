const createEmptyCellGrid = (height, width) => {
  const cellsArray = []
  for (let x = 0; x < height; x++) {
    cellsArray[x] = [];
    for (let y = 0; y < width; y++) {
      cellsArray[x][y] = false;
    }
  }
  return cellsArray;
}

const createRandomCellGrid = (height, width) => {
  const cellsArray = [];
  for (let x = 0; x < height; x++) {
    cellsArray[x] = [];
    for (let y = 0; y < width; y++) {
      cellsArray[x][y] = Math.random() < 0.5;
    }
  }
  return cellsArray;
}

const getNextGridState = (currentGrid) => {
  const size = currentGrid.length
  const newGrid = currentGrid.map((row) => [...row])

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let neighbours = 0;

      for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
          if (di === 0 && dj === 0) continue;
          const ni = i + di
          const nj = j + dj

          if (ni >= 0 && ni < size && nj >= 0 && nj < size) {
            neighbours += currentGrid[ni][nj] ? 1 : 0;
          }
        }
      }

      newGrid[i][j] = currentGrid[i][j] ? neighbours === 2 || neighbours === 3 : neighbours === 3;
    }
  }

  return newGrid;
}

export default {
  createEmptyCellGrid,
  createRandomCellGrid,
  getNextGridState

}