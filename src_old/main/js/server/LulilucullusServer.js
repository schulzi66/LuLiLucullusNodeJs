/**
 * @author
 * Beschreibung
 */

var express = require('express');
var app = express();
var prompt = require('prompt');

//controller
var DbController = require('./controller/DbController');
var ErrorController = require('./controller/ErrorController');

//uses
app.use(express.static('../client'));


prompt.start();
prompt.get(['user', 'password', 'dbo'], function (err, result) {
  if (err) { return onErr(err); }
  var _dbController = new DbController();
  _dbController.connect(result.user, result.password, result.dbo, startServer);
});

// app.get('/', function (req, res) {
  // res.send('Hello World!');
// });

function startServer() {
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
}
