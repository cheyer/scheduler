$(document).ready(function () {

    $.ajax({
        url: '/status',
        type: 'post',
        success: function (data) {
            if (data.on) {
                $('#stopbtn').prop('disabled', false);
                $('#startbtn').prop('disabled', true);
            } else {
                $('#stopbtn').prop('disabled', true);
                $('#startbtn').prop('disabled', false);
            }
        }
    });



    $('#createjob').submit(function (event) {
        event.preventDefault();
        $('#stopbtn').prop('disabled', false);
        $('#startbtn').prop('disabled', true);
        var interval = $('#interval').val();
        var isNumber = !isNaN(interval);
        if (!isNumber) {
            // set to default days
            interval = 7;
        }

        console.log("submitted: " + interval);
        console.log("is number: " + isNumber);

        var job = {
            "interval": interval
        };

        $.ajax({
            url: '/start',
            type: 'post',
            dataType: 'json',
            data: job,
            success: function (data) {
                console.log(data);
            }
        });
    });

    $('#stopjob').submit(function (event) {
        event.preventDefault();
        $('#stopbtn').prop('disabled', true);
        $('#startbtn').prop('disabled', false);

        $.ajax({
            url: '/stop',
            type: 'post',
            success: function (data) {
                console.log(data);
            }
        });
    });
});