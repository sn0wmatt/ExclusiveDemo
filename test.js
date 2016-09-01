/* Recently obtained new development machine, fresh node install */
var http = require("http")

http.createServer(function (request, responce) {
	responce.writeHead(200, {'Content-Type': 'text/plain'});
	responce.end('Server is working! \n');
}).listen(8080);