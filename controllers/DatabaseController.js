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


DatabaseController.prototype.getUserByEmail = function (req, res, email) {
    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }
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

DatabaseController.prototype.signup = function (req, res, email, password) {
    console.log("START SIGNUP");
    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }
        connection.query('INSERT INTO USER SET id=4, name=test, vorname=test, email=' + email + ', password=' + password + 'lieferadresse_str=Musterstraße, lieferadresse_ort=Musterort, lieferadresse_plz=12345, rechnungsadresse_str=Musterstraße, rechnungsadresse_ort=Musterort, rechnungsadresse_plz=12345)', function (err, rows) {
            console.log(connection.query());
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
    console.log("SUCCESS");
}

module.exports = DatabaseController;
