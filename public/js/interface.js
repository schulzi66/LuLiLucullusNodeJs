"use strict";
function init_recipes(/*TODO: Parameter*/) {
    var recipes = ['Rezept 1', 'Rezept 2', 'Rezept 3', 'Rezept 4', 'Rezept 5', 'Rezept 6'];
    var container = $('ul.recipes');
    var lorem_ipsum = "Carrot cake jelly-o cake muffin lollipop candy canespie cheesecake.";

    $.each(recipes, function (i) {
        var recipe_list_element =
            '<li class="recipes-overview-item">' +
                '<img src="img/test_logo.jpg" alt=""' + recipes[i] + '>' +
                '<h3 class="recipes-overview-headline text-uppercase">' + recipes[i] + '</h3>' +
                '<p class="recipes-overview-short-description">' + lorem_ipsum + '</p>' +
                '<p>' +
                    '<a class="recipes-overview-btn btn btn-primary btn-sm" href="recipes/recipe"> Weitere Informationen ... </a>' +
                '</p>' +
            '</li>';
        container.append(recipe_list_element);
    });
}