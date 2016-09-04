var DatabaseController = require('./DatabaseController');
var DevLoggingController = require('./DevLoggingController');

var _dbController = new DatabaseController();

var SocketController = function () {
}

SocketController.prototype.startServerSocket = function (io) {
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

    socket.on('sendBookmark', function (id) {
        _dbController.saveBookmark(id);
    });

    socket.on('sendBookmark', function (userId) {
        _dbController.loadBookmarks(id);
    });

    //End Region

    socket.on('loadRecipeNames', function () {
        _dbController.loadRecipeNames(function (recipeNames) {
            socket.emit('loadedRecipeNames', recipeNames);
        })
    });

    socket.on('loadBookingTypes', function () {
        _dbController.loadBookingTypes(function (recipeNames) {
            socket.emit('loadedBookingTypes', recipeNames);
        })
    });

    //Region Recipe Filter
    socket.on('loadFilterOptions', function () {
        _dbController.loadFilterOptions(function (filterOptions) {
            socket.emit('loadedFilterOptions', filterOptions);
        });
    });
    
    socket.on('loadFilteredRecipes', function (filterOptions) {
        _dbController.loadFilteredRecipes(filterOptions, function (filteredRecipes) {
            socket.emit('loadedFilteredRecipes', filteredRecipes);
        });
    });
    //End Region

    //Region Orders
    socket.on('loadOrdersOverview', function () {
        _dbController.loadOrders(function (ordersOverview) {
            socket.emit('loadedOrdersOverview', ordersOverview);
        });
    });

    socket.on('releaseOrder', function (orderDetails) {
        _dbController.setReleaseFlag(orderDetails);
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
        });
    });

    socket.on('receiveChatMessage', function (message) {
        console.log(message);
    });

    //End region

    //Region Courses
    socket.on('loadCourses', function () {
        _dbController.loadCourses(function (courses) {
            socket.emit('loadedCourses', courses);
        })
    });
    //End region

    //Region Styles
    socket.on('loadStyles', function () {
        _dbController.loadStyles(function (styles) {
            socket.emit('loadedStyles', styles);
        })
    });
}

module.exports = SocketController;
