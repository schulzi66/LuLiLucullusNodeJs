/**
 * @author
 * Marius Schulze
 */

var SocketController = function() {
}

SocketController.prototype.startServerSocket = function (io) {
  io.on('connection', onConnection);
}

function onConnection(socket) {
  console.log('client is connected');
  socket.on('disconnect', onDisconnect);
  socket.on('test', onTest);
  socket.emit('servercall', 'This is a test servercall');
}

function onTest(param) {
  console.log('test');
  console.log(param);
}

function onDisconnect() {
  console.log('disconnected');
}

module.exports = SocketController;
