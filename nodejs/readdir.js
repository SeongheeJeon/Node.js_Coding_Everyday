const testFolder = "./dasta";
const fs = require("fs");

fs.readdir(testFolder, function (err, files) {
  console.log(err);
  console.log(files);
});
