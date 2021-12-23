let isDropdownOpen = false;

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

function controlDropdown(elem) {
    $('#' + elem + '-text').on('click', function() {
        if (!isDropdownOpen) {
            $('#' + elem + '-content').css('display', 'block');
        } else {
            $('#' + elem + '-content').css('display', 'none');
        }

        isDropdownOpen = !isDropdownOpen;
    });

    $('#' + elem + '-dropdown').on('click', function() {
        if (!isDropdownOpen) {
            $('#' + elem + '-content').css('display', 'block');
        } else {
            $('#' + elem + '-content').css('display', 'none');
        }

        isDropdownOpen = !isDropdownOpen;
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