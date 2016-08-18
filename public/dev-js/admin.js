/* #####################################
    Load all orders to render an order overview in administration
 ##################################### */

function initOrdersOverview() {
    var socket = io.connect();   //TCP Socket connection to load recipes overview from db
    socket.emit('loadOrdersOverview');
    socket.on('loadedOrdersOverview', function (orders) {
        var container = $('#orderOverview');

        $.each(orders, function (i) {
            var ordersOverview =
                '<tr class="odd gradeX">' +
                '<td>' + orders[i].customerName + '</td>' +
                '<td>' + orders[i].recipeName + '</td>' +
                '<td>' + orders[i].orderAmount + '</td>' +
                '<td class="center">' + orders[i].orderDate + '</td>' +
                '<td class="center"><a class="ordersOverviewRelease" href="#"><span class="glyphicon glyphicon-ok"></span></a></td>' +
                '</tr>';

            container.append(ordersOverview);
        });
    });
}


/* #####################################
    Method to create a new Recipe
 ##################################### */

function insertNewRecipe(recipe) {
    var socket = io.connect();
    socket.emit('insertNewRecipe', recipe);
}
