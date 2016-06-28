var express = require('express');
var app = express();
var DbController = require('./controller/dbcontroller');

app.use(express.static('../client'));


var _dbController = new DbController();
_dbController.connect();



// app.get('/', function (req, res) {
  // res.send('Hello World!');
// });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
