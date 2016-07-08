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

DatabaseController.prototype.signupExternalUser = function (req, res, placeholder, internal, method_token) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("ERR: " + err);
            return;
        }
        // Primary key violation must be checked
        var queryString = "Select * from user where email = " + req.user.emails[0].value;

        var user = connection.query(queryString, function (err, rows) {
            connection.release();
            if (!err) {
                return rows;
            }
        });
        //  otherwise user is already signed up
        if (user.length < 0) {
            var familyName;

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(placeholder, salt);

            if (method_token === "twitter") {
                familyName = req.user.displayName.split(" ")[1];
            } else familyName = req.user.name.familyName;

            var queryString = "INSERT INTO USER SET " +
                "name=" + connection.escape(familyName) + ", " +
                "vorname=" + connection.escape(req.user.name.givenName) + ", " +
                "email=" + connection.escape(req.user.emails[0].value) + ", " +
                "password=" + connection.escape(hash) + ", " +
                "lieferadresse_str=" + connection.escape(null) + ", " +
                "lieferadresse_ort=" + connection.escape(null) + ", " +
                "lieferadresse_plz=" + connection.escape(0) + ", " +
                "rechnungsadresse_str=" + connection.escape(null) + ", " +
                "rechnungsadresse_ort=" + connection.escape(null) + ", " +
                "rechnungsadresse_plz=" + connection.escape(0) + ", " +
                "internal=" + connection.escape(internal);

            connection.query(queryString,
                function (err) {
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
                    }
                });
        }
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

        var rech_str, rech_ort, rech_plz;

        if (req.body.rech_str === '') {
            rech_str = req.body.str;
        } else rech_str = req.body.rech_str;

        if (req.body.rech_ort === '') {
            rech_ort = req.body.ort;
        } else rech_ort = req.body.rech_ort;

        if (req.body.rech_plz == '') {
            rech_plz = req.body.plz;
        } else rech_plz = req.body.rech_plz;

        var queryString = "INSERT INTO USER SET " +
            "name=" + connection.escape(req.body.name) + ", " +
            "vorname=" + connection.escape(req.body.vorname) + ", " +
            "email=" + connection.escape(req.body.email) + ", " +
            "password=" + connection.escape(hash) + ", " +
            "lieferadresse_str=" + connection.escape(req.body.street) + ", " +
            "lieferadresse_ort=" + connection.escape(req.body.ort) + ", " +
            "lieferadresse_plz=" + connection.escape(req.body.plz) + ", " +
            "rechnungsadresse_str=" + connection.escape(rech_str) + ", " +
            "rechnungsadresse_ort=" + connection.escape(rech_ort) + ", " +
            "rechnungsadresse_plz=" + connection.escape(rech_plz) + ", " +
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

        var rech_str, rech_ort, rech_plz;

        if (req.body.rech_street === '') {
            rech_str = req.body.street;
        } else rech_str = req.body.rech_street;

        if (req.body.rech_ort === '') {
            rech_ort = req.body.ort;
        } else rech_ort = req.body.rech_ort;

        if (req.body.rech_plz == '') {
            rech_plz = req.body.plz;
        } else rech_plz = req.body.rech_plz;

        var queryString = "UPDATE USER " +
            "SET name=" + connection.escape(req.body.name) + ", " +
            "vorname=" + connection.escape(req.body.vorname) + ", " +
            //"email=" + connection.escape() + ", " +
            "telefon=" + connection.escape(req.body.tel) + ", " +
            "lieferadresse_str=" + connection.escape(req.body.street) + ", " +
            "lieferadresse_ort=" + connection.escape(req.body.ort) + ", " +
            "lieferadresse_plz=" + connection.escape(req.body.plz) + ", " +
            "rechnungsadresse_str=" + connection.escape(rech_str) + ", " +
            "rechnungsadresse_ort=" + connection.escape(rech_ort) + ", " +
            "rechnungsadresse_plz=" + connection.escape(rech_plz) + " " +
            "WHERE email= " + connection.escape(req.body.email);

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
