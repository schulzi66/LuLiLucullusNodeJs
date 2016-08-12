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
                '<img src="img/test_logo.jpg" alt=""' + recipes[i] + '>' +
                '<h3 class="recipes-overview-headline text-uppercase">' + recipes[i].RecipeName + '</h3>' +
                '<p class="recipes-overview-short-description">' + recipes[i].Description + '</p>' +
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
    //TODO Julian: display recipe data. recipe has all the informations from db. dont forget the id 
  })
}
//End Region
