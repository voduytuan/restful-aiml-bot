var http = require("http");
var url = require('url');

AIMLInterpreter = require('AIMLInterpreter');
var aimlInterpreter = new AIMLInterpreter({name:'Teamcrop Bot', age:'2'});
aimlInterpreter.loadAIMLFilesIntoArray(['./test.aiml.xml']);


var PORT = 8088;

var server = http.createServer(function(request, response) {
    var queryData = url.parse(request.url, true).query;

    if (queryData.q) {

        var query = queryData.q;

        //Detect response format (allow json and text)
        var format = 'json';
        if (Object.prototype.hasOwnProperty.call(queryData, 'format') &&queryData.format == 'text') {
            format = 'text';
        }
        aimlInterpreter.findAnswerInLoadedAIMLFiles(query, function(answer, wildCardArray, input) {

            answer = answer != null ? answer : '';

            //base on output format
            if (format == 'json') {
                response.writeHead(200, {"Content-Type": "application/json"});
                response.write(JSON.stringify({
                    text: answer,
                    wildcard: wildCardArray
                }));
            } else {
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write(answer);
            }

        });

    } else {
        response.writeHead(404, {"Content-Type": "application/json"});
        response.write(JSON.stringify({error: 'error_query_required'}));
    }

    response.end();
});

server.listen(PORT);
console.log("Server is listening on port " + PORT + ".\nTry to connect to http://127.0.0.1:" + PORT);