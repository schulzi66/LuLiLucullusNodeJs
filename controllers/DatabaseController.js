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
// var knex = require('knex')({client: 'mysql', connection: connection });
// var DatabaseController = require('bookshelf')(knex);
//
//
// DatabaseController.connect = function (startServerCallback) {
//   connection.connect(function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }
//     console.log('connected as id ' + connection.threadId);
//     startServerCallback();
//   });
// }
var DatabaseController = function() {
}

DatabaseController.prototype.connect = function (startServerCallback) {
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
    var query = connection.query('SELECT * from user');
    // connection.query(query, function(err, rows, fields) {
    //     if (err) throw err;
    //
    //     for (var i in rows) {
    //         console.log('users: ', rows[i].post_title);
    //     }
    // });
    query.on('result', function (rows) {
      for (var i in rows) {
          console.log('users: ', rows[i].post_title);
      }
    })
    return connection;
    startServerCallback();
  });
}

DatabaseController.prototype.getConnection = function () {
console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
console.log(connection);
return connection;
};

module.exports = DatabaseController;
