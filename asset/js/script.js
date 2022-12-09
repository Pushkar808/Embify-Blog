console.log("Script loaded")


//to show or hide add interview form
$('#signup').click(() => {
    $('#login-form').toggle('slow', () => {
        if ($('#signup-form').css('display') == "none")
            $('#signup-form').css('display', 'inline');
        else
            $('#signup-form').css('display', 'none');
    });
})

$('#login').click(() => {
    $('#signup-form').toggle('slow', () => {
        if ($('#login-form').css('display') == "none")
            $('#login-form').css('display', 'inline');
        else
            $('#login-form').css('display', 'none');
    });
})



//modal toggle
$('.modal_button').click(() => {
    $('#myModal').modal('show');
})

$('.modal_close_button').click(() => {
    $('#myModal').modal('hide');
});


