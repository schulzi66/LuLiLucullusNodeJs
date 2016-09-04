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
                        _dbController.uploadRecipe(req.body,function () {
                            var newUnits = checkForExistingUnits(existingUnits, req.body.unit);
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
        if(existingCourses[i].courseName === req.body.course) {
            req.body.courseID = existingCourses[i].courseID;
        }
    }
    for (var i = 0; i < existingStyles.length; ++i) {
        if(existingStyles[i].styleName === req.body.style) {
            req.body.styleID = existingStyles[i].styleID;
        }
    }
}

function checkForExistingUnits(existingUnits, newUnits) {
    var unitsToAdd = newUnits;
    //
    for (var i = 0; i < existingUnits.length; ++i) {
        for(var j = 0; j < newUnits.length; ++j){
            if(existingUnits[i].unitName === newUnits[j]) {
                unitsToAdd[j].unitID = existingUnits.length + i;
                delete unitsToAdd[j];
            }
        }
    }
    for(var k = 0; k < unitsToAdd.length; ++k){
        unitsToAdd[k].unitID = existingUnits.length + k;
    }
    return unitsToAdd;
}

function insertNewUnits(newUnits) {
    // newUnits.forEach(function (unit) {
    //     console.log("unit" + unit);
    //     logger.log("insert", unit);
    //     _dbController.uploadUnit(unit);
    // })
    for(var i = 0; i < newUnits.length; ++i) {
        console.log("i:" + i +"," + newUnits[i]);
        _dbController.uploadUnit(newUnits[i]);
    }
}

function checkForExistingIngredients(existingIngredients, newIngredients) {
    var ingredientsToAdd = newIngredients;
    for (var i = 0; i < existingIngredients.length; ++i) {
        for(var j = 0; j < newIngredients.length; ++j){
            if(existingIngredients[i].ingredientName === newIngredients[j]) {
                ingredientsToAdd[j].ingredientID = existingIngredients.length + i;
                delete ingredientsToAdd[j];
            }
        }
    }
    return ingredientsToAdd;
}

function insertNewIngredients(newIngredients) {
    for(var i = 0; i < newIngredients.length; ++ i){
        _dbController.uploadIngredient(newIngredients[i]);
    }
}

function insertRecipeIngredients(json, newIngredients, newUnits) {
    for(var i = 0; i < json.amount.length; ++i){
        _dbController.uploadRecipeIngredient(json.amount[i], json.recipeID, newIngredients[i], newUnits[i]);
    }
}

module.exports = router;
