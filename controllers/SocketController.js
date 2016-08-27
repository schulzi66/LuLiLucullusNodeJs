var DatabaseController = require('./DatabaseController');
var DevLoggingController = require('./DevLoggingController');
var logger = new DevLoggingController();

var SocketController = function () {
}

SocketController.prototype.startServerSocket = function (io, server) {
    io.on('connection', onConnection);
}

function onConnection(socket) {
    //Region Recepies
    socket.on('loadRecipesOverview', function () {
        var _dbController = new DatabaseController();
        _dbController.loadRecipesOverview(function (recipesOverview) {
            socket.emit('loadedRecipesOverview', recipesOverview);
        })
    });

    socket.on('loadRecipeFromId', function (id) {
        var _dbController = new DatabaseController();
        _dbController.loadRecipeFromId(id, function (recipe) {
            socket.emit('loadedRecipe', recipe);
        });
    });
    //End Region

    //Region Recipe Filter
    socket.on('loadFilterOptions', function () {
        var _dbController = new DatabaseController();
        _dbController.loadFilterOptions(function (filterOptions) {
            socket.emit('loadedFilterOptions', filterOptions);
        });
    });

    socket.on('loadFilteredRecipes', function(filteroptions){
        var _dbController  = new DatabaseController();
        _dbController.loadFilteredRecipes(function(filteroptions){
            socket.emit('loadedFilteredRecipes', filteroptions);
        });
    });
    //End Region

    socket.on('loadOrdersOverview', function () {
        var _dbController = new DatabaseController();
        _dbController.loadOrders(function (ordersOverview) {
            socket.emit('loadedOrdersOverview', ordersOverview);
        });
    });

    socket.on('insertOrders', function () {
        var _dbController = new DatabaseController();
        _dbController.insertOrderInformation(function (orderDetails) {
            socket.emit('insertedOrders', orderDetails);
        });
    });
}

module.exports = SocketController;
