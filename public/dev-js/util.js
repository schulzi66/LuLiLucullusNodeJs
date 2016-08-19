function Util() {}

Util.lookup = function(fileExtension) {
    console.log(fileExtension);
}

Util.firstLetterToUpperCase = function(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

Util.fixRootEntry = function(str) {
    str = "#";
    return str;
}
