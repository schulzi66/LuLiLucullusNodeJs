var mysql = require('mysql');
var conf = require('../conf.json');
var UserModelController = require('./UserModelController');
var bcrypt = require('bcrypt-nodejs');
var DevLoggingController = require('./DevLoggingController');
var logger = new DevLoggingController();

var pool = mysql.createPool({
    host: conf.database.host,
    user: conf.database.user,
    password: conf.database.password,
    database: conf.database.dbo,
    charset: conf.database.charset,
    connectionLimit: conf.database.connectionLimit
});

/**
 * Constr & Init Methods
 */
var DatabaseController = function () {
}

DatabaseController.prototype.connect = function (startServerCallback) {
    pool.getConnection(function (err, connection) {
        console.log('connected as id ' + connection.threadId);
        startServerCallback();
    });
}

/**
 * Password Methods
 */

DatabaseController.prototype.hash = function (password) {
    var hash = bcrypt.hashSync(password);
    return hash;
}

DatabaseController.prototype.insertPasswordRequest = function (reqDate, authenticationCode, email) {
    pool.getConnection(function (err, connection) {
        var queryString = "INSERT INTO PASSWORDRESETS SET " +
            "dateOfReset=" + connection.escape(reqDate) + ", " +
            "resetCode=" + connection.escape(authenticationCode) + ", " +
            "closed=" + false + ", " +
            "userId=" + connection.escape(email);
        connection.query(queryString, function (err, rows) {
            connection.release();
            if (!err) {

            }
        });

        connection.on('error', function (err) {
            console.log("ERR: " + err);
            return;
        });
    });
}

DatabaseController.prototype.getOpenPasswordRequest = function (req, res, callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "SELECT * FROM PASSWORDRESETS WHERE USERID=" + connection.escape(req.body.userID) + " " +
            "AND CLOSED= " + false + " " +
            "AND RESETCODE =" + connection.escape(req.body.authenticationCode);
        connection.query(queryString, function (err, rows) {
            connection.release();
            if (!err) {
                callback(req, res, rows[0])
            }
        });

        connection.on('error', function (err) {
            console.log("ERR: " + err);
            return;
        });
    });
}

DatabaseController.prototype.closePasswordRequest = function (req, res, passwordRequest, callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "UPDATE PASSWORDRESETS SET CLOSED = TRUE WHERE RESETCODE = " + connection.escape(passwordRequest.resetCode) +
            " And userId =" + connection.escape(passwordRequest.userID);
        connection.query(queryString, function (err, rows) {
            connection.release();
            if (!err) {
                callback(res, passwordRequest.userID, req.body.password);
            }
        });

        connection.on('error', function (err) {
            console.log("ERR: " + err);
            return;
        });
    });
}

DatabaseController.prototype.changePassword = function (res, userId, newPassword, callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "UPDATE USERS SET PASSWORD=" + connection.escape(DatabaseController.prototype.hash(newPassword)) + " " +
            "WHERE USERID=" + connection.escape(userId);
        connection.query(queryString, function (err, rows) {
            connection.release();
            if (!err) {
                callback(res);
            }
        });

        connection.on('error', function (err) {
            console.log("ERR: " + err);
            return;
        });
    });
}

