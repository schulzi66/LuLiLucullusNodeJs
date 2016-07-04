/**
 * @author
 * Marius Schulze
 */

var mysql = require('mysql');
var DatabaseController = function () {
}

DatabaseController.prototype.connect = function (user, password, dbo, startServerCallback) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: user,
        password: password,
        database: dbo
    });

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
        startServerCallback();
    });

    connection.query('CREATE TABLE IF NOT EXISTS test_table (id int not NULL)', function (err, rows, fields) {
        if (!err) {
            console.log("Success " + rows)
        } else {
            console.log("Error while proceeding");
        }
    });
}

module.exports = DatabaseController;
