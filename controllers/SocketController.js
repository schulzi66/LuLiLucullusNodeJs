var DatabaseController = require('./DatabaseController');
var DevLoggingController = require('./DevLoggingController');
var MailController = require('./MailController');
var conf = require('../conf.json');
var _mailController = new MailController();
var _dbController = new DatabaseController();
var logger = new DevLoggingController();

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

    socket.on('sendBookmark', function (userID, recipeID) {
        _dbController.saveBookmark(userID, recipeID);
    });

    socket.on('loadBookmarks', function (userID) {
        _dbController.loadBookmarks(userID, function (bookmarks) {
            socket.emit('loadedBookmarks', bookmarks);
        });
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
        _dbController.setReleaseFlag(orderDetails, function () {
            _dbController.getUserForOrder(orderDetails, function (userID) {
                var mailOptions = {
                    from: conf.mail.auth.user, // sender address
                    to: userID, // list of receivers
                    subject: 'Bestellfreigabe', // Subject line
                    text: 'Ihre Bestellung wurde erfolgreich freigegeben.' // plaintext body
                };
                var message = "Bestellung erfolreich freigegeben.";
                var redirect = '';
                _mailController.sendEmail(null, null, mailOptions, message, redirect, false);
            });
        });
    });
    //End Region

    //Region Mail Requests

    socket.on('loadRequests', function () {
       _mailController.openInbox(function (messages) {
           socket.emit('loadedRequests', messages);

       })
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
