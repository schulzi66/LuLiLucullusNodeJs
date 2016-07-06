var UserController = function () {
}

UserController.prototype.createUserModel = function (name, firstName, email, password, street, plz, city) {
   var userModel = {
                "name" : name,
                "firstName" : firstName,
                "displayName" : firstName + " " + name,
                "email" : email,
                "password" : password,
                "street" : street,
                "city" : city
              }
   return userModel;
}

module.exports = UserController;
