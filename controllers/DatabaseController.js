var mysql = require('mysql');
var conf = require('../conf.json');
var UserModelController = require('./UserModelController');
var bcrypt = require('bcrypt-nodejs');
var DevLoggingController = require('./DevLoggingController');
var logger = new DevLoggingController();

var dateFormat = require('dateformat');

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

        console.log(queryString);
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

DatabaseController.prototype.insertEmployeesPasswordRequest = function (reqDate, authenticationCode, email) {
    pool.getConnection(function (err, connection) {
        var queryString = "INSERT INTO EMPLOYEESPASSWORDRESETS SET " +
            "dateOfReset=" + connection.escape(reqDate) + ", " +
            "resetCode=" + connection.escape(authenticationCode) + ", " +
            "closed=" + false + ", " +
            "employeeID=" + connection.escape(email);

        console.log(queryString);
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

DatabaseController.prototype.getOpenEmployeesPasswordRequest = function (req, res, callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "SELECT * FROM EMPLOYEESPASSWORDRESETS WHERE EMPLOYEEID=" + connection.escape(req.body.userID) + " " +
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

DatabaseController.prototype.closeEmployeesPasswordRequest = function (req, res, passwordRequest, callback) {
    pool.getConnection(function (err, connection) {
        console.log("closeEmployeesPasswordRequest passwordRequest.employeeID: " + passwordRequest.employeeID);
        var queryString = "UPDATE EMPLOYEESPASSWORDRESETS SET CLOSED = TRUE WHERE RESETCODE = " + connection.escape(passwordRequest.resetCode) +
            " And employeeID =" + connection.escape(passwordRequest.employeeID);
        console.log(queryString);
        connection.query(queryString, function (err, rows) {
            connection.release();
            if (!err) {
                callback(res, passwordRequest.employeeID, req.body.password);
            }
        });

        connection.on('error', function (err) {
            console.log("ERR: " + err);
            return;
        });
    });
}


DatabaseController.prototype.changeEmployeePassword = function (res, employeeID, newPassword, callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "UPDATE EMPLOYEES SET PASSWORD=" + connection.escape(DatabaseController.prototype.hash(newPassword)) + " " +
            "WHERE EMPLOYEEID=" + connection.escape(employeeID);
        console.log(queryString);
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
};

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


DatabaseController.prototype.getEmployeeByEmail = function (req, res, email, callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "SELECT * FROM EMPLOYEES WHERE employeeID=" + connection.escape(email);

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

DatabaseController.prototype.insertNewEmployee = function (req, res) {
    pool.getConnection(function (err, connection) {
        var queryString = "INSERT INTO EMPLOYEES SET " +
            "employeeID=" + connection.escape(req.body.employeeID) + ", " +
            "name=" + connection.escape(req.body.name) + ", " +
            "familyName=" + connection.escape(req.body.familyName) + ", " +
            "location=" + connection.escape(req.body.location) + ", " +
            "street=" + connection.escape(req.body.street) + ", " +
            "plz=" + connection.escape(req.body.plz) + ", " +
            "telefonNumber=" + connection.escape(req.body.telefonNumber) + ", " +
            "isAdmin=" + connection.escape(req.body.isAdmin) + ", " +
            "password=" + connection.escape(DatabaseController.prototype.hash(req.body.password));

        connection.query(queryString,
            function (err) {
                console.log(queryString);
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


/**
 * Recipes Methods
 */

DatabaseController.prototype.loadRecipesOverview = function (callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "SELECT recipeID, recipeName, recipePrice, shortDescription, pictureRef FROM RECIPES";
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
 * Load recipe names
 * @param id
 * @param callback
 */
DatabaseController.prototype.loadRecipeNames = function (callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "SELECT recipeName, recipePrice, recipeID FROM recipes";
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

DatabaseController.prototype.loadBookingTypes = function (callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "SELECT type AS bookingType FROM bookingtypes WHERE type NOT IN ('Bestellung')";
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
    })
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
            //var styleString = "\x22amerikanisch\x22";
            //var courseString = "\x22hauptgang\x22";
            var courseString = "";
            var styleString = "";

            for (var i = 0; i < filterOptions.length; i++) {
                if (filterOptions[i].key == "allergen") {
                    allergenString += ", \x22" + filterOptions[i].option + "\x22";
                }
                else if (filterOptions[i].key == "course") {
                    courseString += "\x22" + filterOptions[i].option + "\x22";
                }
                else if (filterOptions[i].key == "style") {
                    styleString += "\x22" + filterOptions[i].option + "\x22";
                }
            }

            console.log(courseString);
            console.log(styleString);

            queryString = "SELECT DISTINCT recipes.recipeID, recipes.recipeName, recipes.shortDescription, recipes.pictureRef FROM recipes " +
                "JOIN styles ON styles.styleID = recipes.styleID " +
                "JOIN courses ON courses.courseID = recipes.courseID " +
                "LEFT JOIN recipeingredients ON recipeingredients.recipeID = recipes.recipeID " +
                "LEFT JOIN ingredients ON ingredients.ingredientID = recipeingredients.ingredientID " +
                "LEFT JOIN ingredientsallergenes ON ingredientsallergenes.ingredientID = ingredients.ingredientID " +
                "LEFT JOIN allergenes ON allergenes.allergenID = ingredientsallergenes.allergenID " +
                "WHERE recipes.recipeID NOT IN ( " +
                "SELECT DISTINCT recipes.recipeID FROM allergenes " +
                "JOIN ingredientsallergenes ON allergenes.allergenID = ingredientsallergenes.allergenID " +
                "JOIN ingredients ON ingredientsallergenes.ingredientID = ingredients.ingredientID " +
                "JOIN recipeingredients ON ingredients.ingredientID = recipeingredients.ingredientID " +
                "JOIN recipes ON recipeingredients.recipeID = recipes.recipeID " +
                "WHERE allergenes.allergenName IN (\x22\x22" + allergenString + ")) ";
            if (courseString != "") {
                queryString += "AND styles.styleName IN (" + styleString + ") ";
            }
            if (styleString != "") {
                queryString += "AND courses.courseName IN (" + courseString + ")";
            }
        }
        console.log(queryString);
        connection.query(queryString, function (err, rows) {
            connection.release();
            if (!err) {
                console.log(rows);
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

DatabaseController.prototype.getRecipeIDByRecipeName = function (details, callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "SELECT recipeID FROM recipes WHERE recipeName=" + connection.escape(details.recipeName);
        connection.query(queryString, function (err, rows) {
            connection.release();
            if (!err) {
                console.log("Successfully executed Query: " + queryString);
                callback(rows);
            }
        });
        connection.on('error', function (err) {
            console.log("ERR: " + err);
            return;
        });
    });
}

DatabaseController.prototype.insertBookingRecipes = function (details, recipeID, callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "INSERT INTO bookingRecipes (amountOfServings, bookingID, recipeID) " +
            "VALUES (" +
            connection.escape(details.amount) + "," +
            connection.escape(details.bookingID) + "," +
            connection.escape(recipeID) + ")";
        connection.query(queryString, function (err) {
            console.log("INSERT BOOKING RECIPES: " + queryString);
            connection.release();
            if (!err) {
                console.log("Successfully executed Query: " + queryString);
                callback();
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
        var startDate = new Date(details.start);
        var endDate = new Date(details.start);
        if (details.end != undefined) {
            endDate = new Date(details.end);
        }
        var queryString = "INSERT INTO bookings (bookingID, eventName, dateBegin, dateEnd, location, street, plz, userID, typeID, isReleased) " +
            "VALUES (" +
            connection.escape(details.bookingID) + "," +
            connection.escape(details.eventName) + "," +
            connection.escape(dateFormat(startDate, "yyyy-mm-dd hh:mm:ss")) + "," +
            connection.escape(dateFormat(endDate, "yyyy-mm-dd hh:mm:ss")) + "," +
            connection.escape(details.location) + "," +
            connection.escape(details.street) + "," +
            connection.escape(details.plz) + "," +
            connection.escape(details.email) + "," +
            connection.escape(details.orderType) + "," +
            false + ")";
        connection.query(queryString, function (err) {
            console.log(queryString);
            connection.release();
            if (!err) {
                console.log("Successfully executed Query: " + queryString);
                callback(details.bookingID);
            }
        });
        connection.on('error', function (err) {
            console.log("ERR: " + err);
            return;
        });
    });
}

DatabaseController.prototype.setReleaseFlag = function (details) {
    pool.getConnection(function (err, connection) {
        var queryString = "UPDATE bookings SET " +
            "isReleased=" + true +
            " WHERE bookingID=" + connection.escape(details.bookingID);
        connection.query(queryString, function (err) {
            connection.release();
            if (!err) {
                console.log("Successfully executed Query: " + queryString);
            }
        });
        connection.on('error', function (err) {
            console.log("ERR: " + err);
            return;
        });
    });
}

/**
 * Upload Recipes Methods
 */
DatabaseController.prototype.loadUnits = function (callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "SELECT * FROM Units";
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

DatabaseController.prototype.loadCourses = function (callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "SELECT * FROM Courses";
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

DatabaseController.prototype.loadStyles = function (callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "SELECT * FROM Styles";
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

DatabaseController.prototype.loadIngredients = function (callback) {
    pool.getConnection(function (err, connection) {
        var queryString = "SELECT * FROM Ingredients";
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


/*DatabaseController.prototype.saveRatingForRecipe = function (rating, id, callback) {
 pool.getConnection(function (err, connection) {
 var queryString = "INSERT INTO Ratings SET stars= " +
 connection.escape(rating) + ", recipeId=" + connection.escape(id) +
 ", userId=" + connection.escape(user.id) +
 "WHERE "
 });
 };*/

module.exports = DatabaseController;
