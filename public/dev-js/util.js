'use strict';

function Util() {
}

Util.firstLetterToUpperCase = function (str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

Util.fixRootEntry = function (str) {
    if (str === 'Home') {
        str = "#";
        return str;
    } else {
        return str
    }
}

Util.lookup = function (fileExtension) {
    return fileExtension;
}

Util.convertMySQLTimestampToValidTimestamp = function (timestamp) {
    moment.locale('de');
    return moment(timestamp * 1000).format('LL');
}

Util.getMaturityPeriod = function (orderDate, maturityDate) {
    return Math.round(Math.abs(maturityDate - orderDate) / 60 / 60 / 24);
}

Util.calculateRecipeIngredientsAmount = function (ingredient, amount, unit) {
    var resolvedUnit = unit;
    if (amount > 1 && unit === "Messerspitze") {
        resolvedUnit = "Messerspitzen";
    } else if (amount > 1 && unit === "Stück") {
        resolvedUnit = "Stücke";
    } else if (amount > 1 && unit === "Stange") {
        resolvedUnit = "Stangen";
    } else if (amount > 1 && unit === "Packung") {
        resolvedUnit = "Packungen";
    } else resolvedUnit = unit;

    if (amount >= 1000 && resolvedUnit === "Gramm") {
        return (amount / 1000) + " Kilogramm";
    } else if (amount >= 1000 && resolvedUnit === "Milliliter") {
        return (amount / 1000) + " Liter";
    } else if (amount >= 3 && resolvedUnit === "Teelöffel") {
        return (amount / 3) + " Esslöffel";
    } else if (amount > 5 && resolvedUnit === "Esslöffel") {
        return (amount * 15) + " Gramm";
    } else if (amount >= 5 && resolvedUnit === "Prise") {
        if (!amount >= 20 && resolvedUnit === "Prise") {
            return (amount / 5) + " Messerspitze";
        } else {
            return (amount / 20 ) + " Teelöffel";
        }
    } else if (amount >= 4 && resolvedUnit === "Messerspitze(n)") {
        return (amount / 4) + " Teelöffel";
    } else return amount + " " + resolvedUnit;
}

Util.checkIngredients = function (ingredient, amount) {
    if (amount > 1 && ingredient == "Ei") {
        return "Eier";
    } else if (amount > 1 && ingredient == "Zwiebel") {
        return "Zwiebeln";
    } else if (amount > 1 && ingredient == "Knoblauchzehe") {
        return "Knoblauchzehen";
    } else {
        return ingredient;
    }
}
Util.convertPictureRefToPath = function (pictureRef) {
    var imgDir = "img/recipes/";
    var fileExtension = [".png", ".jpg"];
    pictureRef = pictureRef.split('pictureRef')[1].toLowerCase();
    return imgDir + pictureRef + fileExtension[1];
}

Util.generateUUID = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
}

Util.getTemplate = function () {
    var client = new XMLHttpRequest();
    client.open('GET', '/template.html');
    client.onreadystatechange = function () {
        alert(client.responseText);
    }
    client.send();
}