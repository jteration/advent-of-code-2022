const fs = require("fs");

const input = fs.readFileSync("./2/input.txt").toString();

const inputLines = input.split("\n");

const themToMe = {
  A: {
    X: 3 + 0,
    Y: 1 + 3,
    Z: 2 + 6
  },
  B: {
    X: 1 + 0,
    Y: 2 + 3,
    Z: 3 + 6
  },
  C: {
    X: 2 + 0,
    Y: 3 + 3,
    Z: 1 + 6
  }
}

let points = 0;

for (let i = 0; i < inputLines.length; i += 1) {
  const [them, me] = inputLines[i].split(" ");
  if (them == null || me == null) break;
  points += themToMe[them][me];
}

console.log(points);
