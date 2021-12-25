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
    let splitMultipliers = [];

    for (let i = multiplierForRecoding.length - 1; i >= 2; i -= 2) {
        const recode = 
            recodeMap.get(`${multiplierForRecoding.substring(i - 2, i + 1)}`);

        extendedBooths = `${recode} ${extendedBooths}`;

        const substr1 = `${multiplierForRecoding.substring(0, i - 2)}`;
        const substr2 = `${multiplierForRecoding.substring(i - 2, i + 1)}`;
        const substr3 = `${multiplierForRecoding.substring(i + 1)}`;

        splitMultipliers.push(`${substr1}<b class = "emphasized">${substr2}</b>${substr3}`);
    }

    let extendedBoothsArray = extendedBooths.trim().split(' ').reverse();
    for (let i = 1; i < extendedBoothsArray.length; i++) {
        extendedBoothsArray[i] = `${extendedBoothsArray[i]} ${extendedBoothsArray[i - 1]}`;
    }

    const templateNoDiv = 
        `<table class = "demo-box-table">
            <tr>
                <th>Modified Multiplier</th>
                <td>${splitMultipliers[recodeNumber]}</td>
            </tr>
            <tr>
                <th>Extended Booth's</th>
                <td>${extendedBoothsArray[recodeNumber]}</td>
            </tr>
        </table>`;

    const template = 
        `<div id = "extended-booths-demo-box-recoding" class = "indented-3 demo-box">
            ${templateNoDiv}
        </div><br>`;

    if (recodeNumber == 0) {
        const contents = $('#algo-steps').html();
        $('#algo-steps').html(`${contents}${template}`);
    } else {
        $('#extended-booths-demo-box-recoding').html(templateNoDiv);
    }

    incrementStepNumber();
    window.scrollTo(0, document.body.scrollHeight);

    return extendedBoothsArray[extendedBoothsArray.length - 1];
}

function extendedBoothsDisplayStepD() {
    const contents = $('#algo-steps').html();
    $('#algo-steps').html(`${contents}${extendedBoothsStepD}${extendedBoothsStepDShowTable}${extendedBoothsStepDTableProvision}`);

    incrementStepNumber();
}

function showExtendedBoothsRecoding() {
    if ($('#extended-booths-step-c-table-provision').html() == '') {
        $('#extended-booths-step-c-table-provision').html(`${extendedBoothsStepCTable}`);
        $('#show-hide-extended-booths-recoding').text('hide');
    } else {
        $('#extended-booths-step-c-table-provision').html('');
        $('#show-hide-extended-booths-recoding').text('show');
    }
}

function showExtendedBoothsOperations() {
    if ($('#extended-booths-step-d-table-provision').html() == '') {
        $('#extended-booths-step-d-table-provision').html(`${extendedBoothsStepDTable}`);
        $('#show-hide-extended-booths-operations').text('hide');
    } else {
        $('#extended-booths-step-d-table-provision').html('');
        $('#show-hide-extended-booths-operations').text('show');
    }
}

function extendedBoothsPencil(displayNumber, multiplicand, multiplicandDec, extendedBoothsRecoding) {
    const template = 
        `<div class = "indented-2 demo-box">
            <table id = "extended-booths-pencil-table" class = "demo-box-table pencil-table">
                <tr>
                    <th></th>
                    <td class = "right-align">${multiplicand}</td>
                </tr>
                <tr class = "bottom-border">
                    <th class = "no-bold">&times;</th>
                    <td class = "right-align">${extendedBoothsRecoding}</td>
                </tr>
            </table>
        </div><br>`;

    let summands = [];
    const extendedBoothsArray = extendedBoothsRecoding.trim().split(' ').reverse();

    for (let i = 0; i < extendedBoothsArray.length; i++) {
        summands.push(multiply(multiplicandDec, parseInt(extendedBoothsArray[i]), 2 * multiplicand.length - i));
    }

    const addlRow = 
        `<tr>
            <th class = "no-bold"></th>
            <td class>${summands[displayNumber - 1]}</td>
        </tr>`;

    if (displayNumber == 0) {
        const contents = $('#algo-steps').html();
        $('#algo-steps').html(`${contents}${template}`);
    } else {
        const contents = $('#extended-booths-pencil-table').html();
        $('#extended-booths-pencil-table').html(`${contents}${addlRow}`);
    }

    incrementStepNumber();
}

function extendedBoothsSteps(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec) {
    const [multiplicand, multiplier] = equalizeBits(multiplicandBin, multiplierBin);
    const multiplierZeroAppended = `${multiplier}0`;
    let extendedBoothsRecoding = '';

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
                extendedBoothsRecoding = extendedBoothsRecode(stepNumber - 7, multiplierForRecoding);
            } else if (stepNumber == 7 + numDigitsRecoding) {
                extendedBoothsDisplayStepD();
            } else {
                alert(stepNumber - 8 - numDigitsRecoding);
                extendedBoothsPencil(stepNumber - 8 - numDigitsRecoding, multiplicand, multiplicandDec, extendedBoothsRecoding);
            }

            window.scrollTo(0, document.body.scrollHeight);
        }
    });
}

function extendedBoothsDemo(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec) {
    extendedBoothsInit(multiplicandBin, multiplierBin);
    extendedBoothsSteps(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec);
}