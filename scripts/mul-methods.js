function hoverElemUtilYellow(elem) {
    if ($('#' + elem + '-text').attr('class') != 'selected') {
        $('#' + elem + '-logo').attr('src', 'assets/' + elem + '-yellow.png');
        $('#' + elem + '-text').css('color', yellow);
    }
}

function hoverElemUtilWhite(elem) {
    if ($('#' + elem + '-text').attr('class') != 'selected') {
        $('#' + elem + '-logo').attr('src', 'assets/' + elem + '.png');
        $('#' + elem + '-text').css('color', white);
    }
}

function hoverSelectedElem(elem) {
    $('#' + elem + '-text').on('mouseover', function() {
        if ($('#' + elem + '-text').attr('class') != 'selected') {
            hoverElemUtilYellow(elem);
        }
    });

    $('#' + elem + '-text').on('mouseout', function() {
        if ($('#' + elem + '-text').attr('class') != 'selected') {
            hoverElemUtilWhite(elem);
        }
    });

    $('#' + elem + '-logo').on('mouseover', function() {
        if ($('#' + elem + '-text').attr('class') != 'selected') {
            hoverElemUtilYellow(elem);
        }
    });

    $('#' + elem + '-logo').on('mouseout', function() {
        if ($('#' + elem + '-text').attr('class') != 'selected') {
            hoverElemUtilWhite(elem);
        }
    });
}

function hoverElem(elem) {
    $('#' + elem + '-text').on('mouseover', function() {
        hoverElemUtilYellow(elem);
    });

    $('#' + elem + '-text').on('mouseout', function() {
        hoverElemUtilWhite(elem);
    });

    $('#' + elem + '-logo').on('mouseover', function() {
        hoverElemUtilYellow(elem);
    });

    $('#' + elem + '-logo').on('mouseout', function() {
        hoverElemUtilWhite(elem);
    });
}

function clickMulMethodElem(elems, clickedElem) {
    for (const elem of elems) {
        $('#' + elem + '-logo').attr('src', 'assets/' + elem + '.png');
        $('#' + elem + '-text').css('color', white);
        $('#' + elem + '-text').removeClass('selected');
    }

    $('#' + clickedElem + '-logo').attr('src', 'assets/' + clickedElem + '-yellow.png');
    $('#' + clickedElem + '-text').addClass('selected');
}

function clickMulMethod(elems, clickedElem) {
    $('#' + clickedElem + '-text').on('click', function() {
        clickMulMethodElem(elems, clickedElem);
    });

    $('#' + clickedElem + '-logo').on('click', function() {
        clickMulMethodElem(elems, clickedElem);
    });
}