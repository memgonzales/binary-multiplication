function extendedBoothsInit(multiplicandBin, multiplierBin) {
    $('#algo-steps').html(`${extendedBoothsStepA}<br>${extendedBoothsStepB}`);

    const totalSteps = Math.max(multiplicandBin.length, multiplierBin.length);
    $('#total-steps').text(totalSteps);
}

function displayEqualizedBitsUtil(multiplicandBin, multiplierBin) {
    const [multiplicand, multiplier] = equalizeBits(multiplicandBin, multiplierBin);
    const bitDifference = Math.abs(multiplicandBin.length - multiplierBin.length);

    const template = 
        `<div class = "indented-2 demo-box">
            <table class = "demo-box-table">
                <tr>
                    <th>Multiplicand</th>
                    <td>${multiplicand}</td>
                </tr>
                <tr>
                    <th>Multiplier</th>
                    <td>${multiplier.substring(0, bitDifference)}${multiplier.substring(bitDifference)}</td>
                </tr>
            </table>
        </div>`;

    const contents = $('#algo-steps').html();
    $('#algo-steps').html(`${contents}${template}`);

    incrementStepNumber();
}

function displayEqualizedBits(multiplicandBin, multiplierBin) {
    $('#next-step').on('click', function() {
        if (checkMulMethod(algoNames[2]) && $('#step-number').val() == 1) {
            displayEqualizedBitsUtil(multiplicandBin, multiplierBin)
        }
    });
}

function extendedBoothsDemo(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec) {
    extendedBoothsInit(multiplicandBin, multiplierBin);
    displayEqualizedBits(multiplicandBin, multiplierBin);
}