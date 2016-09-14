var express = require('express');
var app = express();
var pug = require('pug');
var socketio = require('socket.io');

var router = require('./router.js');

// Socket IO variables
var progressValue = 0;
var directionValue = +1;

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });

// Static directories for templating.
app.use('/css', express.static('./node_modules/bootstrap/dist/css/'));
app.use('/css', express.static('./public/css'));
app.use('/js', express.static('./public/js'));
app.use('/js', express.static('./node_modules/bootstrap/dist/js/'));
app.use('/js', express.static('./node_modules/angular/'));
app.use('/js', express.static('./node_modules/jquery/dist/'));
app.use('/js', express.static('./node_modules/socket.io/node_modules/socket.io-client/'));

app.set('views', './public/');
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 1337);

app.use('/*', router);

var server = app.listen(app.get('port'), function() {
	console.log('Server starting on port ' + server.address().port);
});

// Sockets for the client-server communication.

var io = socketio.listen(server, {origins: '*:*'});
var increase = () => {
	progressValue += 10*directionValue;
	if (progressValue == 0) directionValue = +1;
	if (progressValue == 100) directionValue = -1;
}
io.on('connection', socket=> {
	console.log('User Connected.');
	io.emit('data update', {progress: progressValue, direction: directionValue});
	socket.on('button click', () => {
		increase();
		io.emit('data update', {progress: progressValue, direction: directionValue});
	});
	socket.on('disconnect', () => {
		console.log('User Disconnected.')
	});
});
