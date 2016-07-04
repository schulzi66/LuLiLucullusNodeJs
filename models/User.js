var DbController = require('./../controllers/DatabaseController');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

// req.app.get('connection').usercollection.find();

var _dbController = new DbController();
var connection = _dbController.connect(startServer);


// define the schema for our user model
var userSchema = mongoose.Schema({

    local: {
        email: String,
        password: String,
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }

});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);