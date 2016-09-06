var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/recipes')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var uploadedFile;

var pictureRef = "";

var upload = multer({ storage: storage });

var DatabaseController = require('../../controllers/DatabaseController');
var _dbController = new DatabaseController();

var DevLoggingController = require('../../controllers/DevLoggingController');
var logger = new DevLoggingController();

/* GET upload page. */
router.get('/', function (req, res) {
    if (req.session.user !== undefined && req.session.user.isAdmin !== undefined) {
        res.render('upload', {user: req.session.user});
    } else {
        res.render('administration-login');
    }
});

router.post('/', function (req, res) {
    uploadImage();
        _dbController.loadIngredients(function (existingIngredients) {
            _dbController.loadUnits(function (existingUnits) {
                _dbController.loadCourses(function (existingCourses) {
                    _dbController.loadStyles(function (existingStyles) {
                        mapIDS(req, existingCourses, existingStyles);
                        _dbController.loadRecipesOverview(function (existingRecipes) {
                            req.body.recipeID = existingRecipes.length;
                            req.body.pictureRef = pictureRef;
                            console.log("req.body.pictureRef: " + req.body.pictureRef);
                            _dbController.uploadRecipe(req.body, function () {
                                var newUnits = checkForExistingUnits(existingUnits, req.body.unit);
                                insertNewUnits(newUnits);
                                var newIngredients = checkForExistingIngredients(existingIngredients, req.body.ingredients);
                                insertNewIngredients(newIngredients);
                                setTimeout(function () {
                                    insertRecipeIngredients(req.body, req, res);
                                }, 7000);
                            });
                        });
                    });
                });
            });
        });
});

router.post('/image', upload.single('pictureRef'), function (req, res, next) {
    logger.log("req.file", req.file);
    uploadedFile = req.file;
   //TODO: Figure out how to send back http 200 to display "File uploaded" to user without redirecting to another page or stuff like this
    // res.send(req.body);
});

function mapIDS(req, existingCourses, existingStyles) {
    for (var i = 0; i < existingCourses.length; ++i) {
        if (existingCourses[i].courseName === req.body.course) {
            req.body.courseID = existingCourses[i].courseID;
        }
    }
    for (var i = 0; i < existingStyles.length; ++i) {
        if (existingStyles[i].styleName === req.body.style) {
            req.body.styleID = existingStyles[i].styleID;
        }
    }
}

function checkForExistingUnits(existingUnits, newUnits) {
    var unitsToAdd = {};
    for (var k = 0; k < newUnits.length; k++) {
        unitsToAdd[k] = newUnits[k];
    }
    for (var i = 0; i < existingUnits.length; ++i) {
        for (var j = 0; j < newUnits.length; ++j) {
            if (existingUnits[i].unitName == newUnits[j]) {
                delete unitsToAdd[j];
            }
        }
    }
    logger.log("unitsToADD", unitsToAdd);
    return unitsToAdd;
}

function insertNewUnits(newUnits) {
    for (var i = 0; i <= Object.keys(newUnits).length; i++) {
        if (newUnits[i] !== undefined) {
            console.log(newUnits[i]);
            _dbController.uploadUnit(newUnits[i]);
        }
    }
}

function checkForExistingIngredients(existingIngredients, newIngredients) {
    var ingredientsToAdd = {};
    for (var k = 0; k < newIngredients.length; k++) {
        ingredientsToAdd[k] = newIngredients[k];
    }
    for (var i = 0; i < existingIngredients.length; ++i) {
        for (var j = 0; j < newIngredients.length; ++j) {
            if (existingIngredients[i].ingredientName === newIngredients[j]) {
                delete ingredientsToAdd[j];
            }
        }
    }
    return ingredientsToAdd;
}

function insertNewIngredients(newIngredients) {
    for (var i = 0; i < Object.keys(newIngredients).length; i++) {
        if (newIngredients[i] !== undefined) {
            _dbController.uploadIngredient(newIngredients[i]);
        }
    }
}

function insertRecipeIngredients(json, req, res) {
    var unitMappings = [];
    var ingredientsMappings = [];

    for (var i = 0; i < json.amount.length; i++) {
        _dbController.getUnitIdByUnitName(json.unit[i], function (unitID) {
            var unitMap = {unitID: unitID, unitName: json.unit[i]};
            unitMappings.push(unitMap);
        });
    }

    for (var k = 0; k < json.amount.length; k++) {
        _dbController.getIngredientIdByIngredientName(json.ingredients[k], function (ingredientID) {
            var ingredientMap = {ingredientID: ingredientID, ingredientName: json.ingredients[k]};
            ingredientsMappings.push(ingredientMap);
        });
    }

    setTimeout(function () {
        for (var m = 0; m < json.amount.length; m++) {
            _dbController.uploadRecipeIngredient(json.amount[m], json.recipeID, ingredientsMappings[m].ingredientID, unitMappings[m].unitID);
        }
        res.redirect('/administration');
    }, 5000);
}

function uploadImage() {
    fs.readFile(uploadedFile.path, function (err, data) {
        var newPath = uploadedFile.destination;
        var outStream = fs.createWriteStream(newPath);
        outStream.on('error', function () {
            console.log("error but dont care");
            pictureRef = uploadedFile.originalname;
        });
        outStream.on('finish', function () {
            pictureRef = uploadedFile.originalname;
        });
    });
}

module.exports = router;
