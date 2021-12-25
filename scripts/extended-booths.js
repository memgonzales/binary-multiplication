function extendedBoothsInit(multiplicandBin, multiplierBin) {
    $('#algo-steps').html(`${extendedBoothsStepA}<br>${extendedBoothsStepB}`);

    const totalSteps = Math.max(multiplicandBin.length, multiplierBin.length);
    $('#total-steps').text(totalSteps);
}

function extendedBoothsDisplayEqualizedBits(multiplicandBin, multiplierBin, multiplicand, multiplier) {
    const bitDifference = Math.abs(multiplicandBin.length - multiplierBin.length);

    let multiplicandFormatted = multiplicand;
    let multiplierFormatted = multiplier;

    if (multiplicandBin.length < multiplierBin.length) {
        multiplicandFormatted = `<b class = "emphasized">${multiplicand.substring(0, bitDifference)}</b>${multiplicand.substring(bitDifference)}`;
    } else {
        multiplierFormatted = `<b class = "emphasized">${multiplier.substring(0, bitDifference)}</b>${multiplier.substring(bitDifference)}`;
    }

    const template = 
        `<div class = "indented-2 demo-box">
            <table class = "demo-box-table">
                <tr>
                    <th>Multiplicand</th>
                    <td>${multiplicandFormatted}</td>
                </tr>
                <tr>
                    <th>Multiplier</th>
                    <td>${multiplierFormatted}</td>
                </tr>
            </table>
        </div><br>`;

    const contents = $('#algo-steps').html();
    $('#algo-steps').html(`${contents}${template}`);

    incrementStepNumber();
}

function extendedBoothsDisplayStepC01() {
    const contents = $('#algo-steps').html();
    $('#algo-steps').html(`${contents}${extendedBoothsStepC0}${extendedBoothsStepC1}`);

    incrementStepNumber();
}

function extendedBoothsAppendZero(multiplierZeroAppended) {
    const multiplierFormatted = 
        `${multiplierZeroAppended.substring(0, multiplierZeroAppended.length - 1)}<b class = "emphasized">0</b>`;

    const template = 
        `<div class = "indented-3 demo-box">
            <table class = "demo-box-table">
                <tr>
                    <th class = "no-bold">${multiplierFormatted}</th>
                </tr>
            </table>
        </div><br>`;

    const contents = $('#algo-steps').html();
    $('#algo-steps').html(`${contents}${template}`);

    incrementStepNumber();
}

function extendedBoothsDisplayStepC2() {
    const contents = $('#algo-steps').html();
    $('#algo-steps').html(`${contents}${extendedBoothsStepC2}`);

    incrementStepNumber();
}

function extendedBoothsOddSignExtend(multiplier, multiplierForRecoding) {
    let multiplierFormatted = `${multiplierForRecoding} &nbsp;&nbsp;&nbsp; (no need for sign extension)`;
    if (multiplier.length % 2 != 0) {
        multiplierFormatted = 
            `<b class = "emphasized">${multiplierForRecoding.substr(0, 1)}</b>${multiplierForRecoding.substr(1)}`;
    }

    const template = 
        `<div class = "indented-3 demo-box">
            <table class = "demo-box-table">
                <tr>
                    <th class = "no-bold">${multiplierFormatted}</th>
                </tr>
            </table>
        </div><br>`;

    const contents = $('#algo-steps').html();
    $('#algo-steps').html(`${contents}${template}`);

    incrementStepNumber();
}

function extendedBoothsDisplayStepC3() {
    const contents = $('#algo-steps').html();
    $('#algo-steps').html(`${contents}${extendedBoothsStepC3}${extendedBoothsStepCShowTable}${extendedBoothsStepCTableProvision}`);

    incrementStepNumber();
}

function extendedBoothsRecode(recodeNumber, multiplierForRecoding) {
    const recodeMap = new Map();
    recodeMap.set('000', '0');
    recodeMap.set('001', '+1');
    recodeMap.set('010', '+1');
    recodeMap.set('011', '+2');
    recodeMap.set('100', '-2');
    recodeMap.set('101', '-1');
    recodeMap.set('110', '-1');
    recodeMap.set('111', '0');

    let extendedBooths = ``;
    for (let i = multiplierForRecoding.length - 1; i >= 2; i--) {
        const recode = 
            recodeMap.get(`${multiplierForRecoding[i - 2]}${multiplierForRecoding[i - 1]}${multiplierForRecoding[i]}`);
        extendedBooths = `${recode}${extendedBooths}`;
    }

    incrementStepNumber();
}

function showExtendedBoothsRecoding() {
    $('#show-extended-booths-recording').on('click', function() {
        if ($('#extended-booths-step-c-table-provision').html() == '') {
            $('#extended-booths-step-c-table-provision').html(`${extendedBoothsStepCTable}`);
        } else {
            $('#extended-booths-step-c-table-provision').html('');
        }
    });
}

function extendedBoothsSteps(multiplicandBin, multiplierBin) {
    const [multiplicand, multiplier] = equalizeBits(multiplicandBin, multiplierBin);
    const multiplierZeroAppended = `${multiplier}0`;

    let multiplierForRecoding = multiplierZeroAppended;
    if (multiplier.length % 2 != 0) {
        multiplierForRecoding = signExtend(multiplierZeroAppended, multiplierZeroAppended.length + 1);
    }

    const numDigitsRecoding = Math.floor(multiplierForRecoding.length / 2);

    $('#next-step').on('click', function() {
        if (checkMulMethod(algoNames[2]) ) {
            const stepNumber = parseInt($('#step-number-value').text());
            if (stepNumber == 1) {
                extendedBoothsDisplayEqualizedBits(multiplicandBin, multiplierBin, multiplicand, multiplier);
            } else if (stepNumber == 2) {
                extendedBoothsDisplayStepC01();
            } else if (stepNumber == 3) {
                extendedBoothsAppendZero(multiplierZeroAppended);
            } else if (stepNumber == 4) {
                extendedBoothsDisplayStepC2();
            } else if (stepNumber == 5) {
                extendedBoothsOddSignExtend(multiplier, multiplierForRecoding);
            } else if (stepNumber == 6) {
                extendedBoothsDisplayStepC3();
            } else if (stepNumber <= 6 + numDigitsRecoding) {
                extendedBoothsRecode(stepNumber - 7, multiplierForRecoding);
            }

            showExtendedBoothsRecoding();
            window.scrollTo(0,document.body.scrollHeight);
        }
    });
}

function extendedBoothsDemo(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec) {
    extendedBoothsInit(multiplicandBin, multiplierBin);
    extendedBoothsSteps(multiplicandBin, multiplierBin);
}