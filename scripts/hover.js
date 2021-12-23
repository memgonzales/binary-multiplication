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

function hoverDropdown(elem) {    
    $('#' + elem + '-text').on('mouseover', function() {
        $('#' + elem + '-dropdown').css('color', yellow);
        $('#' + elem + '-text').css('color', yellow);
    });

    $('#' + elem + '-text').on('mouseout', function() {
        $('#' + elem + '-dropdown').css('color', white);
        $('#' + elem + '-text').css('color', white);
    });

    $('#' + elem + '-dropdown').on('mouseover', function() {
        $('#' + elem + '-dropdown').css('color', yellow);
        $('#' + elem + '-text').css('color', yellow);    });

    $('#' + elem + '-dropdown').on('mouseout', function() {
        $('#' + elem + '-dropdown').css('color', white);
        $('#' + elem + '-text').css('color', white);
    });
}