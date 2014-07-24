var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();

app.set('port', process.env.PORT || 5000);
app.use(express.static(__dirname + '/app'));    // set the static files location /app/foo will be /foo for users
app.use(logger('dev'));                         // log every request to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({                 // pull information from html in POST
  extended: true
}));

//application - single file view of the app

app.get('*', function(req, res) {
  res.sendfile('./app/index.html');
});

app.listen(app.get('port'));
console.log("App listening on port " + app.get('port'));