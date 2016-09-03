"use strict";
/* #####################################
 Load recipe overview
 ##################################### */
function loadRecipesOverview() {
    //TCP Socket connection to load recipes overview from db
    var socket = io.connect();
    socket.emit('loadRecipesOverview');
    socket.on('loadedRecipesOverview', function (recipes) {
        var container = $('#recipeContainer');
        $.each(recipes, function (i) {
            var recipe_list_element =
                '<div class="col-sm-6 col-md-4" >' +
                '<div class="thumbnail">' +
                '<img src="' + Util.convertPictureRefToPath(recipes[i].pictureRef) + '"' + '>' +
                '<div class="caption">' +
                '<h3 class="recipes-overview-headline text-uppercase">' + recipes[i].recipeName + '</h3>' +
                '<p class="recipes-overview-short-description">' + recipes[i].shortDescription + '</p>' +
                '<p><a class="btn btn-primary btn-sm" href="recipes/recipe?id=' + recipes[i].recipeID + '"> Weitere Informationen ... </a><span style="margin-left: 20px" class="lead">' + recipes[i].recipePrice + '</span></p>' +
                '</div>' +
                '</div>' +
                '</div>';
            container.append(recipe_list_element);
        });
    })
}

/* #####################################
 Load single recipe by ID
 ##################################### */
function loadRecipeFromId(id, portions) {
    var socket = io.connect();
    socket.emit('loadRecipeFromId', id);
    socket.on('loadedRecipe', function (recipe) {
        if (isNaN(portions)) {
            portions = 1;
        }
        var recipe_image =
            '<img class="recipe-image img-responsive img-rounded" data-failover="img/default.png" src="' + Util.convertPictureRefToPath(recipe[0].pictureRef) + '">';
        $('#recipe-image-wrapper').append(recipe_image);

        var recipe_details =
            '<div class="recipe-header-information">' +
            '<div class="recipe-container-row row">' +
            '<div class="col-md-4">' +
            '<p class="h3">' + recipe[0].recipeName + '</p>' +
            '</div>' +
            '<div class="col-md-2">' +
            '<a onclick="window.print()">' +
            '<p class="recipe-print-icon h3">' +
            '<span class="glyphicon glyphicon-print"> </span>' +
            '</p>' +
            '</a>' +
            '</div>' +
            '<div class="col-md-3 rating">' +
            '<p class="h3">Bewertung</p>' +
            '</div>' +
            '<div class="col-md-3 recicpe-rating-wrapper">' +
            '<ul id="el" class="c-rating">' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>';
        $('#recipe-details-page-wrapper').append(recipe_details);

        var recipe_base_description =
            '<div class="recipe-container-row row">' +
            '<p class="h3 recipe-instructions">Zubereitung</p>' +
            '<p  class="recipe-instructions recipe-time-needed">' +
            recipe[0].timeNeeded +
            '</p>' +
            '<p  class="recipe-instructions">' +
            recipe[0].baseDescription +
            '</p>' +
            '</div>'
        $('#recipe-preparation').append(recipe_base_description);

        $.each(recipe, function (i) {
            var recipe_ingredients_list =
                '<ul class="recipe-ingredients-list recipe-ingredients">' +
                '<li id="ingredientList_' + i + '" class="recipe-ingredients-list-item-first-column">' +
                Util.checkIngredients(recipe[i].ingredientName, recipe[i].amount) +
                '</li>' +
                '<li class="recipe-ingredients-list-item-second-column">' +
                Util.calculateRecipeIngredientsAmount(recipe[i].ingredientName, (portions * recipe[i].amount), recipe[i].unitName ) +
                '</li>' +
                '</ul>';

            $('#ingredients-wrapper').append(recipe_ingredients_list);
        });
        var recipe_portions =
            '<form id="calculateIngredientsForm" class="hidden-print form-inline">' +
            '<div class="form-group">' +
            '<label class="col-sm-2 control-label sr-only"  for="portions">Portionen</label>' +
            '<div class="input-group">' +
            '<div class="input-group-addon">Portionen</div>' +
            '<input type="hidden" name="id" value="' + id + '">' +
            '<input id="ingredientsAmount" class="form-control portions-input" name="portions" value="' + portions + '">' +
            '<span class="input-group-btn"><button id="submit" type="submit" class="btn-portions btn glyphicon glyphicon-refresh"/></span>' +
            '</div>' +
            '</div>' +
            '</form>';
        $('#portionsWrapper').append(recipe_portions);
    });
}


