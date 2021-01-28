var http = require("http");
var fs = require("fs");
var url = require("url");

function createTemplate(title, description, list) {
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

function createList(filelist) {
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

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", function (err, filelist) {
        var title = "Welcome";
        var description = "Hello, Node.js";
        var list = createList(filelist);
        var template = createTemplate(title, description, list);

        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readFile(`data/${queryData.id}`, "utf8", function (err, _description) {
        fs.readdir("./data", function (err, filelist) {
          var title = queryData.id;
          var description = _description;
          var list = createList(filelist);
          var template = createTemplate(title, description, list);

          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else {
    response.writeHead(404);
    response.end("Not Found");
  }
});

app.listen(3000);
