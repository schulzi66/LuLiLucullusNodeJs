var DatabaseController = require('./DatabaseController');
var _dbController = new DatabaseController();

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
        _dbController.loadRecipesOverview(function (recipesOverview) {
            socket.emit('loadedRecipesOverview', recipesOverview);
        })
    });

    socket.on('loadRecipeFromId', function (id) {
        _dbController.loadRecipeFromId(id, function (recipe) {
            socket.emit('loadedRecipe', recipe);
        });
    });
    //End Region

    //Region Recipe Filter
    socket.on('loadFilterOptions', function () {
        _dbController.loadFilterOptions(function (filterOptions) {
            socket.emit('loadedFilterOptions', filterOptions);
        });
    });

    socket.on('loadFilteredRecipes', function(filterOptions){
        _dbController.loadFilteredRecipes(function(filterOptions){
            socket.emit('loadedFilteredRecipes', filterOptions);
        });
    });
    //End Region

    //Region Orders
    socket.on('loadOrdersOverview', function () {
        _dbController.loadOrders(function (ordersOverview) {
            socket.emit('loadedOrdersOverview', ordersOverview);
        });
    });

    socket.on('insertOrders', function (orderDetails) {
        _dbController.insertOrderInformation(orderDetails, function () {
            socket.emit('insertedOrders');
        });
    });
    //End Region

    //Region chat

    //User opens chat
    socket.on('connectUser', function () {
      //has to check if an admin is online
      _dbController.getOnlineAdmins(function (onlineAdmins) {
        //no admin is online
        if (onlineAdmins === undefined) {
          //chat has to disply no one online
          socket.emit('noAdminOnline');
        }
        else {
          //chat has to display "You are talking to Name Familiy Name"
          socket.emit('adminOnline', onlineAdmins[0]);
        }
      })
    })

    socket.on('receiveChatMessage', function (message) {
      console.log(message);
    });
}

module.exports = SocketController;
