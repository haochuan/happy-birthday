var express = require('express');
var app = express();
var port = process.env.PORT || 12345;

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('index.html');
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});