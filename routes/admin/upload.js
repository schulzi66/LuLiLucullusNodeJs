var express = require('express');
var router = express.Router();
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
    _dbController.loadIngredients(function (existingIngredients) {
        _dbController.loadUnits(function (existingUnits) {
            _dbController.loadCourses(function (existingCourses) {
                _dbController.loadStyles(function (existingStyles) {
                    mapIDS(req, existingCourses, existingStyles);
                    _dbController.loadRecipesOverview(function (existingRecipes) {
                        req.body.recipeID = existingRecipes.length;
                        logger.log("req.body", req.body);
                        _dbController.uploadRecipe(req.body, function () {
                            var newUnits = {};
                            newUnits = checkForExistingUnits(existingUnits, req.body.unit);
                            insertNewUnits(newUnits);
                            var newIngredients = checkForExistingIngredients(existingIngredients, req.body.ingredients);
                            insertNewIngredients(newIngredients);
                            insertRecipeIngredients(req.body, newIngredients, newUnits);
                        });
                    });
                });
            });
        });
    });
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
    var unitsToAdd = newUnits;
    for (var i = 0; i < existingUnits.length; ++i) {
        for (var j = 0; j < newUnits.length; ++j) {
            if (existingUnits[i].unitName == newUnits[j]) {
                delete unitsToAdd[j];
            }
        }
    }
    return unitsToAdd;
}

function insertNewUnits(newUnits) {
    for (var i = 0; i < newUnits.length; i++) {
        if(newUnits[i] !== undefined){
        console.log("unitID:" + newUnits[i]);
            _dbController.uploadUnit(newUnits[i]);
        }
    }
}

function checkForExistingIngredients(existingIngredients, newIngredients) {
    var ingredientsToAdd = newIngredients;
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
    for (var i = 0; i < newIngredients.length; i++) {
        if(newIngredients[i] !== undefined){
            _dbController.uploadIngredient(newIngredients[i]);
        }
    }
}

function insertRecipeIngredients(json, newIngredients, newUnits) {
    for (var i = 0; i < json.amount.length; ++i) {
        //TODO: ingredient / Unit ID not the name
        _dbController.uploadRecipeIngredient(json.amount[i], json.recipeID, newIngredients[i], newUnits[i]);
    }
}

module.exports = router;
