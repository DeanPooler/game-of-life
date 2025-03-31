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

export default {
  createEmptyCellGrid,
  createRandomCellGrid,
}