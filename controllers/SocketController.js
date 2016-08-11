var DatabaseController = require('./DatabaseController');

var SocketController = function () {
}

// SocketController.prototype.loadRecipesOverview = function () {
// }


SocketController.prototype.startServerSocket = function (io, server) {
    io.listen(server);
    // io.on('connection', onConnection);
}

function onConnection(socket) {
  socket.on('loadRecipesOverview', onLoadRecipesOverview);
  socket.on('loadRecipeFromId', onLoadRecipeFromId);
  socket.on('disconnect', onDisconnect);
    // socket.on('test', onTest);
    // socket.emit('servercall', 'This is a test servercall');
}

// function onTest(param) {
//     console.log('test');
//     console.log(param);
// }

function onDisconnect() {
  console.log('disconnected');
}

//Recepies
function onLoadRecipesOverview() {
  var _dbController = new DatabaseController();
  _dbController.loadRecipesOverview(function (recepiesOverview) {
    socket.emit('loadedRecipesOverview', recepiesOverview);
  })
}

function onLoadRecipeFromId(id) {
  var _dbController = new DatabaseController();
  _dbController.loadRecipeFromId(id, function (recipe) {
    socket.emit('loadedRecipe', recipe);
  })

}

module.exports = SocketController;