/**
 * Users Methods
 */

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
}
DatabaseController.prototype.signupExternalUser = function (req, res, placeholder, internal, method_token) {
    pool.getConnection(function (err, connection) {
        var familyName;

        if (method_token === "twitter") {
            familyName = req.user.displayName.split(" ")[1];
        } else familyName = req.user.name.familyName;

        var queryString = "INSERT INTO USERS SET " +
            "familyName=" + connection.escape(req.user.name.familyName) + ", " +
            "name=" + connection.escape(req.user.name.givenName) + ", " +
            "userID=" + connection.escape(req.user.emails[0].value) + ", " +
            "street=" + connection.escape(null) + ", " +
            "location=" + connection.escape(null) + ", " +
            "plz=" + connection.escape(null) + ", " +
            "telefonNumber=" + connection.escape(null) + ", " +
            "password=" + connection.escape(DatabaseController.prototype.hash(placeholder)) + ", " +
            "billingAddressStreet=" + connection.escape(null) + ", " +
            "billingAddressLocation=" + connection.escape(null) + ", " +
            "billingAddressPlz=" + connection.escape(null) + ", " +
            "internal=" + connection.escape(internal);

        console.log("external signup: " + queryString);

        connection.query(queryString,
            function (err) {
                connection.release();

                if (!err) {
                    var _userModelController = new UserModelController();
                    var user = _userModelController.createUserModel(req.body.familyName,
                        req.body.name,
                        req.body.email,
                        req.body.password,
                        req.body.telefonNumber,
                        req.body.street,
                        req.body.location,
                        req.body.plz,
                        req.body.billingAdressStreet,
                        req.body.billingAdressLocation,
                        req.body.billingAdressPlz,
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

        if (req.body.billingAdressStreet === '') {
            rech_str = req.body.street;
        } else rech_str = req.body.billingAdressStreet;

        if (req.body.billingAdressLocation === '') {
            rech_ort = req.body.location;
        } else rech_ort = req.body.billingAdressLocation;

        if (req.body.billingAdressPlz == '') {
            rech_plz = req.body.plz;
        } else rech_plz = req.body.billingAdressPlz;

        var queryString = "INSERT INTO USERS SET " +
            "familyName=" + connection.escape(req.body.familyName) + ", " +
            "name=" + connection.escape(req.body.name) + ", " +
            "userID=" + connection.escape(req.body.email) + ", " +
            "street=" + connection.escape(req.body.street) + ", " +
            "location=" + connection.escape(req.body.location) + ", " +
            "plz=" + connection.escape(req.body.plz) + ", " +
            "telefonNumber=" + connection.escape(req.body.telefonNumber) + ", " +
            "password=" + connection.escape(DatabaseController.prototype.hash(req.body.password)) + ", " +
            "billingAddressStreet=" + connection.escape(rech_str) + ", " +
            "billingAddressLocation=" + connection.escape(rech_ort) + ", " +
            "billingAddressPlz=" + connection.escape(rech_plz) + ", " +
            "internal=" + connection.escape(internal);

        connection.query(queryString,
            function (err) {
                console.log(queryString);
                connection.release();

                if (!err) {
                    var _userModelController = new UserModelController();
                    var user = _userModelController.createUserModel(req.body.familyName,
                        req.body.name,
                        req.body.email,
                        req.body.password,
                        req.body.telefonNumber,
                        req.body.street,
                        req.body.location,
                        req.body.plz,
                        req.body.billingAdressStreet,
                        req.body.billingAdressLocation,
                        req.body.billingAdressPlz,
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

        if (req.body.billingAdressStreet === '') {
            rech_str = req.body.street;
        } else rech_str = req.body.billingAdressStreet;
        if (req.body.billingAdressLocation === '') {
            rech_ort = req.body.location;
            console.log("req.body.location: " + req.body.location);
        } else rech_ort = req.body.billingAdressLocation;

        if (req.body.billingAdressPlz == '') {
            rech_plz = req.body.plz;
        } else rech_plz = req.body.billingAdressPlz;

        var queryString = "UPDATE USERS " +
            "SET familyName=" + connection.escape(req.body.familyName) + ", " +
            "name=" + connection.escape(req.body.name) + ", " +
            "telefonNumber=" + connection.escape(req.body.telefonNumber) + ", " +
            "street=" + connection.escape(req.body.street) + ", " +
            "location=" + connection.escape(req.body.location) + ", " +
            "plz=" + connection.escape(req.body.plz) + ", " +
            "billingAddressStreet=" + connection.escape(rech_str) + ", " +
            "billingAddressLocation=" + connection.escape(rech_ort) + ", " +
            "billingAddressPlz=" + connection.escape(rech_plz) + " " +
            "WHERE userID= " + connection.escape(req.body.email);

        connection.query(queryString,
            function (err) {
                connection.release();

                if (!err) {
                    var _userModelController = new UserModelController();
                    logger.log("updateUser", req.body)
                    var user = _userModelController.createUserModel(req.body.familyName,
                        req.body.name,
                        req.body.email,
                        req.body.password,
                        req.body.telefonNumber,
                        req.body.street,
                        req.body.location,
                        req.body.plz,
                        req.body.billingAdressStreet,
                        req.body.billingAdressLocation,
                        req.body.billingAdressPlz
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

/**
 * Employees Methods
 */

DatabaseController.prototype.getAdminByEmail = function (req, res, email, callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "SELECT * FROM EMPLOYEES WHERE employeeID=" + connection.escape(email) +
            "AND isAdmin=" + true;

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
}
;

DatabaseController.prototype.setAdminOnlineStatus = function (user, onlineStatus) {
    pool.getConnection(function (err, connection) {
        var queryString = "UPDATE EMPLOYEES SET isOnline=" + connection.escape(onlineStatus) +
        " WHERE employeeID=" + connection.escape(user.employeeID) +
            " AND isAdmin=" + true;
        connection.query(queryString, function (err, rows) {
            connection.release();
            if (!err) {

            }
        });
        connection.on('error', function (err) {
            console.log("ERR: " + err);
            return;
        });
    });
}

DatabaseController.prototype.getOnlineAdmins = function (callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "SELECT * FROM EMPLOYEES WHERE isAdmin=" + true +
        " AND isOnline=" + true;
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
}

/**
 * Recipes Methods
 */

DatabaseController.prototype.loadRecipesOverview = function (callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "SELECT recipeID, recipeName, shortDescription, pictureRef FROM RECIPES";
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
}

DatabaseController.prototype.loadRecipeFromId = function (id, callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "SELECT RecipeIngredients.amount, " +
            "Ingredients.ingredientName, Units.unitName, Recipes.recipeName, Recipes.timeNeeded, Recipes.baseDescription, Recipes.pictureRef " +
            "FROM RecipeIngredients " +
            "JOIN Ingredients " +
            "ON Ingredients.ingredientID=RecipeIngredients.ingredientID " +
            "JOIN Units " +
            "ON RecipeIngredients.unitID=Units.unitID " +
            "JOIN Recipes " +
            "ON Recipes.recipeID=RecipeIngredients.recipeID " +
            "WHERE RecipeIngredients.recipeID=" +
            connection.escape(id);
        connection.query(queryString, function (err, rows) {
            console.log("LoadRecipeByID: " + queryString);
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
}

/**
 * Filter Methods
 */

DatabaseController.prototype.loadFilterOptions = function (callback) {
    var queryString = "SELECT r.recipeName, s.styleName, c.courseName, ri.amount, i.ingredientName, a.allergenName FROM recipes AS r " +
        "JOIN courses AS c ON c.courseID = r.courseID " +
        "JOIN styles AS s ON s.styleID = r.styleID " +
        "LEFT JOIN recipeingredients AS ri ON ri.recipeID = r.recipeID " +
        "LEFT JOIN ingredients AS i ON i.ingredientID = ri.ingredientID " +
        "LEFT JOIN ingredientsallergenes AS ia ON ia.ingredientID = i.ingredientID " +
        "LEFT JOIN allergenes AS a ON a.allergenID = ia.allergenID";
    pool.getConnection(function (err, connection) {
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
}

DatabaseController.prototype.loadFilteredRecipes = function (filterOptions, callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "";
        if (filterOptions.length == 0)
            queryString = "SELECT recipeID, recipeName, shortDescription, pictureRef FROM RECIPES";
        else {
            var allergenString = "";
            for (var i = 0; i < filterOptions.allergens.length; i++){
                allergenString.append("" + filterOptions.allergens + "");
            }
            queryString = "SELECT DISTINCT recipes.recipeID, recipeName, shortDescription, pictureRef " +
                "FROM recipes " +
                "JOIN courses " +
                "ON courses.courseID = recipes.courseID " +
                "JOIN styles " +
                "ON styles.styleID = recipes.styleID " +
                "LEFT JOIN recipeingredients " +
                "ON recipeingredients.recipeID = recipes.recipeID " +
                "LEFT JOIN ingredients " +
                "ON ingredients.ingredientID = recipeingredients.ingredientID " +
                "LEFT JOIN ingredientsallergenes " +
                "ON ingredientsallergenes.ingredientID = ingredients.ingredientID " +
                "LEFT JOIN allergenes " +
                "ON allergenes.allergenID = ingredientsallergenes.allergenID "
                "WHERE allergenes.allergenName NOT IN (" + allergenString + ")";
        }
        console.log(queryString);
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
}

/**
 * Bookings Methods
 */

DatabaseController.prototype.loadOrders = function (callback) {
    pool.getConnection(function (err, connection) {
        var queryString =
            "SELECT bookings.eventName, " +
            "UNIX_TIMESTAMP(bookings.dateBegin) AS orderDate, " +
            "UNIX_TIMESTAMP(bookings.dateEnd) AS maturityDate, " +
            "concat(users.name,' ', users.familyName) AS customerName, " +
            "recipes.recipeName, bookings.bookingID, bookings.typeID, " +
            "bookingRecipes.amountOfServings AS orderAmount " +
            "FROM bookings " +
            "JOIN bookingRecipes ON bookingRecipes.bookingID = bookings.bookingID " +
            "JOIN users ON users.userID = bookings.userID " +
            "JOIN recipes ON  recipes.recipeID = bookingRecipes.recipeID " +
            "WHERE isReleased=" + false;
        console.log(queryString);
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
}

DatabaseController.prototype.insertOrderInformation = function (details, callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "INSERT INTO TABLE bookings SET " +
            "eventName=" + connection.escape(details.anlass) +
            ",userName=" + connection.escape(details.kunde) +
            ",recipe=" + connection.escape(details.artikel) +
            ",amount=" + connection.escape(details.menge) +
            ",orderDate=" + connection.escape(details.auftragsdatum) +
            ",typeID=" + connection.escape(details.typeId) +
            ",isReleased=" + connection.escape(details.freigeben);
        //TODO: typeID dynamic
        connection.query(queryString, function (err, rows) {
            console.log(queryString);
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
}

DatabaseController.prototype.setReleaseFlag = function (details, callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "ALTER TABLE bookings SET " +
            "isReleased=" + true +
            " WHERE bookingID =" + connection.escape(details.bookingID);
        connection.query(queryString, function (err, rows) {
            console.log(queryString);
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
}
/*DatabaseController.prototype.saveRatingForRecipe = function (rating, id, callback) {
 pool.getConnection(function (err, connection) {
 var queryString = "INSERT INTO Ratings SET stars= " +
 connection.escape(rating) + ", recipeId=" + connection.escape(id) +
 ", userId=" + connection.escape(user.id) +
 "WHERE "
 });
 };*/

module.exports = DatabaseController;
