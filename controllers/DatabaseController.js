var mysql = require('mysql');
var conf = require('../conf.json');
var UserModelController = require('./UserModelController');
var bcrypt = require('bcrypt-nodejs');

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

DatabaseController.prototype.signupExternalUser = function (req, res, placeholder, internal) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("ERR: " + err);
            return;
        }

        var queryString = "INSERT INTO USER SET " +
            "name=" + connection.escape(req.user.name.familyName) + ", " +
            "vorname=" + connection.escape(req.user.name.givenName) + ", " +
            "email=" + connection.escape(req.user.emails[0].value) + ", " +
            "password=" + connection.escape(placeholder) + ", " +
            "lieferadresse_str=" + connection.escape(null) + ", " +
            "lieferadresse_ort=" + connection.escape(null) + ", " +
            "lieferadresse_plz=" + connection.escape(12345) + ", " +
            "rechnungsadresse_str=" + connection.escape(null) + ", " +
            "rechnungsadresse_ort=" + connection.escape(null) + ", " +
            "rechnungsadresse_plz=" + connection.escape(12345) + ", " +
            "internal=" + connection.escape(internal);

        connection.query(queryString,
            function (err) {
                connection.release();

                //signup was successful
                if (!err) {
                  console.log("facebook login successful");
                    var _userModelController = new UserModelController();
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
                    //req.session.user = user;
                    res.redirect('/');
                }
            });

        connection.on('error', function (err) {
            console.log("ERR: " + err);
            return;
        });
    });
}

DatabaseController.prototype.signup = function (req, res, internal) {
    console.log("START SIGNUP");
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("ERR: " + err);
            return;
        }
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        var queryString = "INSERT INTO USER SET " +
            "name=" + connection.escape(req.body.name) + ", " +
            "vorname=" + connection.escape(req.body.vorname) + ", " +
            "email=" + connection.escape(req.body.email) + ", " +
            "password=" + connection.escape(hash) + ", " +
            "lieferadresse_str=" + connection.escape(req.body.street) + ", " +
            "lieferadresse_ort=" + connection.escape(req.body.ort) + ", " +
            "lieferadresse_plz=" + connection.escape(req.body.plz) + ", " +
            "rechnungsadresse_str=" + connection.escape(req.body.rech_street) + ", " +
            "rechnungsadresse_ort=" + connection.escape(req.body.rech_ort)+ ", " +
            "rechnungsadresse_plz=" + connection.escape(req.body.rech_plz) + ", " +
            "internal=" + connection.escape(internal);

        connection.query(queryString,
            function (err) {
                console.log(queryString);
                connection.release();

                if (!err) {
                    var _userModelController = new UserModelController();
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
}

DatabaseController.prototype.updateUser = function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("ERR: " + err);
            return;
        }

        var queryString = "UPDATE USER " +
            "SET name=" + connection.escape(req.body.name) +
            " WHERE email= " + connection.escape(req.body.email);

        connection.query(queryString,
            function (err) {
                connection.release();

                if (!err) {
                    res.redirect('/');
                }
            });

        connection.on('error', function (err) {
            console.log("ERR: " + err);
            return;
        });
    });
}
module.exports = DatabaseController;
