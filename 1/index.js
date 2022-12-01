const fs = require("fs");

const input = fs.readFileSync("./1/input.txt", { endcoding: "utf8"}).toString();

const calorieCounts = [];
const inputLines = input.split("\n");

for (let i = 0; i < inputLines.length; i += 1) {
  if (inputLines[i] === "") {
    calorieCounts.push(0);
  } else {
    calorieCounts[calorieCounts.length - 1] = calorieCounts[calorieCounts.length - 1] + Number(inputLines[i]);
  }
}

let max = 0;
let maxIndex = 0;

for (let i = 0; i < calorieCounts.length; i += 1) {
  if (calorieCounts[i] > max) {
    max = calorieCounts[i];
    maxIndex = i;
  }
}

console.log(`max: ${max}`);
console.log(`maxIndex: ${maxIndex}`);
const sorted = calorieCounts.sort((a, b) => a - b);
console.log(sorted);
console.log(sorted.at(-1) + sorted.at(-2) + sorted.at(-3));
