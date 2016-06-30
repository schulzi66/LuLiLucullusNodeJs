$( ".sidebar-menu" ).hide();
$( ".sidebar-menu-button" ).click(function() {
    $( ".sidebar-menu" ).slideToggle( "slow", function() {
    });
});

$( ".cross" ).click(function() {
    $( ".sidebar-menu" ).slideToggle( "slow", function() {
    });
});