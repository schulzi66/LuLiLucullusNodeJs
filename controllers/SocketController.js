var DatabaseController = require('./DatabaseController');

var SocketController = function () {
}

SocketController.prototype.startServerSocket = function (io) {
  io.on('connection', onConnection);
}

function onConnection(socket) {
  socket.on('loadAllRecipes', onLoadAllRecipes);
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

function onLoadAllRecipes() {
  var _dbController = new DatabaseController();
  _dbController.loadAllRecipes(function (allRecipes) {
    socket.emit('loadedAllRecipes', allRecipes);
  })
}

function onLoadRecipeFromId(id) {
  var _dbController = new DatabaseController();
  _dbController.loadRecipeFromId(id, function (recipe) {
    socket.emit('loadedRecipe', recipe);
  })

}

module.exports = SocketController;
