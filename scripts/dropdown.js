function controlDropdown(elem) {
    let isDropdownOpen = false;

    $('#' + elem + '-text').on('click', function() {
        $('#' + elem + '-content').css('display', 'block');
        isDropdownOpen = true;
    });

    $('#' + elem + '-dropdown').on('click', function() {
        $('#' + elem + '-content').css('display', 'block');
        isDropdownOpen = true;
    });

    clickDropdown(elem);

    $('html').on('click', function(e) {
        if (canCloseDropdown(e, elem, isDropdownOpen)) {
            $('#' + elem + '-content').css('display', 'none');
        }
    });
}

function canCloseDropdown(e, elem, isDropdownOpen) {
    return !$(e.target).is($('#' + elem + '-option')) && !$(e.target).is($('#' + elem + '-text')) && isDropdownOpen;
}

function clickDropdown(elem) {
    $('#' + elem + '-option').on('click', function() {
        const currentOption = $('#' + elem + '-text').text();
        const selectedOption = $('#' + elem + '-option').text();

        $('#' + elem + '-content').css('display', 'none');
        $('#' + elem + '-text').text(selectedOption);
        $('#' + elem + '-option').text(currentOption);
    });
}