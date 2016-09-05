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
                        _dbController.uploadRecipe(req.body, function () {
                            var newUnits = checkForExistingUnits(existingUnits, req.body.unit);
                            insertNewUnits(newUnits);
                            var newIngredients = checkForExistingIngredients(existingIngredients, req.body.ingredients);
                            insertNewIngredients(newIngredients);
                            insertRecipeIngredients(req.body);
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
        // newUnits;
    var unitsToAdd = {};
    for(var k = 0; k < newUnits.length; k++){
        unitsToAdd[k] = newUnits[k];
    }
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
            _dbController.uploadUnit(newUnits[i]);
        }
    }
}

function checkForExistingIngredients(existingIngredients, newIngredients) {
    var ingredientsToAdd = {};
    // newIngredients;
    for(var k = 0; k < newIngredients.length; k++){
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
    for (var i = 0; i < newIngredients.length; i++) {
        if(newIngredients[i] !== undefined){
            _dbController.uploadIngredient(newIngredients[i]);
        }
    }
}

function insertRecipeIngredients(json) {
    logger.log("units", json.unit);
    logger.log("ingredients", json.ingredients);
    for (var i = 0; i < json.amount.length; i++) {
        setTimeout(function () {
            console.log("unit[i]: " + json.unit[i]);
            _dbController.getUnitIdByUnitName(json.unit[i], function (unitID) {
                console.log("unitID: " + unitID);
                console.log("ingredients[i]: " + json.ingredients[i]);
                _dbController.getIngredientIdByIngredientName(json.ingredients[i], function (ingredientID) {
                    console.log("check");
                    console.log("json.amount[i]: " + json.amount[i]);
                    console.log("json.recipeID: " + json.recipeID);
                    console.log("ingredientID: " + ingredientID);
                    console.log("unitID: " + unitID);
                    _dbController.uploadRecipeIngredient(json.amount[i], json.recipeID, ingredientID, unitID);
                });
            });
        }, 5000);
        // _dbController.getUnitIdByUnitName(json.unit[i],function (unitID) {
        //     setTimeout(function () {
        //         _dbController.getIngredientIdByIngredientName(json.ingredients[i], function (ingredientID) {
        //             console.log("ingredientID:" + ingredientID);
        //             console.log("unitID:" + unitID);
        //             _dbController.uploadRecipeIngredient(json.amount[i], json.recipeID, ingredientID, unitID);
        //         });
        //
        //     }, 1000);
        // });
    }
}

module.exports = router;
