$('#recipe-upload').on('click', function (){
    console.log('test');
    $('#pictureRef').click();
});

$('#pictureRef').on('change', function () {
    console.log("changed");
    var files = $(this).get(0).files;

    if (files.length > 0) {
        // create a FormData object which will be sent as the data payload in the
        // AJAX request
        var formData = new FormData();

        // loop through all the selected files and add them to the formData object
        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            // add the files to formData object for the data payload
            formData.append('pictureRef', file, file.name);
        }

        $.ajax({
            url: '/administration/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log('upload successful!\n' + data);
            },
            xhr: function () {
                // create an XMLHttpRequest
                var xhr = new XMLHttpRequest();

                // listen to the 'progress' event
                xhr.upload.addEventListener('progress', function (evt) {

                }, false);

                return xhr;
            }
        });
    }
});