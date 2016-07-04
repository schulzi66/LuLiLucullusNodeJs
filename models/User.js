var DbController = require('./../controllers/DatabaseController');
var bcrypt   = require('bcrypt-nodejs');
// req.app.get('connection').usercollection.find();

var _dbController = new DbController();
var connection = _dbController.connect(startServer);
