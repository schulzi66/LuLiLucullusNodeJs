var DatabaseController = require('./DatabaseController');

var SocketController = function () {
}

SocketController.prototype.startServerSocket = function (io, server) {
    io.on('connection', onConnection);
}

function onConnection(socket) {
    //Region Recepies
    socket.on('loadRecipesOverview', function () {
        var _dbController = new DatabaseController();
        _dbController.loadRecipesOverview(function (recepiesOverview) {
            socket.emit('loadedRecipesOverview', recepiesOverview);
        })
    });

    socket.on('loadRecipeFromId', function (id) {
        var _dbController = new DatabaseController();
        _dbController.loadRecipeFromId(id, function (recipe) {
            socket.emit('loadedRecipe', recipe);
        })
    });
    //End Region

    //Region Recipe Filter
    socket.on('loadFilterOptions', function () {
        var _dbController = new DatabaseController();
        _dbController.loadFilterOptions(function (filterOptions) {
            socket.emit('loadedFilterOptions', filterOptions);
        })
    });
    //End Region

    socket.on('loadOrdersOverview', function () {
        var _dbController = new DatabaseController();
        _dbController.loadOrders(function (ordersOverview) {
            socket.emit('loadedOrdersOverview', ordersOverview);
        })
    });

    socket.on('loadOrdersOverview', function () {
        var _dbController = new DatabaseController();
        _dbController.insertOrderInformation(function (ordersOverview) {
            socket.emit('loadedOrdersOverview', ordersOverview);
        })
    });
}

module.exports = SocketController;
