var fs = require("fs");

/* 
//readFileSync

console.log("a");
var result = fs.readFileSync("syntax/sample.txt", "utf8");
console.log(result);
console.log("c");
*/

function printB(err, result) {
  console.log(result);
}
console.log("a");
fs.readFile("syntax/sample.txt", "utf8", printB);
console.log("c");
