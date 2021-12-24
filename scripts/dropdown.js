let isDropdownOpen = false;

function hoverDropdownUtilYellow(elem) {
    $('#' + elem + '-dropdown').css('color', yellow);
    $('#' + elem + '-text').css('color', yellow);
}

function hoverDropdownUtilWhite(elem) {
    $('#' + elem + '-dropdown').css('color', white);
    $('#' + elem + '-text').css('color', white);
}

function hoverDropdown(elem) {    
    $('#' + elem + '-text').on('mouseover', function() {
        hoverDropdownUtilYellow(elem);
    });

    $('#' + elem + '-text').on('mouseout', function() {
        hoverDropdownUtilWhite(elem);
    });

    $('#' + elem + '-dropdown').on('mouseover', function() {
        hoverDropdownUtilYellow(elem);
    });

    $('#' + elem + '-dropdown').on('mouseout', function() {
        hoverDropdownUtilWhite(elem);
    });
}

function controlDropdownUtil(elem) {
    if (!isDropdownOpen) {
        $('#' + elem + '-content').css('display', 'block');
    } else {
        $('#' + elem + '-content').css('display', 'none');
    }

    isDropdownOpen = !isDropdownOpen;
}

function controlDropdown(elem) {
    $('#' + elem + '-text').on('click', function() {
        controlDropdownUtil(elem);
    });

    $('#' + elem + '-dropdown').on('click', function() {
        controlDropdownUtil(elem);
    });

    clickDropdown(elem);

    $('html').on('click', function(e) {
        if (canCloseDropdown(e, elem, isDropdownOpen)) {
            $('#' + elem + '-content').css('display', 'none');
            isDropdownOpen = false;
        }
    });
}

function canCloseDropdown(e, elem, isDropdownOpen) {
    return !$(e.target).is($('#' + elem + '-option')) && 
        !$(e.target).is($('#' + elem + '-text')) && 
        !$(e.target).is($('#' + elem + '-dropdown')) &&
        isDropdownOpen;
}

function clickDropdown(elem) {
    $('#' + elem + '-option').on('click', function() {
        const currentOption = $('#' + elem + '-text').text();
        const selectedOption = $('#' + elem + '-option').text();

        $('#' + elem + '-content').css('display', 'none');
        $('#' + elem + '-text').text(selectedOption);
        $('#' + elem + '-option').text(currentOption);

        isDropdownOpen = false;
    });
}