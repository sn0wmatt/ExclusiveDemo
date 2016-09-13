var express = require('express');
var app = express();
var pug = require('pug');

var router = require('./router.js');

// Static directories for templating.
app.use('/css', express.static('./node_modules/bootstrap/dist/css/'));
app.use('/js', express.static('./public/js'));
app.use('/js', express.static('./node_modules/bootstrap/dist/js/'));
app.use('/js', express.static('./node_modules/angular/'));
app.use('/js', express.static('./node_modules/jquery/dist/'))

app.set('views', './public/');
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 1337);

app.use('/*', router);

var server = app.listen(app.get('port'), function() {
	console.log('Server starting on port ' + server.address().port);
});