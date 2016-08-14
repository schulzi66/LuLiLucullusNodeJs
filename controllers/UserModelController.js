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
      console.log("usermodelcontroller ");
      Object.keys(userModel).forEach(function (key) {
        var val = userModel[key];
        console.log(key + " :" + val);
      })
    //     "name": {
    //         "familyName": name,
    //         "givenName": firstName
    //     },
    //     "displayName": firstName + " " + name,
    //     "emails": [{
    //         "value": email
    //     }],
    //     "password": password,
    //     "telefon": telefon,
    //     "lieferadresse_str": lief_street,
    //     "lieferadresse_ort": lief_city,
    //     "lieferadresse_plz": lief_plz,
    //     "rechnungsadresse_str": rech_street,
    //     "rechnungsadresse_ort": rech_city,
    //     "rechnungsadresse_plz": rech_plz,
    //     "internal": internal
    // }
    return userModel;
}

module.exports = UserController;
