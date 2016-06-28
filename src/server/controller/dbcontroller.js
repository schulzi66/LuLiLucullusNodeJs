var mysql =require('mysql');
var DbController = function() {
}

DbController.prototype.connect = function (user, password, dbo, startServerCallback) {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : user,
    password : password,
    database : dbo
  });

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
    startServerCallback();
  });
}

module.exports = DbController;
