/* #####################################
 Load all orders to render an order overview in administration
 ##################################### */

function initOrdersOverview() {
    var socket = io.connect();
    socket.emit('loadOrdersOverview');
    socket.on('loadedOrdersOverview', function (orders) {
        var container = $('#orderOverview');
        var tableRow;
        $.each(orders, function (i) {
            if(i % 2 == 0) {
                tableRow = '<tr class="even gradeC">';
            } else {
                tableRow = '<tr class="odd gradeX">';
            }
            var ordersOverview =
                tableRow +
                '<td class="center">' + orders[i].eventName + '</td>' +
                '<td class="center">' + orders[i].customerName + '</td>' +
                '<td class="center">' + orders[i].recipeName + '</td>' +
                '<td class="center">' + orders[i].orderAmount + '</td>' +
                '<td class="center">' + Util.convertMySQLTimestampToValidTimestamp(orders[i].orderDate) + '</td>' +
                '<td class="center">' + Util.getMaturityPeriod(orders[i].orderDate) + " Tagen" + '</td>' +
                '<td class="center">' +
                '<a class="ordersOverviewRelease" href="#">' +
                '<span class="glyphicon glyphicon-ok">' +
                '</span>' +
                '</a>' +
                '</td>' +
                '</tr>';
            container.append(ordersOverview);
        });
    });
}

function insertIntoOrdersTable(orderDetails) {
    var socket = io.connect();
    socket.emit('insertOrders', orderDetails);
    socket.on('insertedOrders', function (orders) {
        console.log("I DID IT!" + orders);
    });
}

/* #####################################
 Method to create a new Recipe
 ##################################### */

function insertNewRecipe(recipe) {
    var socket = io.connect();
    socket.emit('insertNewRecipe', recipe);
}

