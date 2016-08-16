function convertPictureRefToPath(pictureRef) {
    var imgDir = "public/img/";
    var fileExtension = [".png", ".jpg"];
    pictureRef = pictureRef.split('pictureRef')[1].toLowerCase();
    var path = imgDir + pictureRef + fileExtension[lookup(fileExtension)];
    //TODO: check if file exists
    return path;
}

function lookup(fileExtension) {
    
    return fileExtension;
}