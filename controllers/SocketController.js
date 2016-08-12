var DatabaseController = require('./DatabaseController');

var SocketController = function () {
}

SocketController.prototype.startServerSocket = function (io, server) {
    io.on('connection', onConnection);
}

function onConnection(socket) {

  //Recepies
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


  // socket.on('disconnect', onDisconnect);
    // socket.on('test', onTest);
    // socket.emit('servercall', 'This is a test servercall');
}

// function onTest(param) {
//     console.log('test');
//     console.log(param);
// }




module.exports = SocketController;
