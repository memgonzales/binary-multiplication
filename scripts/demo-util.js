function demo() {
    $('#multiply').on('click', function() {
        const multiplicandBin = $('#multiplicand-bin').val();
        const multiplierBin = $('#multiplier-bin').val();
        const multiplicandDec = $('#multiplicand-dec').val();
        const multiplierDec = $('#multiplier-dec').val();

        $('#algo-name').hide();
        $('#algo-steps').html('');

        switch($('#algo-value').text()) {
            case 'Pencil-and-Paper Method':
                break;
            case 'Booth\'s Algorithm':
                break;
            case 'Extended Booth\'s Algorithm': 
                extendedBoothsDemo(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec);
                break;
        }
    });
}

function initStepNumber() {
    $('#step-number-value').text(1);
    $('#step-number').val(1);
}

function incrementStepNumber() {
    $('#step-number-value').text(parseInt($('#step-number-value').text()) + 1);
    $('#step-number').val($('#step-number-value').text());
}