var mysql =require('mysql');
var DbController = function() {
}

DbController.prototype.connect = function () {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'pmcs123$',
    database : 'dbo_lulilucullus'
  });

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });
}

module.exports = DbController;