function loadRecipeNamesForOrder() {
    var socket = io.connect();
    socket.emit('loadRecipeNames');
    socket.on('loadedRecipeNames', function (recipeNames) {
        var container = $("#recipeSelection");
        $.each(recipeNames, function (i) {
            var options =
                '<option value="' + recipeNames[i].recipePrice + '">' +
                recipeNames[i].recipeName +
                "</option>";

            container.append(options);
            $('#recipeID').append('<input class="form-control" type="hidden" value="' + recipeNames[i].recipeID + '">');
        });
    });
}

function loadBookingTypes() {
    var socket = io.connect();
    socket.emit('loadBookingTypes');
    socket.on('loadedBookingTypes', function (bookingTypes) {
        var container = $("#bookingTypeSelection");
        console.log(bookingTypes);
        $.each(bookingTypes, function (i) {
            var options =
                '<option>' +
                bookingTypes[i].bookingType +
                '</option>';
            container.append(options);
        });
    });
}

/* #####################################
 Region filter
 ##################################### */
function loadFilterOptions() {
    var socket = io.connect();
    socket.emit('loadFilterOptions');
    socket.on('loadedFilterOptions', function (filterOptions) {
        var allergens = [];
        var styles = [];
        var courses = [];
        var recipeNames = [];

        for (var i = 0; i < filterOptions.length; i++) {
            if (!allergens.includes(filterOptions[i].allergenName) && filterOptions[i].allergenName !== null) {
                allergens.push(filterOptions[i].allergenName);
            }
            if (!styles.includes(filterOptions[i].styleName) && filterOptions[i].styleName !== null) {
                styles.push(filterOptions[i].styleName);
            }
            if (!courses.includes(filterOptions[i].courseName) && filterOptions[i].courseName !== null) {
                courses.push(filterOptions[i].courseName);
            }
            if (!recipeNames.includes(filterOptions[i].recipeName) && filterOptions[i].recipeName !== null) {
                recipeNames.push(filterOptions[i].recipeName);
            }
        }

        $('#inputFields').append('<div class="panel panel-default" id="filterOptionsAllergens" class="col-md-4"><div class="panel-heading">Allergene</div>');
        $.each(allergens, function (i) {
            var currentAllergen =
                '<div class="filterOptionsWrapper">' +
                '<input type="checkbox" id="' + allergens[i] + '" data-type="allergen" />' +
                '<label class="filterOptionsLabel" for="' + allergens[i] + '">&nbsp;' + allergens[i] + '</label><br />' +
                '</div>';
            $('#filterOptionsAllergens').append(currentAllergen);
        });


        $('#inputFields').append('<div class="panel panel-default" id="filterOptionsCourses" class="col-md-4"><div class="panel-heading">Menüart</div>');
        $.each(courses, function (i) {
            var currentCourse =
                '<div class="filterOptionsWrapper">' +
                '<input type="checkbox" id="' + courses[i] + '" data-type="course" />' +
                '<label class="filterOptionsLabel" for="' + courses[i] + '">&nbsp;' + courses[i] + '</label><br />' +
                '</div>';
            $('#filterOptionsCourses').append(currentCourse);
        });

        $('#inputFields').append('<div class="panel panel-default" id="filterOptionsStyles" class="col-md-4"><div class="panel-heading">Region</div>');
        $.each(styles, function (i) {
            var currentStyle =
                '<div class="filterOptionsWrapper">' +
                '<input type="checkbox" id="' + styles[i] + '" data-type="style" />' +
                '<label class="filterOptionsLabel" for="' + styles[i] + '">&nbsp;' + styles[i] + '</label><br />' +
                '</div>';
            $('#filterOptionsStyles').append(currentStyle);
        });

        $('#inputFields').append(
            '<div class="panel panel-default" id="filterOptionsName" class="col-md-4">' +
            '<div class="panel-heading">Name</div>' +
            '<div class="ui-widget>' +
            '<input id="filterOptionTextInput" type="text" class="form-control" name="recipeNames" data-type="recipeName">' +
            '</div>' +
            '</div>'
        );
    });
}

