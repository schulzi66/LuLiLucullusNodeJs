var mysql = require('mysql');
var conf = require('../conf.json');
var connection = mysql.createConnection({
  host     : conf.database.host,
  user     : conf.database.user,
  password : conf.database.password,
  database : conf.database.dbo,
  port     : conf.database.port,
  charset  : 'utf8'
});

var DatabaseController = function() {
}

DatabaseController.prototype.connect = function (startServerCallback) {
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
        startServerCallback();
    });

    connection.query('CREATE TABLE IF NOT EXISTS test_table (id int not NULL)', function (err, rows, fields) {
        if (!err) {
            console.log("Success " + rows)
        } else {
            console.log("Error while proceeding");
        }
    });

    connection.query('SELECT * from user', function(err, rows, fields) {
      if (!err) {
        for (var i in rows) {
              console.log('users: ', rows[i]);
            }
      } else {
        console.log(err);
      }
    })
    return connection;
}

module.exports = DatabaseController;
