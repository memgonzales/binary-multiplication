$(function() {
    const yellow = 'rgb(240, 240, 119)';
    const timer = 180;

    $('#logo-img').attr('src', 'assets/logo.png');
    $('#title-text').text('10111010101');
    $('#title-text').css('color', yellow);

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
            $('#title-text').css('color', yellow);
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
            $('#title-text').css('color', yellow);
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
            $('#title-text').html('BINARY<span style = "margin-left: 11px;"></span>MULTIPLICAT<span class = "code">10</span>N');
            $('.code').css('font-size', '18px');
            $('.code').css('color', yellow);
        }, 6 * timer
    )

    setTimeout(
        function() {
            $('#logo-img').attr('src', 'assets/logo.png');
            $('#title-text').html('BINARY<span style = "margin-left: 11px;"></span>MULTIPLICATION');

            $('.hidden').css('visibility', 'visible');
        }, 9 * timer
    )

    $('#logo-img').on('mouseover', function() {
        $('#logo-img').attr('src', 'assets/logo-yellow.png');
        $('#title-text').css('color', yellow);
    });

    $('#logo-img').on('mouseout', function() {
        $('#logo-img').attr('src', 'assets/logo.png');
        $('#title-text').css('color', 'white');
    });

    $('#title-text').on('mouseover', function() {
        $('#logo-img').attr('src', 'assets/logo-yellow.png');
        $('#title-text').css('color', yellow);
    });

    $('#title-text').on('mouseout', function() {
        $('#logo-img').attr('src', 'assets/logo.png');
        $('#title-text').css('color', 'white');
    });

    $('#pencil-text').on('mouseover', function() {
        if ($('#pencil-text').attr('class') != 'selected') {
            $('#pencil-logo').attr('src', 'assets/pencil-yellow.png');
        }
    });

    $('#pencil-text').on('mouseout', function() {
        if ($('#pencil-text').attr('class') != 'selected') {
            $('#pencil-logo').attr('src', 'assets/pencil.png');
        }
    });
});