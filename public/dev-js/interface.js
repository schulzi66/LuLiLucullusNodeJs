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
        var container = $('#ingredients-wrapper');
        $.each(recipe, function (i) {
            var recipe_ingredients_list =
                '<ul class="recipe-ingredients-list recipe-ingredients">' +
                '<li class="recipe-ingredients-list-item-first-column">' +
                    recipe.ingredientName[i] +
                '</li>' +
                '<li class="recipe-ingredients-list-item-second-column">' +
                    recipe.amount[i] +
                '</li>' +
                '</ul>';
            container.append(recipe_ingredients_list);
            //TODO Julian: display recipe data. recipe has all the informations from db. dont forget the id
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
