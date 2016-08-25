function Util() {
}

Util.lookup = function (fileExtension) {
    console.log(fileExtension);
}

Util.firstLetterToUpperCase = function (str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

Util.fixRootEntry = function (str) {
    console.log(str);
    if(str === 'Home') {
        str = "#";
        return str;
    } else {
        return str;
    }
}

Util.lookup = function (fileExtension) {
    return fileExtension;
}

Util.convertMySQLTimestampToValidTimestamp = function(timestamp) {
    moment.locale('de');
    return moment(timestamp*1000).format('LL');
}

Util.getMaturityPeriod = function (orderDate, maturityDate) {
    return (Math.abs(maturityDate - orderDate)/60/60/24);
}

Util.calculateIngredientsAmount = function () {
    console.log("test");
}