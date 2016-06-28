var ErrorController = function() {
}

ErrorController.prototype.onErr = function (err) {
    console.log(err);
    return 1;
}

module.exports = ErrorController;
