/** 
 * File containing the utility functions for the demonstration (simulation).
 */

/**
 * Initializes the step number.
 */
function initStepNumber() {
    $('#step-number-value').text(1);
    $('#step-number').val(1);
}

/**
 * Increments the step number.
 */
function incrementStepNumber() {
    $('#step-number-value').text(parseInt($('#step-number-value').text()) + 1);
    $('#step-number').val($('#step-number-value').text());
}

/**
 * Checks whether the selected multiplication method is the same as the specified method.
 * 
 * @param {string} mulMethod Multiplication method.
 * @returns `true` if the selected multiplication method is the same as the specified method; `false`, otherwise.
 */
function checkMulMethod(mulMethod) {
    return $('#algo-value').text() == mulMethod;
}

/**
 * Starts the demonstration (simulation) when the multiply button is clicked.
 */
function demo() {
    $('#multiply').on('click', function() {
        /* Unbind the jQuery click callback of the playback controls. */
        $('#next-step').prop('onclick', null).off('click');

        /* Clear the results area. */
        $('#algo-name').hide();
        $('#algo-steps').html('');

        initStepNumber();

        const multiplicandBin = $('#multiplicand-bin').val();
        const multiplierBin = $('#multiplier-bin').val();
        const multiplicandDec = $('#multiplicand-dec').val();
        const multiplierDec = $('#multiplier-dec').val();

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