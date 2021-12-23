function expandCollapseDropdown(elem) {
    $('#' + elem + '-text').on('click', function() {
        $('#' + elem + '-content').css('display', 'block');
    });

    $('#' + elem + '-dropdown').on('click', function() {
        $('#' + elem + '-content').css('display', 'block');
    });

    $('#' + elem + '-text').on('blur', function() {
        $('#' + elem + '-content').css('display', 'none');
    });

    $('#' + elem + '-dropdown').on('blur', function() {
        $('#' + elem + '-content').css('display', 'none');
    });
}

function clickDropdown(elem) {
    
}