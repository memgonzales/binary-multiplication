function hoverSelectedElem(elem) {
    $('#' + elem + '-text').on('mouseover', function() {
        if ($('#' + elem + '-text').attr('class') != 'selected') {
            $('#' + elem + '-logo').attr('src', 'assets/' + elem + '-yellow.png');
            $('#' + elem + '-text').css('color', yellow);
        }
    });

    $('#' + elem + '-text').on('mouseout', function() {
        if ($('#' + elem + '-text').attr('class') != 'selected') {
            $('#' + elem + '-logo').attr('src', 'assets/' + elem + '.png');
            $('#' + elem + '-text').css('color', white);
        }
    });

    $('#' + elem + '-logo').on('mouseover', function() {
        if ($('#' + elem + '-text').attr('class') != 'selected') {
            $('#' + elem + '-logo').attr('src', 'assets/' + elem + '-yellow.png');
            $('#' + elem + '-text').css('color', yellow);
        }
    });

    $('#' + elem + '-logo').on('mouseout', function() {
        if ($('#' + elem + '-text').attr('class') != 'selected') {
            $('#' + elem + '-logo').attr('src', 'assets/' + elem + '.png');
            $('#' + elem + '-text').css('color', white);
        }
    });
}

function hoverElem(elem) {
    $('#' + elem + '-text').on('mouseover', function() {
        $('#' + elem + '-logo').attr('src', 'assets/' + elem + '-yellow.png');
        $('#' + elem + '-text').css('color', yellow);
    });

    $('#' + elem + '-text').on('mouseout', function() {
        $('#' + elem + '-logo').attr('src', 'assets/' + elem + '.png');
        $('#' + elem + '-text').css('color', white);
    });

    $('#' + elem + '-logo').on('mouseover', function() {
        $('#' + elem + '-logo').attr('src', 'assets/' + elem + '-yellow.png');
        $('#' + elem + '-text').css('color', yellow);
    });

    $('#' + elem + '-logo').on('mouseout', function() {
        $('#' + elem + '-logo').attr('src', 'assets/' + elem + '.png');
        $('#' + elem + '-text').css('color', white);
    });
}

function clickMulMethod(elems, clickedElem) {
    $('#' + clickedElem + '-text').on('click', function() {
        for (const elem of elems) {
            $('#' + elem + '-logo').attr('src', 'assets/' + elem + '.png');
            $('#' + elem + '-text').css('color', white);
            $('#' + elem + '-text').removeClass('selected');
        }

        $('#' + clickedElem + '-logo').attr('src', 'assets/' + clickedElem + '-yellow.png');
        $('#' + clickedElem + '-text').addClass('selected');
    });
}