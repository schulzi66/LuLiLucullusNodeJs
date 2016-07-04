/**
 * @author
 * Marius Schulze
 */

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

<<<<<<< HEAD
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
=======
DatabaseController.prototype.connect = function (user, password, dbo, startServerCallback) {
  connection = mysql.createConnection({
    host     : 'localhost',
    user     : user,
    password : password,
    database : dbo
  });

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
>>>>>>> 7226aaa50785679058694ff4394f97b520e58e24
}

DatabaseController.prototype.getConnection = function () {
console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
console.log(connection);
return connection;
};

module.exports = DatabaseController;
