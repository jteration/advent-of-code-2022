const fs = require("fs");
const input = fs.readFileSync("./7/input.txt").toString().split("\n");

let currentDir = "";
const dirs = {};

function getSize(obj) {
  const keys = Object.keys(obj);
  let size = 0;

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];

    if (key !== "__size") {
      if (typeof obj[key] === "number") {
        size += obj[key]
      } else {
        size += getSize(obj[key]);
      }
    }
  }

  return size;
}

Object.defineProperty(dirs, '__size', {
  get: function() {
    return getSize(this);
  }.bind(dirs)
});

for (let i = 0; i < input.length; i += 1) {
  const line = input[i];

  if (line.startsWith("$")) {
    const [$, command, dir] = line.split(" ");

    if (command === "cd") {
      if (dir === "/") {
        currentDir = "";
      } else if (dir === "..") {
        const split = currentDir.split("/");
        split.pop();
        currentDir = split.join("/");
      } else {
        currentDir += "/" + dir;
      }
    } else if (command === "ls") {
      isLs = true;
    } else {
      console.log("huh");
      console.log(line.split(" "));
      console.log();
    }
  } else {
    const path = currentDir.split("/");
    let current = dirs;

    for (let i = 0; i < path.length; i += 1) {
      if (path[i] !== "") {
        current = current[path[i]];
      }
    }

    const [a, b] = line.split(" ");

    if (a === "dir") {
      current[b] = {};
      Object.defineProperty(current[b], '__size', {
        get: function() {
          return getSize(this);
        }.bind(current[b])
      });
    } else {
      current[b] = Number(a);
    }
  }
}

const dirsUnder10K = [];

let minimumDirWithRightSize = Number.MAX_SAFE_INTEGER;

function getSizesUnder10K(obj, dirname) {
  const keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];

    if (key !== "__size") {
      if (typeof obj[key] === "object") {
        getSizesUnder10K(obj[key], key);
      }
    }
  }
  console.log(obj.__size);

  if (obj.__size >= 528671) {
    console.log(dirname)
    console.log(obj.__size);
    minimumDirWithRightSize = Math.min(minimumDirWithRightSize, obj.__size);
  }
}

getSizesUnder10K(dirs, "/");

console.log(minimumDirWithRightSize);