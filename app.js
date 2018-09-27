var express = require('express');
var app = express();
<<<<<<< HEAD
=======
var port = process.env.PORT || 443;
var http = require('https');
var server = http.Server(app).listen(port);
var listener = server.listen(process.env.port || process.env.PORT || config.port, function () {
  logger.info('Server listening to ' + listener.address().port);
});
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// 讀取組態表
var fs = require('fs');
var config = fs.readFileSync(__dirname + '/config.json', 'utf8');
config = JSON.parse(config);
>>>>>>> Jason.Hung

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api', function (request, response){
   response.send('api success'); 
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});