const fs = require("fs");

const input = fs.readFileSync("./5/input.txt").toString();
const inputLines = input.split("\n");

const matrix = [
  ["Q", "S", "W", "C", "Z", "V", "F", "T"],
  ["Q", "R", "B"],
  ["B", "Z", "T", "Q", "P", "M", "S"],
  ["D", "V", "F", "R", "Q", "H"],
  ["J", "G", "L", "D", "B", "S", "T", "P"],
  ["W", "R", "T", "Z"],
  ["H", "Q", "M", "N", "S", "F", "R", "J"],
  ["R", "N", "F", "H", "W"],
  ["J", "Z", "T", "Q", "P", "R", "B"],
];

for (let i = 0; i < inputLines.length; i += 1) {
  const line = inputLines[i];
  const [_, amount, __, _from, ___, _to] = line.split(" ");
  const from = Number(_from) - 1;
  const to = Number(_to) - 1;

  const start = matrix[from].length - Number(amount);

  for (let i = start; i < matrix[from].length; i += 1) {
    matrix[to].push(matrix[from][i]);
  }
  
  matrix[from].length = matrix[from].length - Number(amount);
}

console.log(matrix);
