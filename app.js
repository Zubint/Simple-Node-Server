var http = require('http');
var static_content = require('./static');

server = http.createServer(function (request, response){
  static_content(request, response);
  console.log("request was " + request.url);

});

server.listen(7077);
console.log("Server listening on port 7077");
