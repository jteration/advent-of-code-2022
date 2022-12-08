const fs = require("fs");

const input = fs.readFileSync("./6/input.txt").toString();

const counts = {};
let uniques = 0;

for (let i = 0; i < 14; i += 1) {
  const char = input[i];
  if (counts[char] == null) counts[char] = 0;
  counts[char]++

  if (counts[char] === 1) uniques++;
  if (counts[char] === 2) uniques--;
}

console.log(counts);
console.log(uniques);

for (let i = 14; i < input.length; i += 1) {
  const removedChar = input[i - 14];
  const char = input[i];
  if (counts[char] == null) counts[char] = 0;
  counts[char]++
  if (counts[char] === 1) uniques++;
  if (counts[char] === 2) uniques--;
  counts[removedChar]--;
  if (counts[removedChar] === 1) uniques++;
  if (counts[removedChar] === 0) uniques--;

  if (uniques === 14) {
    console.log(counts);
    console.log(i);
    return;
  }
}
