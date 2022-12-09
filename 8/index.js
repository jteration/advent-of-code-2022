const fs = require("fs");

const input = fs.readFileSync("./8/input.txt").toString().split("\n");
const visibilityMatrix = [];

for (let i = 0; i < input.length; i += 1) {
  const line = input[i];
  visibilityMatrix.push([]);

  for (let j = 0; j < line.length; j += 1) {
    if (i === 0 || j === 0 || i === input.length - 1 || j === input.length - 1) {
      visibilityMatrix[i].push(1);
    } else {
      visibilityMatrix[i].push(0);
    }
  }
}

// Looking left
for (let i = 0; i < input.length; i += 1) {
  const line = input[i];
  let max = 0;

  for (let j = 0; j < line.length; j += 1) {
    const tree = Number(line[j]);

    if (tree > max) {
      visibilityMatrix[i][j] = 1;
      max = tree;
    }
  }
}

// Looking right
for (let i = 0; i < input.length; i += 1) {
  const line = input[i];
  let max = 0;

  for (let j = line.length - 1; j >= 0; j -= 1) {
    const tree = Number(line[j]);

    if (tree > max) {
      visibilityMatrix[i][j] = 1;
      max = tree;
    }
  }
}

// Looking down
let max = 0;

for (let i = 0; i < input[0].length; i += 1) {
  for (let j = 0; j < input.length; j += 1) {
    if (j === 0) max = 0;
    const tree = Number(input[j][i]);

    if (tree > max) {
      visibilityMatrix[j][i] = 1;
      max = tree;
    }
  }
}

// Looking up
for (let i = 0; i < input[0].length; i += 1) {
  for (let j = input.length - 1; j >= 0; j -= 1) {
    if (j === input.length - 1) max = 0;
    const tree = Number(input[j][i]);

    if (tree > max) {
      visibilityMatrix[j][i] = 1;
      max = tree;
    }
  }
}

let visible = 0;

for (let i = 0; i < visibilityMatrix.length; i += 1) {
  for (let j = 0; j < visibilityMatrix[i].length; j += 1) {
    visible += visibilityMatrix[i][j];
  }
}

console.log(visible);

const upperBound = 0;
const rightBound = input.length - 1;
const lowerBound = input[0].length - 1;
const leftBound = 0;

let maxScenicScore = 0;

function getScenicScore(i, j) {
  const tree = Number(input[i][j]);
  let coords = [i, j];
  let up = 0;
  let right = 0;
  let lower = 0;
  let left = 0;

  // looking up
  while (coords[0] > upperBound) {
    coords[0]--;
    const treeAtCoords = Number([input[coords[0]][coords[1]]]);
    up++;

    if (treeAtCoords >= tree) {
      break
    }
  }

  // looking right
  coords = [i, j];
  while (coords[1] < rightBound) {
    coords[1]++;
    const treeAtCoords = Number([input[coords[0]][coords[1]]]);
    right++;

    if (treeAtCoords >= tree) {
      break;
    }
  }

  // looking down
  coords = [i, j];
  while (coords[0] < lowerBound) {
    coords[0]++;
    const treeAtCoords = Number([input[coords[0]][coords[1]]]);
    lower++;

    if (treeAtCoords >= tree) {
      break;
    }
  }

  // looking left
  coords = [i, j];
  while (coords[1] > leftBound) {
    coords[1]--;
    const treeAtCoords = Number([input[coords[0]][coords[1]]]);
    left++

    if (treeAtCoords >= tree) {
      break;
    }
  }

  const scenicScore = up * right * lower * left;

  if (scenicScore > maxScenicScore) {
    maxScenicScore = scenicScore;
  }
}


for (let i = 1; i < input.length - 1; i += 1) {
  for (let j = 1; j < input[i].length - 1; j += 1) {
    getScenicScore(i, j);
  }
}

console.log(maxScenicScore);