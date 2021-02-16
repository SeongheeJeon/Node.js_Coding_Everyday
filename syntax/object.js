var members = ["egoing", "k9949", "hee"];
console.log(members[1]);
var i = 0;
while (i < members.length) {
  console.log("array loop", members[i]);
  i = i + 1;
}

var roles = {
  programmer: "egoing",
  designer: "k9949",
  manager: "hee",
};
console.log(roles.designer);

for (var role in roles) {
  console.log("object => ", role, "value => ", roles[role]);
}
