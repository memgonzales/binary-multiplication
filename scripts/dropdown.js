function expandCollapseDropdown(elem) {
    $('#' + elem + '-text').on('click', function() {
        $('#' + elem + '-content').css('display', 'block');
    });

    $('#' + elem + '-dropdown').on('click', function() {
        $('#' + elem + '-content').css('display', 'block');
    });

    $('#' + elem + '-dropdown').on('blur', function() {
        setTimeout(function() {
            $('#' + elem + '-content').css('display', 'none');
        }, 50);
    });
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