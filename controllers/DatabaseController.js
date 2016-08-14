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
    bcrypt.hash(password, 10, function (err, hash) {
        if (!err) {
            console.log("DBController, PW:" + password, "HASH: " + hash);
            return hash;
        } else {
            console.log('Fehler: ' + hash);
        }
    });
}

DatabaseController.prototype.connect = function (startServerCallback) {
    pool.getConnection(function (err, connection) {
        console.log('connected as id ' + connection.threadId);
        startServerCallback();
    });
}

DatabaseController.prototype.getUserByEmail = function (req, res, email, callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "SELECT * FROM USERS WHERE USERID=" + connection.escape(email);
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

DatabaseController.prototype.loadRecipesOverview = function (callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "SELECT recipeID, recipeName, shortDescription, baseDescription, pictureRef FROM RECIPES";
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
        //var queryString = "SELECT Recipes.*, RecipeIngredients.* FROM RECIPES JOIN RecipeIngredients ON Recipes.recipeid=RecipeIngredients.recipeid WHERE recipes.recipeID=" + connection.escape(id);
        var queryString = "SELECT RecipeIngredients.amount, ingredients.ingredientName " +
                            "FROM Ingredients " +
                            "JOIN RecipeIngredients " +
                            "ON RecipeIngredients.ingredientID=ingredients.ingredientID " +
                            "WHERE RecipeIngredients.recipeID=" + connection.escape(id);
        console.log(queryString);
        connection.query(queryString, function (err, rows) {
            connection.release();
            if (!err) {
                console.log("ROWS" + rows[0]);
                callback(rows[0]);
            }
        });
        connection.on('error', function (err) {
            console.log("ERR: " + err);
            return;
        });
    });
};

/*DatabaseController.prototype.saveRatingForRecipe = function (rating, id, callback) {
 pool.getConnection(function (err, connection) {
 var queryString = "INSERT INTO Ratings SET stars= " +
 connection.escape(rating) + ", recipeId=" + connection.escape(id) +
 ", userId=" + connection.escape(user.id) +
 "WHERE "
 });
 };*/

DatabaseController.prototype.signupExternalUser = function (req, res, placeholder, internal, method_token) {
    pool.getConnection(function (err, connection) {
        var familyName;

        if (method_token === "twitter") {
            familyName = req.user.displayName.split(" ")[1];
        } else familyName = req.user.name.familyName;

        var queryString = "INSERT INTO USERS SET " +
            "familyName=" + connection.escape(familyName) + ", " +
            "name=" + connection.escape(req.user.name.givenName) + ", " +
            "userID=" + connection.escape(req.user.emails[0].value) + ", " +
            "street=" + connection.escape(null) + ", " +
            "location=" + connection.escape(null) + ", " +
            "plz=" + connection.escape(0) + ", " +
            "telefonNumber=" + connection.escape(req.user.telefon) + ", " +
            "password=" + connection.escape(DatabaseController.prototype.hash(placeholder)) + ", " +
            "billingAdressStreet=" + connection.escape(null) + ", " +
            "billingAdressLocation=" + connection.escape(null) + ", " +
            "billingAdressPlz=" + connection.escape(0) + ", " +
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

        var queryString = "INSERT INTO USERS SET " +
            "familyName=" + connection.escape(req.body.vorname) + ", " +
            "name=" + connection.escape(req.body.name) + ", " +
            "userID=" + connection.escape(req.body.email) + ", " +
            "street=" + connection.escape(req.body.street) + ", " +
            "location=" + connection.escape(req.body.ort) + ", " +
            "plz=" + connection.escape(req.body.plz) + ", " +
            "telefonNumber=" + connection.escape(req.body.tel) + ", " +
            "password=" + connection.escape(DatabaseController.prototype.hash(req.body.password)) + ", " +
            "billingAdressStreet=" + connection.escape(rech_str) + ", " +
            "billingAdressLocation=" + connection.escape(rech_ort) + ", " +
            "billingAdressPlz=" + connection.escape(rech_plz) + ", " +
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

        var queryString = "UPDATE USERS " +
            "SET familyName=" + connection.escape(req.body.name) + ", " +
            "name=" + connection.escape(req.body.vorname) + ", " +
            "telefonNumber=" + connection.escape(req.body.tel) + ", " +
            "street=" + connection.escape(req.body.street) + ", " +
            "location=" + connection.escape(req.body.ort) + ", " +
            "plz=" + connection.escape(req.body.plz) + ", " +
            "telefonNumber=" + connection.escape(req.body.tel) + ", " +
            "billingAdressStreet=" + connection.escape(rech_str) + ", " +
            "billingAdressLocation=" + connection.escape(rech_ort) + ", " +
            "billingAdressPlz=" + connection.escape(rech_plz) + " " +
            "WHERE userID= " + connection.escape(req.body.email);

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
