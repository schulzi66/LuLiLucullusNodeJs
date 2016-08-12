function convertPictureRefToPath(pictureRef) {
    var imgDir = "public/img/";
    var fileExtension = [".png", ".jpg"];
    pictureRef = pictureRef.split('pictureRef')[1].toLowerCase();
    var path = imgDir + pictureRef + fileExtension[0];

    return path;
}