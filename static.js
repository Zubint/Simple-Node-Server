// var url = require('url');
var fs = require('fs');
module.exports = function (request, response){
  // var reqObj = url.parse(request.url, false, true);
  //we assume the following:
  //1.  requests for html -> files will be found in /views & subdirectories
  //2.  requests for css -> files will be found in /stylesheets & subdirectories
  //3.  requests for image -> files will be found in /images & subdirectories

    var requestType =0;
    var requestContentType = "";
    var fileBaseDir = "";
    var encoding ="";
    var typesArray = [[".html","text/html", "./views", "utf8"], [".css", "text/css", "./stylesheets", "utf8"], [".png", "image/png", "./images", ""], [".jpg", "image/jpg", "./images",""],
    [".jpeg", "image/jpg", "./images",""]];


    for (var idx=0; idx<typesArray.length; idx++){
      if (request.url.search(typesArray[idx][0])>0){
        requestType = typesArray[idx][0];
        requestContentType = typesArray[idx][1];
        fileBaseDir = typesArray[idx][2];
        encoding = typesArray[idx][3];
        break;
      }
    }

    if (request.url === '/'){
    fs.readFile('index.html', 'utf8', function(errors, contents){
      response.writeHead(200, {'Content-type': 'text/html'});
       response.write(contents);
       response.end();
    });
  }else{
        // console.log("./"+request.url);
          var fileName = (fileBaseDir+request.url).toString();
          console.log(fileName);
          fs.stat(fileName, function(err, stat){
            if (err === null){
              // console.log(fileName);
                  fs.readFile(fileName, encoding, function(errors, contents){
                  response.writeHead(200, {'Content-type': requestContentType});
                  response.write(contents);
                  response.end();
                  });
            }else if(err.code === 'ENOENT'){
              // console.log(fileName);
                  fs.readFile('./views/404.html', 'utf8', function (errors, contents){
                    response.writeHead(400, {'Content-type': 'text/html'});
                    response.write(contents);
                    response.end();
                  });
            }else{
              response.end("An error occurred: " + err.code);
            }
      });
  }
}
