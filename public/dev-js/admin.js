/* #####################################
 Load all orders to render an order overview in administration
 ##################################### */

function initOrdersOverview() {
    var socket = io.connect();
    socket.emit('loadOrdersOverview');
    socket.on('loadedOrdersOverview', function (orders) {
        var container = $('#orderOverview');
        var tableRow;

        if (orders.length > 0) {
            $.each(orders, function (i) {
                if (i % 2 == 0) {
                    tableRow = '<tr class="even gradeC">';
                } else {
                    tableRow = '<tr class="odd gradeX">';
                }
                var ordersOverview =
                    tableRow +
                    '<input type="hidden" name="bookingID" value="' + orders[i].bookingID + '">' +
                    '<input type="hidden" name="typeID" value="' + orders[i].typeID + '">' +
                    '<td class="center">' + orders[i].eventName + '</td>' +
                    '<td class="center">' + orders[i].customerName + '</td>' +
                    '<td class="center">' + orders[i].recipeName + '</td>' +
                    '<td class="center">' + orders[i].orderAmount + '</td>' +
                    '<td class="center">' + Util.convertMySQLTimestampToValidTimestamp(orders[i].orderDate) + '</td>' +
                    '<td class="center">' + Util.convertMySQLTimestampToValidTimestamp(orders[i].maturityDate) + '</td>' +
                    '<td class="center">' + Util.getMaturityPeriod(orders[i].orderDate, orders[i].maturityDate) + " Tagen" + '</td>' +
                    '<td class="center">' +
                    '<a class="ordersOverviewRelease" href="#">' +
                    '<span class="glyphicon glyphicon-ok">' +
                    '</span>' +
                    '</a>' +
                    '</td>' +
                    '</tr>';
                container.append(ordersOverview);
            });
        } else if (orders.length == 0) {
            container.append('<tr class="odd gradeX">' + '<td colspan="100%"> Keine offenen Bestellungen! </td>' + '</tr>');
        }
    });

}

function releaseOrder(orderDetails) {
    var socket = io.connect();
    socket.emit('releaseOrder', orderDetails);
}

/* #####################################
 Method to create a new Recipe
 ##################################### */

function insertNewRecipe(recipe) {
    var socket = io.connect();
    socket.emit('insertNewRecipe', recipe);
}

/* #####################################
 Method to load courses
 ##################################### */

function loadCourses() {
    var socket = io.connect();
    socket.emit('loadCourses');
    socket.on('loadedCourses', function (courses) {
        var container = $("#courseSelection");
        $.each(courses, function (i) {
            var options =
                '<option value="' + courses[i].courseName + '">' +
                courses[i].courseName +
                "</option>";

            container.append(options);
        });
    });
}

/* #####################################
 Method to load styles
 ##################################### */


function loadStyles() {
    var socket = io.connect();
    socket.emit('loadStyles');
    socket.on('loadedStyles', function (styles) {
        var container = $("#styleSelection");
        $.each(styles, function (i) {
            var options =
                '<option value="' + styles[i].styleName + '">' +
                styles[i].styleName +
                "</option>";

            container.append(options);
        });
    });
}

