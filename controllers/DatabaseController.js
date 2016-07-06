var mysql = require('mysql');
var conf = require('../conf.json');

var pool = mysql.createPool({
    host: conf.database.host,
    user: conf.database.user,
    password: conf.database.password,
    database: conf.database.dbo,
    port: conf.database.port,
    charset: conf.database.charset,
    connectionLimit: conf.database.connectionLimit,
    debug: false
});

var DatabaseController = function () {
}

// DatabaseController.prototype.connect = function (startServerCallback) {
//     pool.getConnection(function (err, connection) {
//         console.log('connected as id ' + connection.threadId);
//         startServerCallback();
//     });
// }


DatabaseController.prototype.connect = function(startServerCallback, req, res, email) {
    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }
        console.log('connected as id ' + connection.threadId);
        startServerCallback();
        connection.query('SELECT * FROM USER WHERE email = ' + email, function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
            }
        });

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        });
    });
}

module.exports = DatabaseController;
