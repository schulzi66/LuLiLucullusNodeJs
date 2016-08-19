"use strict";
/* #####################################
 Load recipe overview
 ##################################### */
function loadRecipesOverview() {
    var socket = io.connect();   //TCP Socket connection to load recipes overview from db
    socket.emit('loadRecipesOverview');
    socket.on('loadedRecipesOverview', function (recipes) {
        var container = $('ul.recipes');
        $.each(recipes, function (i) {
            var recipe_list_element =
                '<li class="recipes-overview-item">' +
                '<object class="recipes-image-fallback" data="img/default.png" type="image/png">' +
                '<img src="' + convertPictureRefToPath(recipes[i].pictureRef) + '"' + '>' +
                '</object>' +
                '<h3 class="recipes-overview-headline text-uppercase">' + recipes[i].recipeName + '</h3>' +
                '<p class="recipes-overview-short-description">' + recipes[i].shortDescription + '</p>' +
                '<p>' +
                '<a class="recipes-overview-btn btn btn-primary btn-sm" href="recipes/recipe?id=' + recipes[i].recipeID + '"> Weitere Informationen ... </a>' +
                '</p>' +
                '</li>';
            container.append(recipe_list_element);
        });
    })
}

/* #####################################
 Load single recipe by ID
 ##################################### */
function loadRecipeFromId(id) {
    var socket = io.connect();
    socket.emit('loadRecipeFromId', id);
    socket.on('loadedRecipe', function (recipe) {
        var recipe_image = '<img class="img-responsive img-rounded" src="' + convertPictureRefToPath(recipe[0].pictureRef) + '">';
        $('#recipe-image-wrapper').append(recipe_image);

        var recipe_details =
            '<div class="recipe-header-information">' +
            '<div class="recipe-container-row row">' +
            '<div class="col-md-4">' +
            '<p class="h3">' + recipe[0].recipeName + '</p>' +
            '</div>' +
            '<div class="col-md-2">' +
            '<a href="#">' +
            '<p class="recipe-print-icon h3">' +
            '<span class="glyphicon glyphicon-print"> </span>' +
            '</p>' +
            '</a>' +
            '</div>' +
            '<div class="col-md-3">' +
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
            '<p  class="recipe-instructions">' +
            recipe[0].baseDescription +
            '</p>' +
            '</div>'
        $('#recipe-preparation').append(recipe_base_description);

        $.each(recipe, function (i) {
            var recipe_ingredients_list =
                '<ul class="recipe-ingredients-list recipe-ingredients">' +
                '<li class="recipe-ingredients-list-item-first-column">' +
                recipe[i].ingredientName +
                '</li>' +
                '<li class="recipe-ingredients-list-item-second-column">' +
                recipe[i].amount + " " + recipe[i].unitName +
                '</li>' +
                '</ul>';

            $('#ingredients-wrapper').append(recipe_ingredients_list);
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
        console.log(filterOptions[0]);
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

        ////////////Section Allergens////////////
        $('#inputFields').append('<div id="filterOptionsAllergens" class="col-md-4"><h3>Allergene</h3>');
        allergens.forEach(createAllergenSection);
        function createAllergenSection(element, index, array) {
            var currentAllergen =
                '<input type="checkbox" id="' + element + '" />' +
                '<label for="' + element + '">&nbsp;' + element + '</label><br />';
            $('#filterOptionsAllergens').append(currentAllergen);
        }

        ////////////Section Courses////////////
        $('#inputFields').append('<div id="filterOptionsCourses" class="col-md-4"><h3>Kurse</h3>');
        courses.forEach(createCourseSection);
        function createCourseSection(element, index, array) {
            var currentCourse =
                '<input type="checkbox" id="' + element + '" />' +
                '<label for="' + element + '">&nbsp;' + element + '</label><br />';
            $('#filterOptionsCourses').append(currentCourse);
        }

        ////////////Section Styles////////////
        $('#inputFields').append('<div id="filterOptionsStyles" class="col-md-4"><h3>Arten</h3>');
        styles.forEach(createStyleSection);
        function createStyleSection(element, index, array) {
            var currentStyle =
                '<input type="checkbox" id="' + element + '" />' +
                '<label for="' + element + '">&nbsp;' + element + '</label><br />';
            $('#filterOptionsStyles').append(currentStyle);
        }


        for (var j = 0; j < allergens.length; j++) {
            console.log(allergens[j]);
        }
        for (var j = 0; j < courses.length; j++) {
            console.log(courses[j]);
        }
        for (var j = 0; j < recipeNames.length; j++) {
            console.log(recipeNames[j]);
        }
        for (var j = 0; j < styles.length; j++) {
            console.log(styles[j]);
        }


        //$.each(filterOptions, function(i){
        //var filterOption_list_element =
        //'<input type="checkbox" />' +
        //'<label>&nbsp;' + filterOptions[i].allergenName + '</label><br />'
    })
}

jQuery(document).ready(function () {
    jQuery('#recipe-filter').on('click', function (event) {
        jQuery('#filter-bar').slideToggle('show');
    });
});