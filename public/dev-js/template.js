function exportTemplate() {
    var template = '<div class="recipe-container-row row">' +
        '<div class="col-md-4">' +
        '<p class="h3">Rezeptname</p>' +
        '</div>' +
        '<div class="col-md-2">' +
        '<a href="#">' +
        '<p class="recipe-print-icon h3">' +
        '<span class="glyphicon glyphicon-print"></span>' +
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
        '</div>' +
        '<div class="col-md-6">' +
        '<div class="recipe-image-wrapper">' +
        '<img class="img-responsive img-rounded" src="http://placehold.it/500x250">' +
        '</div>' +
        '</div>' +
        '<div class="recipe-container-row row col-md-6">' +
        '<div>' +
        '<p class="h3 recipe-ingredients-headline">Zutaten</p>' +
        '<div id="ingredients-wrapper" class="recipe-ingredients-list-wrapper recipe-ingredients">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="col-md-12">' +
        '<div class="recipe-container-row row">' +
        '<p class="h3 recipe-instructions">Zubereitung</p>' +
        '<p class="recipe-instructions">' +
        '</p>' +
        '</div>' +
        '</div>' +

        '</div>' +
        '<ul class="recipe-ingredients-list recipe-ingredients">' +
        '<li class="recipe-ingredients-list-item-first-column">' +
        recipe.ingredientName +
        '</li>' +
        '<li class="recipe-ingredients-list-item-second-column">' +
        recipe.amount + " " + recipe.unitName +
        '</li>' +
        '</ul>';
    return template;
}