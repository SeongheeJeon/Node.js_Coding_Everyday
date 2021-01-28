var http = require("http");
var fs = require("fs");
var url = require("url");

function templateHTML(title, description, list) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    <ol>
      ${list}
    </ol>
    <h2>${title}</h2>
    <p>${description}</p>
  </body>
  </html>
`;
}

function templateList(filelist) {
  var list = "";

  filelist.forEach((filename) => {
    list += `<li><a href="/?id=${filename}">${filename}</a></li>`;
  });

  return list;
}

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  // console.log(queryData);

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", function (err, filelist) {
        var title = "Welcome";
        var description = "Hello, Node.js";
        var list = templateList(filelist);
        var template = templateHTML(title, description, list);

        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir("./data", function (err, filelist) {
        fs.readFile(
          `data/${queryData.id}`,
          "utf8",
          function (err, description) {
            var title = queryData.id;
            var list = templateList(filelist);
            var template = templateHTML(title, description, list);
            response.writeHead(200);
            response.end(template);
          }
        );
      });
    }
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});

app.listen(3000);
