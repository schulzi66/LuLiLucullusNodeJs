var DbController = require('./../controllers/DatabaseController');
var connection = DbController.getConnection();
var bcrypt   = require('bcrypt-nodejs');
var conf = require('../conf.json');
// req.app.get('connection').usercollection.find();
