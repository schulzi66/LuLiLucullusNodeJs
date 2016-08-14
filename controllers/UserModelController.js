var DevLoggingController = require('./DevLoggingController');
var logger = new DevLoggingController();

var UserController = function () {
}

UserController.prototype.createUserModel = function (name, firstName, email, password, telefon, lief_street, lief_city, lief_plz, rech_street, rech_city, rech_plz, internal) {
    var userModel = {
        "familyName": name,
        "name": firstName,
        "displayName": firstName + " " + name,
        "email": email,
        "userID": email,
        "password": password,
        "telefonNumber": telefon,
        "street": lief_street,
        "location": lief_city,
        "plz" : lief_plz,
        "billingAdressStreet": rech_street,
        "billingAdressLocation": rech_city,
        "billingAdressPlz" : rech_plz,
        "internal": internal
      }

      logger.log("createUserModel", userModel);
    return userModel;
}

module.exports = UserController;
