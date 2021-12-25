function extendedBoothsInit() {
    $('#algo-steps').html(`${extendedBoothsStepA}<br>${extendedBoothsStepB}`);
    initStepNumber();
}

function displayEqualizedBitsUtil(multiplicandBin, multiplierBin) {
    const [multiplicand, multiplier] = equalizeBits(multiplicandBin, multiplierBin);
    const template = 
        `<div>
            Hello
        </div>`;

    $('#algo-steps').html($('#algo-steps').html() + "Hi");
    incrementStepNumber();
}

function displayEqualizedBits(multiplicandBin, multiplierBin) {
    if ($('#step-number').val() == 1) {
        $('#next-step').on('click', function() {
            displayEqualizedBitsUtil(multiplicandBin, multiplierBin)
        });
    }
}

function extendedBoothsDemo(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec) {
    extendedBoothsInit();
    displayEqualizedBits(multiplicandBin, multiplierBin);
}