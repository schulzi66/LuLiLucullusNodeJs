var UserController = function () {
}

UserController.prototype.createUserModel = function (name, firstName, email, password, lief_street, lief_city, lief_plz, rech_street, rech_city, rech_plz) {
    var userModel = {
        "name": name,
        "firstName": firstName,
        "displayName": firstName + " " + name,
        "email": email,
        "password": password,
        "lieferadresse_str": lief_street,
        "lieferadresse_ort": lief_city,
        "lieferadresse_plz": lief_plz,
        "rechnungsadresse_str": rech_street,
        "rechnungsadresse_ort": rech_city,
        "rechnungsadresse_plz": rech_plz,

    }
    return userModel;
}

module.exports = UserController;
