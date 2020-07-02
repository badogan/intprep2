const fs = require("fs");

function writeToFile(path, dataToBeWritten) {
  const newLine = "\n";
  let dataToWrite = `${dataToBeWritten}${newLine}`;
  try {
    fs.appendFile(path, dataToWrite, err => {
      if (err) throw err;
    });
  } catch (err) {
    console.log(err);
  }
}

function readFileHelper(path) {
  return fs
    .readFileSync(path, "utf8")
    .toString()
    .split("\n");
}

module.exports = { writeToFile, readFileHelper };