function loadFilteredRecipes(filterOptions) {
    var socket = io.connect();
    socket.emit('loadFilteredRecipes', filterOptions);
    socket.on('loadedFilteredRecipes', function (filteredRecipes) {
        var container = $('#recipeContainer');
        container.children().remove();
        $.each(filteredRecipes, function (i) {
            var recipe_list_element =
                '<div class="col-sm-6 col-md-4">' +
                '<div class="thumbnail">' +
                '<img src="' + Util.convertPictureRefToPath(filteredRecipes[i].pictureRef) + '"' + '>' +
                '<div class="caption">' +
                '<h3 class="recipes-overview-headline text-uppercase">' + filteredRecipes[i].recipeName + '</h3>' +
                '<p class="recipes-overview-short-description">' + filteredRecipes[i].shortDescription + '</p>' +
                '<p>' +
                '<a class="recipes-overview-btn btn btn-primary btn-sm" href="recipes/recipe?id=' + filteredRecipes[i].recipeID + '"> Weitere Informationen ... </a>' +
                '<span style="margin-left: 20px" class="lead">' + filteredRecipes[i].recipePrice + '</span></p>' +
                '</div>' +
                '</div>' +
                '</div>';
            container.append(recipe_list_element);
        });
    });
}

/**
 * CLICK EVENTS
 */
$(document).ready(function () {
    $('#recipe-filter').on('click', function (e) {
        e.stopPropagation();
        $('#filter-bar').slideToggle();
    });

    $('#filterSubmitBtn').on('click', function () {
        var selectedOptions = [];
        var filterOptions = [];
        $('input:checked').each(function () {
            selectedOptions.push(this.getAttribute('data-type') + ":" + this.id);
        });

        var filterText = $('#filterOptionTextInput').val();
        selectedOptions.push("recipename:" + filterText);

        for (var i = 0; i < selectedOptions.length; i++) {
            var currentOptionType = selectedOptions[i].split(':')[0];
            var currentOption = selectedOptions[i].split(':')[1];
            filterOptions.push({
                key: currentOptionType,
                option: currentOption
            });
        }
        console.log(filterOptions);
        loadFilteredRecipes(filterOptions);
    });
    $(function() {
        var availableTags = [
             "ActionScript",
             "AppleScript",
             "Asp",
             "BASIC",
             "C",
             "C++",
             "Clojure",
             "COBOL",
             "ColdFusion",
             "Erlang",
             "Fortran",
             "Groovy",
             "Haskell",
             "Java",
             "JavaScript",
             "Lisp",
             "Perl",
             "PHP",
             "Python",
             "Ruby",
             "Scala",
             "Scheme"
        ];
        $("#filterOptionTextInput").autocomplete({
            source: availableTags
        });
    });

    /**
     * Admin Page Dropdown
     */
    $('#lulilucullusAdminDropdownToggler').on('click', function (e) {
        e.stopPropagation();
        $('#lulilucullusAdminDropdown').show('slow');
    });
    $('html').click(function () {
        $('#lulilucullusAdminDropdown').hide('slow');
    });

    /**
     * Main Header Dropdown
     */
    $('#lulilucullusMainDropdownToggler').on('click', function (e) {
        e.stopPropagation();
        $('#lulilucullusMainDropdown').show('slow');
    });
    $('html').click(function () {
        $('#lulilucullusMainDropdown').hide('slow');
    });

    /**
     * Main Header Name Dropdown
     */
    $('#lulilucullusDropdownToggler').on('click', function (e) {
        e.stopPropagation();
        $('#lulilucullusDropdown').show('slow');
    });
    $('html').click(function () {
        $('#lulilucullusDropdown').hide('slow');
    });
});
