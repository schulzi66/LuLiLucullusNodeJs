var mysql = require('mysql');
var conf = require('../conf.json');

var pool = mysql.createPool({
    host: conf.database.host,
    user: conf.database.user,
    password: conf.database.password,
    database: conf.database.dbo,
    charset: conf.database.charset,
    connectionLimit: conf.database.connectionLimit
});

var DatabaseController = function () {
}


DatabaseController.prototype.connect = function (startServerCallback) {
    pool.getConnection(function (err, connection) {
        console.log('connected as id ' + connection.threadId);
        startServerCallback();
    });
}

DatabaseController.prototype.signup = function (req, res, email, password) {
    console.log("START SIGNUP");
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("ERR: " + err);
            return;
        }

        var queryString = "INSERT INTO USER SET name='TestName', vorname='TestVorName', email=" + '\'' + req.body.email + '\'' + ", password="+ '\'' + req.body.password + '\'';
        connection.query(queryString,
            function (err, rows) {
                console.log(queryString);
                connection.query("SELECT * FROM USER");
                connection.release();

                if (!err) {
                    res.json(rows);
                }
            });
        connection.on('error', function (err) {
            console.log("ERR: " + err);
            return;
        });
    });
    console.log("SUCCESS");
}

module.exports = DatabaseController;
