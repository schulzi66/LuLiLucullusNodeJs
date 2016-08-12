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
}

module.exports = SocketController;
