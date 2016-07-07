var mysql = require('mysql');
var conf = require('../conf.json');
var UserController = require('./UserController');

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

DatabaseController.prototype.signup = function (req, res) {
    console.log("START SIGNUP");
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("ERR: " + err);
            return;
        }
        var queryString = "INSERT INTO USER SET " +
            "name=" + '\'' + req.body.name + '\'' + ", " +
            "vorname=" + '\'' + req.body.vorname + '\'' + ", " +
            "email=" + '\'' + req.body.email + '\'' + ", " +
            "password=" + '\'' + req.body.password + '\'' + ", " +
            "lieferadresse_str=" + '\'' + req.body.street + '\'' + ", " +
            "lieferadresse_ort=" + '\'' + req.body.ort + '\'' + ", " +
            "lieferadresse_plz=" + req.body.plz + ", " +
            "rechnungsadresse_str=" + '\'' + req.body.street + '\'' + ", " +
            "rechnungsadresse_ort=" + '\'' + req.body.ort + '\'' + ", " +
            "rechnungsadresse_plz=" + req.body.plz;

        connection.query(queryString,
            function (err, rows) {
                console.log(queryString);
                connection.release();

                //signup was successful 
                if (!err) {
                    var _userController = new UserController();
                    var user = _userController.createUserModel(req.body.name, req.body.vorname, req.body.email, req.body.password, req.body.street, req.body.plz, req.body.ort);
                    req.session.user = user;
                    res.redirect('/');
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
