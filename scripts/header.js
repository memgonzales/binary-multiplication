$(function() {
    const timer = 180;

    $('#logo-img').attr('src', 'assets/logo.png');
    $('#title-text').text('10111010101');
    $('#title-text').css('color', 'rgb(240, 240, 119)');

    setTimeout(
        function() {
            $('#title-text').text('01110101010');
            $('#title-text').css('color', 'white');
        }, timer 
    )

    setTimeout(
        function() {
            $('#logo-img').attr('src', 'assets/logo-yellow.png');
            $('#title-text').text('00101101010');
            $('#title-text').css('color', 'rgb(240, 240, 119)');
        }, 2 * timer
    )

    setTimeout(
        function() {
            $('#title-text').text('110101010101');
            $('#title-text').css('color', 'white');
        }, 3 * timer
    )

    setTimeout(
        function() {
            $('#logo-img').attr('src', 'assets/logo.png');
            $('#title-text').text('100101010011');
            $('#title-text').css('color', 'rgb(240, 240, 119)');
        }, 4 * timer
    )

    setTimeout(
        function() {
            $('#title-text').text('110001110010');
            $('#title-text').css('color', 'white');
        }, 5 * timer
    )

    setTimeout(
        function() {
            $('#logo-img').attr('src', 'assets/logo-yellow.png');
            $('#title-text').html('BINARY &nbsp;MULTIPLICAT<span class = "code">10</span>N');
            $('.code').css('font-size', '20px');
        }, 6 * timer
    )

    setTimeout(
        function() {
            $('#logo-img').attr('src', 'assets/logo.png');
            $('#title-text').html('BINARY &nbsp;MULTIPLICATION');

            $('.hidden').css('visibility', 'visible');
        }, 9 * timer
    )

    $('#logo-img').on('mouseover', function() {
        $('#logo-img').attr('src', 'assets/logo-yellow.png');
        $('#title-text').css('color', 'rgb(240, 240, 119)');
    });

    $('#logo-img').on('mouseout', function() {
        $('#logo-img').attr('src', 'assets/logo.png');
        $('#title-text').css('color', 'white');
    });

    $('#title-text').on('mouseover', function() {
        $('#logo-img').attr('src', 'assets/logo-yellow.png');
        $('#title-text').css('color', 'rgb(240, 240, 119)');
    });

    $('#title-text').on('mouseout', function() {
        $('#logo-img').attr('src', 'assets/logo.png');
        $('#title-text').css('color', 'white');
    });
});