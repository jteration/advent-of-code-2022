const fs = require("fs");

const input = fs.readFileSync("./11/input.txt").toString().split("\n\n");

function partOne() {
  const monkeys = [];

  for (let i = 0; i < input.length; i += 1) {
    const monkeySection = input[i];
    const [, itemsLine, operationLine, testLine, conditionOneLine, conditionTwoLine] = monkeySection.split("\n");
    const [,,,, ...items] = itemsLine.split(" ").map(item => item.split(",")[0]);
    const [, left, op, right] = operationLine.split("=")[1].split(" ");
    const divisor = testLine.split(" ").at(-1);
    const ifTrue = conditionOneLine.split(" ").at(-1);
    const ifFalse = conditionTwoLine.split(" ").at(-1);

    monkeys.push({
      i,
      items: items.map(item => BigInt(item)),
      operation: { left, op, right },
      test: {
        divisor: BigInt(divisor),
        ifTrue: Number(ifTrue),
        ifFalse: Number(ifFalse)
      },
      count: 0
    });
  }

  for (let round = 0; round < 20; round += 1) {
    for (let i = 0; i < monkeys.length; i += 1) {
      const { items, operation, test } = monkeys[i];
      const itemsLength = items.length;
      monkeys[i].count += itemsLength;

      for (let j = 0; j < itemsLength; j += 1) {
        let item = items.shift();
        const { op, right } = operation;

        if (op === "*") {
          item *= (right === "old")
            ? item
            : BigInt(right);
        } else {
          item += (right === "old")
            ? item
            : BigInt(right);
        }

        item = item / BigInt(3);

        const { divisor, ifTrue, ifFalse } = test;

        if (item % divisor === 0n) {
          monkeys[ifTrue].items.push(item);
        } else {
          monkeys[ifFalse].items.push(item);
        }
      }
    }
  }

  console.log(monkeys.sort((a, b) => a.count - b.count).map(({ i, count }) => ({ i, count })));
}

function partTwo() {
  const monkeys = [];
  let divider = BigInt(1);

  for (let i = 0; i < input.length; i += 1) {
    const monkeySection = input[i];
    const [, itemsLine, operationLine, testLine, conditionOneLine, conditionTwoLine] = monkeySection.split("\n");
    const [,,,, ...items] = itemsLine.split(" ").map(item => item.split(",")[0]);
    const [, left, op, right] = operationLine.split("=")[1].split(" ");
    const divisor = testLine.split(" ").at(-1);
    const ifTrue = conditionOneLine.split(" ").at(-1);
    const ifFalse = conditionTwoLine.split(" ").at(-1);

    divider *= BigInt(divisor);

    monkeys.push({
      i,
      items: items.map(item => BigInt(item)),
      operation: { left, op, right },
      test: {
        divisor: BigInt(divisor),
        ifTrue: Number(ifTrue),
        ifFalse: Number(ifFalse)
      },
      count: 0
    });
  }

  for (let round = 0; round < 10000; round += 1) {
    for (let i = 0; i < monkeys.length; i += 1) {
      const { items, operation, test } = monkeys[i];
      const itemsLength = items.length;
      monkeys[i].count += itemsLength;

      for (let j = 0; j < itemsLength; j += 1) {
        let item = items.shift();
        const { op, right } = operation;

        if (op === "*") {
          item *= (right === "old")
            ? item
            : BigInt(right);
        } else {
          item += (right === "old")
            ? item
            : BigInt(right);
        }

        item %= divider;

        const { divisor, ifTrue, ifFalse } = test;

        if (item % divisor === 0n) {
          monkeys[ifTrue].items.push(item);
        } else {
          monkeys[ifFalse].items.push(item);
        }
      }
    }
  }

  console.log(monkeys.sort((a, b) => a.count - b.count).map(({ i, count }) => ({ i, count })));
}

partOne();
partTwo();
