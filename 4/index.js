const fs = require("fs");

const input = fs.readFileSync("./4/input.txt").toString();

const inputLines = input.split("\n");

let fullyContained = 0;

for (let i = 0; i < inputLines.length; i += 1) {
  const [range1, range2] = inputLines[i].split(",");
  const [range1Start, range1End] = range1.split("-").map(num => Number(num));
  const [range2Start, range2End] = range2.split("-").map(num => Number(num));

  if (
    (range1Start >= range2Start && range1End <= range2End)
    || (range2Start >= range1Start && range2End <= range1End)
  ) {
    fullyContained++
  };
}

console.log(fullyContained);

let overlapping = 0;

for (let i = 0; i < inputLines.length; i += 1) {
  const [range1, range2] = inputLines[i].split(",");
  const [range1Start, range1End] = range1.split("-").map(num => Number(num));
  const [range2Start, range2End] = range2.split("-").map(num => Number(num));

  if (
    (range1Start >= range2Start && range1Start <= range2End) ||
    (range1End >= range2Start && range1End <= range2End) ||
    (range2Start >= range1Start && range2Start <= range1End) ||
    (range2End >= range1Start && range2End <= range1End)
  ) {
    overlapping++;
  } else {
    console.log(range1);
    console.log(range2);
    console.log();
  }
}

console.log(overlapping);
