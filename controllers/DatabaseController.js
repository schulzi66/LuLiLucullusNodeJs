var mysql = require('mysql');
var conf = require('../conf.json');
var UserModelController = require('./UserModelController');

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

DatabaseController.prototype.getUserByMail = function (email) {
    pool.getConnection(function (err, connection) {
      if (err) {
          console.log("ERR: " + err);
          return;
      }
      var queryString = "Select * from user where email = " + email;

      connection.query(queryString, function (err, rows) {
        connection.release();
        if (!err) {
          return rows;
        }
      });

      connection.on('error', function (err) {
          console.log("ERR: " + err);
          return;
      });

    })
}

DatabaseController.prototype.signupExternalUser = function (name, givenName, passwordPlaceholder, email) {
    console.log("START SIGNUP");
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("ERR: " + err);
            return;
        }
        var queryString = "INSERT INTO USER SET " +
            "name=" + '\'' + name + '\'' + ", " +
            "vorname=" + '\'' + givenName + '\'' + ", " +
            "email=" + '\'' + email + '\'' + ", " +
            "password=" + '\'' + passwordPlaceholder + '\'' + ", " +
            "lieferadresse_str=" + '\'' + null + '\'' + ", " +
            "lieferadresse_ort=" + '\'' + null + '\'' + ", " +
            "lieferadresse_plz=" + null + ", " +
            "rechnungsadresse_str=" + '\'' + null + '\'' + ", " +
            "rechnungsadresse_ort=" + '\'' + null + '\'' + ", " +
            "rechnungsadresse_plz=" + '\'' + null + '\'' + ", " +
            "internal=" + false;

        connection.query(queryString,
            function (err) {
                console.log(queryString);
                connection.release();

                //signup was successful
                if (!err) {
                  console.log("facebook login successful");
                    // var _userController = new UserModelController();
                    // var user = _userModelController.createUserModel(req.body.name,
                    //     req.body.vorname,
                    //     req.body.email,
                    //     req.body.password,
                    //     req.body.street,
                    //     req.body.ort,
                    //     req.body.plz,
                    //     req.body.rech_street,
                    //     req.body.rech_ort,
                    //     req.body.rech_plz,
                    //     internal);
                    // req.session.user = user;
                    // res.redirect('/');
                }
            });

        connection.on('error', function (err) {
            console.log("ERR: " + err);
            return;
        });
    });
    console.log("SUCCESS");
}

DatabaseController.prototype.signup = function (req, res, internal) {
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
            "rechnungsadresse_str=" + '\'' + req.body.rech_street + '\'' + ", " +
            "rechnungsadresse_ort=" + '\'' + req.body.rech_ort + '\'' + ", " +
            "rechnungsadresse_plz=" + '\'' + req.body.rech_plz + '\'' + ", " +
            "internal=" + true;

        connection.query(queryString,
            function (err) {
                console.log(queryString);
                connection.release();

                //signup was successful
                if (!err) {
                    var _userController = new UserModelController();
                    var user = _userModelController.createUserModel(req.body.name,
                        req.body.vorname,
                        req.body.email,
                        req.body.password,
                        req.body.street,
                        req.body.ort,
                        req.body.plz,
                        req.body.rech_street,
                        req.body.rech_ort,
                        req.body.rech_plz,
                        internal);
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
