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

    function hoverMulMethod(method) {
        $('#' + method + '-text').on('mouseover', function() {
            if ($('#' + method + '-text').attr('class') != 'selected') {
                $('#' + method + '-logo').attr('src', 'assets/' + method + '-yellow.png');
                $('#' + method + '-text').css('color', yellow);
            }
        });

        $('#' + method + '-text').on('mouseout', function() {
            if ($('#' + method + '-text').attr('class') != 'selected') {
                $('#' + method + '-logo').attr('src', 'assets/' + method + '.png');
                $('#' + method + '-text').css('color', 'white');
            }
        });

        $('#' + method + '-logo').on('mouseover', function() {
            if ($('#' + method + '-text').attr('class') != 'selected') {
                $('#' + method + '-logo').attr('src', 'assets/' + method + '-yellow.png');
                $('#' + method + '-text').css('color', yellow);
            }
        });

        $('#' + method + '-logo').on('mouseout', function() {
            if ($('#' + method + '-text').attr('class') != 'selected') {
                $('#' + method + '-logo').attr('src', 'assets/' + method + '.png');
                $('#' + method + '-text').css('color', 'white');
            }
        });
    }

    const mulMethods = ['pencil', 'booths', 'extended-booths'];
    for (let mulMethod of mulMethods) {
        hoverMulMethod(mulMethod);
    }
});