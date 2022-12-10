const fs = require("fs");

const input = fs.readFileSync("./9/input.txt").toString().split("\n");

function partOne() {
  const H = [0, 0];
  const T = [0, 0];
  const tVisited = {};
  let numTVisited = 0;
  
  const directionToDelta = {
    U: [ 0,  1],
    R: [ 1,  0],
    D: [ 0, -1],
    L: [-1,  0]
  };
  
  for (let i = 0; i < input.length; i += 1) {
    const [direction, steps] = input[i].split(" ");
    const numSteps = Number(steps);
    // Mark T visit
    const tKey = `${T[0]},${T[1]}`;

    if (tVisited[tKey] == null) {
      tVisited[tKey] = true;
      numTVisited++;
    }
  
    for (let i = 0; i < numSteps; i += 1) {
      // Handle H
      const hOldPosition = [H[0], H[1]];
      const delta = directionToDelta[direction];
      H[0] += delta[0];
      H[1] += delta[1];
  
      // Handle T
      const xDistance = Math.abs(T[0] - H[0]);
      const yDistance = Math.abs(T[1] - H[1]);
  
      if (xDistance === 2 || yDistance === 2) {
        const isDiagonal = xDistance !== 0 && yDistance !== 0;
  
        if (isDiagonal) {
          T[0] = hOldPosition[0];
          T[1] = hOldPosition[1];
        } else {
          T[0] += delta[0];
          T[1] += delta[1];
        }
      }
      // Mark T visit
      const tKey = `${T[0]},${T[1]}`;

      if (tVisited[tKey] == null) {
        tVisited[tKey] = true;
        numTVisited++;
      }
    }
  }
  
  console.log(numTVisited);
  // 6142
  // 6175
}

function partTwo() {
  const H = [0, 0];
  const tails = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0]
  ];
  const tVisited = {};
  let numTVisited = 0;
  
  const directionToDelta = {
    U: [ 0,  1],
    R: [ 1,  0],
    D: [ 0, -1],
    L: [-1,  0]
  };
  
  for (let i = 0; i < input.length; i += 1) {
    const [direction, steps] = input[i].split(" ");
    const numSteps = Number(steps);
    // Mark T visit
    const tKey = `${tails[8][0]},${tails[8][1]}`;

    if (tVisited[tKey] == null) {
      tVisited[tKey] = true;
      numTVisited++;
    }
  
    for (let i = 0; i < numSteps; i += 1) {
      // Handle H
      const hOldPosition = [H[0], H[1]];
      const delta = directionToDelta[direction];
      H[0] += delta[0];
      H[1] += delta[1];
  
      // Handle T
      for (let i = 0; i < tails.length; i += 1) {
        const tail = tails[i];
        const prevTail = tails[i - 1] || H;
        const xDistance = Math.abs(tail[0] - prevTail[0]);
        const yDistance = Math.abs(tail[1] - prevTail[1]);
    
        if (xDistance === 2 || yDistance === 2) {
          const isDiagonal = xDistance !== 0 && yDistance !== 0;
    
          if (isDiagonal) {
            if (tail[0] > prevTail[0]) {
              tail[0]--;
            } else {
              tail[0]++
            }
            if (tail[1] > prevTail[1]) {
              tail[1]--
            } else {
              tail[1]++
            }
          } else {
            if (xDistance > 0) {
              if (tail[0] > prevTail[0]) {
                tail[0]--;
              } else {
                tail[0]++
              }
            } else {
              if (tail[1] > prevTail[1]) {
                tail[1]--;
              } else {
                tail[1]++;
              }
            }
          }
        }

        hOldPosition[0] = tail[0];
        hOldPosition[1] = tail[1];
      }
      // Mark T visit
      const tKey = `${tails[8][0]},${tails[8][1]}`;

      if (tVisited[tKey] == null) {
        tVisited[tKey] = true;
        numTVisited++;
      }
    }
  
  }
  
  console.log(numTVisited);
  // 651 - Too low
  // 1163 - Too low
  // 2578
}

partOne();
partTwo();
