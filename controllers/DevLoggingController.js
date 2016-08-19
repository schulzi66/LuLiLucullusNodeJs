var DevLoggingController = function () {
}

DevLoggingController.prototype.log = function (callerMethod, obj) {
    if (process.env.NODE_ENV === 'development') {
        console.log("-----------------");
        console.log("You are logging from: " + callerMethod);
        console.log("-----------------");
        console.log("Object to log: ");
        Object.keys(obj).forEach(function (key) {
            var val = obj[key];
            console.log("  " + key + " : " + val);
        })
    }
    ;
}
module.exports = DevLoggingController;
