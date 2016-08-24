function convertPictureRefToPath(pictureRef) {
    var imgDir = "img/";
    var fileExtension = [".png", ".jpg"];
    pictureRef = pictureRef.split('pictureRef')[1].toLowerCase();
    var path = imgDir + pictureRef + fileExtension[0];
    //TODO: check if file exists
    return path;
}