"use strict";
//Region Recipes
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
                '<a class="recipes-overview-btn btn btn-primary btn-sm" href="recipes/recipe"> Weitere Informationen ... </a>' +
                '</p>' +
                '</li>';
            container.append(recipe_list_element);
        });
    })
}

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
//End Region

//Region filter
jQuery(document).ready(function () {
    jQuery('#recipe-filter').on('click', function (event) {
        jQuery('#filter-bar').toggle('show');
    });
});

//End Region
