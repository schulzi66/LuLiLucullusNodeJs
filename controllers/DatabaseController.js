var mysql = require('mysql');
var connection;
var DatabaseController = function() {
}

DatabaseController.prototype.connect = function (user, password, dbo, startServerCallback) {
  connection = mysql.createConnection({
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

DatabaseController.prototype.getConnection = function () {
console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
console.log(connection);
};

module.exports = DatabaseController;
