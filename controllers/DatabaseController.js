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

DatabaseController.prototype.hash = function (password) {
    var hash = bcrypt.hashSync(password, null, null);
    return hash;
    /*bcrypt.hash(password, null, null, function (err, hash) {
        if (err) {
            console.log(err);
        } else {
            console.log("DBController, PW:" + password, "HASH: " + hash);
            return hash;
        }
    });*/
}

DatabaseController.prototype.connect = function (startServerCallback) {
    pool.getConnection(function (err, connection) {
        console.log('connected as id ' + connection.threadId);
        startServerCallback();
    });
}

DatabaseController.prototype.getUserByEmail = function (req, res, email, callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "SELECT * FROM USER WHERE email=" + connection.escape(email);
        console.log("queryString: " + queryString);
        connection.query(queryString, function (err, rows) {
            connection.release();
            if (!err) {
                callback(req, res, rows[0]);
            }
        });

        connection.on('error', function (err) {
            console.log("ERR: " + err);
            return;
        });
    });
};

DatabaseController.prototype.loadAllRecipes = function (callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "SELECT * FROM RECIPE";
        connection.query(queryString, function (err, rows) {
            connection.release();
            if (!err) {
                callback(rows);
            }
        });

        connection.on('error', function (err) {
            console.log("ERR: " + err);
            return;
        });
    });
};

DatabaseController.prototype.loadRecipeFromId = function (id, callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "SELECT * FROM RECIPE WHERE ID=" + connection.escape(id);
        connection.query(queryString, function (err, rows) {
            connection.release();
            if (!err) {
                callback(rows[0]);
            }
        });

        connection.on('error', function (err) {
            console.log("ERR: " + err);
            return;
        });
    });
};

DatabaseController.prototype.signupExternalUser = function (req, res, placeholder, internal, method_token) {
    pool.getConnection(function (err, connection) {
        var familyName;

        if (method_token === "twitter") {
            familyName = req.user.displayName.split(" ")[1];
        } else familyName = req.user.name.familyName;

        var queryString = "INSERT INTO USER SET " +
            "name=" + connection.escape(familyName) + ", " +
            "vorname=" + connection.escape(req.user.name.givenName) + ", " +
            "email=" + connection.escape(req.user.emails[0].value) + ", " +
            "telefon=" + connection.escape(req.user.telefon) + ", " +
            "password=" + connection.escape(DatabaseController.prototype.hash(placeholder)) + ", " +
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
                        req.body.telefon,
                        req.body.street,
                        req.body.ort,
                        req.body.plz,
                        req.body.rech_street,
                        req.body.rech_ort,
                        req.body.rech_plz,
                        internal);
                    req.session.user = user;
                    console.log(req.session.user);
                }
            });

        connection.on('error', function (err) {
            console.log("ERR: " + err);
            return;
        });
    });
}

DatabaseController.prototype.signup = function (req, res, internal) {
    pool.getConnection(function (err, connection) {
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

        var queryString = "INSERT INTO USER SET " +
            "name=" + connection.escape(req.body.name) + ", " +
            "vorname=" + connection.escape(req.body.vorname) + ", " +
            "email=" + connection.escape(req.body.email) + ", " +
            "telefon=" + connection.escape(req.body.tel) + ", " +
            "password=" + connection.escape(DatabaseController.prototype.hash(req.body.password)) + ", " +
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
                        req.body.telefon,
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
                    var _userModelController = new UserModelController();
                    var user = _userModelController.createUserModel(req.body.name,
                        req.body.vorname,
                        req.body.email,
                        req.body.password,
                        req.body.telefon,
                        req.body.street,
                        req.body.ort,
                        req.body.plz,
                        req.body.rech_street,
                        req.body.rech_ort,
                        req.body.rech_plz
                    );
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
module.exports = DatabaseController;
