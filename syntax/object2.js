var f = function () {
  console.log(1);
  console.log(2);
}; // no error
f();

var a = [f];
a[0]();

var o = {
  func: f,
};
o.func();
