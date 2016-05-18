// var url = require('url');
var fs = require('fs');
module.exports = function (request, response){
  // var reqObj = url.parse(request.url, false, true);
  //we assume the following:
  //1.  requests for html -> files will be found in /views & subdirectories
  //2.  requests for css -> files will be found in /stylesheets & subdirectories
  //3.  requests for image -> files will be found in /images & subdirectories

    var requestType =0;
    var typesArray = [".html", ".css", ".png", ".jpg", ".jpeg", ".css"];

    for (var idx=0; idx<typesArray.length; idx++){
      if (request.url.search(typesArray[idx])>0){
        requestType = typesArray[idx];
        break;
      }
    }

    if (request.url === '/'){
    fs.readFile('index.html', 'utf8', function(errors, contents){
      response.writeHead(200, {'Content-type': 'text/html'});
       response.write(contents);
       response.end();
    });
  }else if (requestType===".html"){
        // console.log("./"+request.url);
          var fileName = ('./views'+request.url).toString();
          fs.stat(fileName, function(err, stat){
            if (err === null){
              fs.readFile(fileName, 'utf8', function(errors, contents){
              response.writeHead(200, {'Content-type': 'text/html'});
              response.write(contents);
              response.end();
              });
            }else if(err.code === 'ENOENT'){
              fs.readFile('./views/404.html', 'utf8', function (errors, contents){
                response.writeHead(400, {'Content-type': 'text/html'});
                response.write(contents);
                response.end();
              })
            }else{
              response.end("An error occurred: " + err.code);
            }
          });
          }else if (requestType ===".jpg" || requestType===".jpeg"){
          var fileName = ('./images/'+request.url).toString();
          // console.log("./images/" +request.url);
          fs.readFile(fileName, function(errors, contents){
            if(errors){
              response.end("file not found");
            };
          response.writeHead(200, {'Content-type': 'image/jpg'});
          response.write(contents);
          response.end();
        });
    }else if (requestType ===".png"){
        var fileName = ('./images/'+request.url).toString();
        // console.log("./images/" +request.url);
        fs.readFile(fileName, function(errors, contents){
        response.writeHead(200, {'Content-type': 'image/png'});
        response.write(contents);
        response.end();
        });
    }else if (requestType === ".css"){
      var fileName = ("./stylesheets/"+request.url);
      fs.readFile(fileName, 'utf8', function(errors, contents){
        if(errors){
          response.end("Css file not found");
          console.log(errors);
          resume();
        };
        response.writeHead(200, {'Content-type': 'text/css'});
        response.write(contents);
        response.end();
      });
    }else{
      response.end("File Not found");
    }
  }


    // console.log(request);
