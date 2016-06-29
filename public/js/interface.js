function login(user, password) {
    $('#username').val(user);
    if (password) {
        $('#password').val(password);
    } else {
        $('#password').val('testtest');
    }
    $('#loginForm').submit();
}

var link_params;
var current_method;

function updateLink(url) {

    link_params = url;
    var linkBuilderString = link_params.split("/");
    current_method = linkBuilderString[linkBuilderString.length - 1].replace(/[{}]/g, "").toLowerCase();
    var current = "/" + linkBuilderString[0] + "/" + linkBuilderString[1] + "/" + $('#market').val() + "/" + $('#language').val() + "/" + $('#' + current_method).val();

    $('#link').attr("href", current);
    $('#link').text(current);
}

function getJsonFormatted(url) {
    var startTime = new Date().getTime();
    $.getJSON(url, function (data) {
        $('#errorDiv').remove();
        $('#jsontable').remove();

        var tbl = prettyPrint(data);
        $('#contentDiv').append(tbl);
    }).error(function(xhr) {
        var requestTime = new Date().getTime() - startTime;
        var errorDiv = '<div class="errorContainer" id="errorWrapper">Time took: ' + requestTime + 'ms, ' +
            'Response Size: ' + xhr.getResponseHeader('Content-Length') + ' bytes </div>'+
            '<div id="errorDiv" class="errorContainer">' + xhr.responseText + '</div>';
        $('#errorDiv > style').remove();
        $('#contentDiv').append(errorDiv);
    });
}

function init(url) {
    link_params = url;
    var params = url.split("/");

    $('<a href="' + link_params + '" id="link">' + link_params.replace(/[{}]/g, "") + '</a>').appendTo($('#requestForm'));

    $.each(params, function (i, val) {
        if (val.charAt(0) === "{" && val.charAt(val.length - 1) === "}") {
            var label_val = val.replace(/[{}]/g, "").charAt(0).toUpperCase() + val.replace(/[{}]/g, "").slice(1);
            var id_val = val.replace(/[{}]/g, "").toLowerCase();

            $('<div class="input-group input-sm" id="div_' + id_val + '">' +
                '<label class="input-group-addon" for="' + label_val.toLowerCase() + '">' +
                '<i class="fa fa-user">' + label_val + '</i></label>' +
                '<input id="' + id_val + '" class="form-control" onkeyup="updateLink(link_params)" value="' + id_val + '">').appendTo($('#requestForm'));
        }
    });
    $('<div id="requestDiv" class="form-actions">' +
        '<button type="button" value="Request" class="btn btn-block btn-default" id="submit-request">Request</button>').appendTo($('#requestForm'));
}

$(document).on('click', '#submit-request', function () {
    getJsonFormatted($('#link').text());
});
