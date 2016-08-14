"use strict";
//Region Recipes
function loadRecipesOverview() {
    var socket = io.connect();   //TCP Socket connection to load recipes overview from db
    socket.emit('loadRecipesOverview');
    socket.on('loadedRecipesOverview', function (recipes) {
        console.log(recipes);
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
        console.log(recipe);
        var recipe_image = '<img class="img-responsive img-rounded" src="' + convertPictureRefToPath(recipe.pictureRef) + '">';
        $('#recipe-image-wrapper').append(recipe_image);

        var recipe_details =
            '<div class="recipe-header-information">' +
                '<div class="recipe-container-row row">' +
                    '<div class="col-md-4">' +
                        '<p class="h3">' + recipe.recipeName + '</p>' +
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
                    recipe.baseDescription +
                '</p>' +
            '</div>'
        $('#recipe-preparation').append(recipe_base_description);

        $.each(recipe, function (i) {
            var recipe_ingredients_list =
                '<ul class="recipe-ingredients-list recipe-ingredients">' +
                '<li class="recipe-ingredients-list-item-first-column">' +
                    recipe.ingredientName +
                '</li>' +
                '<li class="recipe-ingredients-list-item-second-column">' +
                    recipe.amount + " " + recipe.unitName +
                '</li>' +
                '</ul>';

            $('#ingredients-wrapper').append(recipe_ingredients_list);
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

    jQuery('#filterSubmitBtn').on('click', function (event){
      var vegetarianChecked = $('#check_vegetarian').prop('checked');
      var allergyNutChecked = $('#check_allergy_nut').prop('checked');
    })
});

//End Region
