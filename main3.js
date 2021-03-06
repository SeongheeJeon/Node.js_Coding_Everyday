var http = require("http");
var fs = require("fs");
var url = require("url");

function createTemplate(title, description) {
  var list = "aa";

  fs.readdir("./data", function (err, filelist) {
    filelist.forEach((filename) => {
      list += `<li><a href="/?id=${filename}">${filename}</a></li>`;
      console.log(list);
    });
  });

  var template = `
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
  return template;
}

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      var title = "Welcome";
      var description = "Hello, Node.js";

      response.writeHead(200);
      response.end(createTemplate(title, description));
    } else {
      fs.readFile(`data/${queryData.id}`, "utf8", function (err, _description) {
        var title = queryData.id;
        var description = _description;

        response.writeHead(200);
        response.end(createTemplate(title, description));
      });
    }
  } else {
    response.writeHead(404);
    response.end("Not Found");
  }
});

app.listen(3000);
