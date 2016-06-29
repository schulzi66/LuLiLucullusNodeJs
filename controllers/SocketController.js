/**
 * @author
 * Marius Schulze
 */

var socketCtr = function() {
}

socketCtr.prototype.startServerSocket = function (io) {
  io.on('connection', onConnection);
}

function onConnection(socket) {
  console.log('client is connected');
  socket.on('disconnect', onDisconnect);
}

function onDisconnect() {
  console.log('disconnected');
}

module.exports = socketCtr;
