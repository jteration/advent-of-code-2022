const fs = require("fs");

const input = fs.readFileSync("./12/input.txt").toString().split("\n");

const dirDeltas = {
  "up":    [-1,  0],
  "right": [ 0,  1],
  "down":  [ 1,  0],
  "left":  [ 0, -1],
};

const dirDeltaValues = Object.values(dirDeltas);

function BFS(start, end, grid) {
  const visited = new Set();
  const queue = [{ coords: start, level: 0 }];

  while (queue.length) {
    const { coords, level } = queue.shift();
    const [coordsI, coordsJ] = coords;
    const height = grid[coordsI][coordsJ];

    for (let i = 0; i < dirDeltaValues.length; i += 1) {
      const [deltaI, deltaJ] = dirDeltaValues[i];
      const newI = coordsI + deltaI;
      const newJ = coordsJ + deltaJ;
      const coordsKey = `${newI},${newJ}`;
      const newHeight = grid[newI] && grid[newI][newJ];

      if (
        !visited.has(coordsKey)
        && newHeight != null
        && newHeight - height <= 1
      ) {
        if (newI === end[0] && newJ === end[1]) {
          return level + 1;
        }

        visited.add(coordsKey);
        queue.push({ coords: [newI, newJ], level: level + 1 });
      }
    }
  }
}

function partOne() {
  const grid = [];
  const start = [];
  const end = [];

  for (let i = 0; i < input.length; i += 1) {
    const line = input[i];
    grid.push([]);

    for (let j = 0; j < line.length; j += 1) {
      const char = line[j];

      if (char === "S") {
        grid[i].push(0);
        start.push(i, j);
      } else if (char === "E") {
        grid[i].push(25);
        end.push(i, j);
      } else {
        const height = char.charCodeAt() - 97;
        grid[i].push(height);
      }
    }
  }

  const numSteps = BFS(start, end, grid);

  console.log(numSteps);
}

function partTwo() {
  const grid = [];
  const start = [];
  const end = [];

  for (let i = 0; i < input.length; i += 1) {
    const line = input[i];
    grid.push([]);

    for (let j = 0; j < line.length; j += 1) {
      const char = line[j];

      if (char === "S") {
        grid[i].push(0);
        start.push(i, j);
      } else if (char === "E") {
        grid[i].push(25);
        end.push(i, j);
      } else {
        const height = char.charCodeAt() - 97;
        grid[i].push(height);
      }
    }
  }

  let numSteps = 423;

  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      if (grid[i][j] === 0) {
        const test = BFS([i, j], end, grid);

        if (test != null) {
          numSteps = Math.min(test, numSteps);
        }
      }
    }
  }

  console.log(numSteps);
}

partOne();
partTwo();
