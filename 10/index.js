const fs = require("fs");

const input = fs.readFileSync("./10/input.txt").toString().split("\n");

function partOne() {
  let cycle = 0;
  let x = 1;
  let signalStrength = 0;

  for (let i = 0; i < input.length; i += 1) {
    const [instruction, xDelta] = input[i].split(" ");
    let instructionCycle = instruction === "noop" ? 1 : 2;

    for (let i = 0; i < instructionCycle; i += 1) {
      cycle++;

      if (
        cycle === 20
        || cycle === 60
        || cycle === 100
        || cycle === 140
        || cycle === 180
        || cycle === 220
      ) {
        signalStrength += x * cycle;
      }
    }

    if (xDelta) {
      x += Number(xDelta);
    }
  }

  console.log(signalStrength);
}

function partTwo() {
  let x = 1;
  const screen = [];

  for (let i = 0; i < 6; i += 1) {
    const row = [];

    for (let j = 0; j < 40; j += 1) {
      row.push('.');
    }

    screen.push(row);
  }

  let screenPos = [0, 0];

  for (let i = 0; i < input.length; i += 1) {
    const [instruction, xDelta] = input[i].split(" ");
    let instructionCycle = instruction === "noop" ? 1 : 2;

    for (let i = 0; i < instructionCycle; i += 1) {
      if (screenPos[1] === x - 1 || screenPos[1] === x || screenPos[1] === x + 1){
        screen[screenPos[0]][screenPos[1]] = "#";
      }
      
      if (screen[screenPos[0]][screenPos[1] + 1] == null) {
        screenPos[0] += 1;
        screenPos[1] = 0;
      } else {
        screenPos[1] += 1;
      }
    }

    if (xDelta) {
      x += Number(xDelta);
    }
  }

  for (let i = 0; i < screen.length; i += 1) {
    console.log(JSON.stringify(screen[i]));
  }
}

partOne();
partTwo();
