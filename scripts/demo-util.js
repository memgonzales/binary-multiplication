function initStepNumber() {
    $('#step-number-value').text(1);
    $('#step-number').val(1);
}

function incrementStepNumber() {
    $('#step-number-value').text(parseInt($('#step-number-value').text()) + 1);
    $('#step-number').val($('#step-number-value').text());
}

function checkMulMethod(mulMethod) {
    return $('#algo-value').text() == mulMethod;
}

function demo() {
    $('#multiply').on('click', function() {
        $('#next-step').prop('onclick', null).off('click');

        const multiplicandBin = $('#multiplicand-bin').val();
        const multiplierBin = $('#multiplier-bin').val();
        const multiplicandDec = $('#multiplicand-dec').val();
        const multiplierDec = $('#multiplier-dec').val();

        $('#algo-name').hide();
        $('#algo-steps').html('');

        initStepNumber();

        switch($('#algo-value').text()) {
            case algoNames[0]:      /* Pencil-and-Paper Method */
                break;
            case algoNames[1]:      /* Booth's Algorithm */
                break;
            case algoNames[2]:      /* Extended Booth's Algorithm */
                extendedBoothsDemo(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec);
                break;
        }
    });
}