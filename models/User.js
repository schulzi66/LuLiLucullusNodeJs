// var DbController = require('./../controllers/DatabaseController');
// var connection = DbController.getConnection();
// var bcrypt   = require('bcrypt-nodejs');
// var conf = require('../conf.json');
// req.app.get('connection').usercollection.find();

//http://bookshelfjs.org/
var _dbController = require('../controllers/DatabaseController');
var connection = _dbController.getConnection();

//
// var User = _dbController.Model.extend({
//   tableName: 'users',
//   // posts: function() {
//   //   return this.hasMany(Posts);
//   // }
// });
//
// console.log(User);
