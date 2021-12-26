/** 
 * File containing the utility functions for the demonstration (simulation) of the extended Booth's algorithm.
 */

 const productRow =
    `<tr>
        <th id = "extended-booths-product-carry-over" class = "no-bold right-align carry-over blurred"></th>
        <td id = "extended-booths-product" class = "right-align"></td>
    </tr>`;

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
    let multiplierFormatted = 
        `<span class = "blurred">${multiplierForRecoding} &nbsp;&nbsp;&nbsp; (no need for sign extension)</span>`;

    let template = 
        `<div class = "indented-3 demo-box-blurred">
            <table class = "demo-box-table">
                <tr>
                    <th class = "no-bold">${multiplierFormatted}</th>
                </tr>
            </table>
        </div><br>`;

    if (multiplier.length % 2 != 0) {
        multiplierFormatted = 
            `<b class = "emphasized">${multiplierForRecoding.substr(0, 1)}</b>${multiplierForRecoding.substr(1)}`;

        template = 
            `<div class = "indented-3 demo-box">
                <table class = "demo-box-table">
                    <tr>
                        <th class = "no-bold">${multiplierFormatted}</th>
                    </tr>
                </table>
            </div><br>`;
    }

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
    let extendedBoothsDisplay = extendedBooths.trim().split(' ').reverse();
    for (let i = 1; i < extendedBoothsArray.length; i++) {
        extendedBoothsDisplay[i] = `<b class = "emphasized">${extendedBoothsArray[i]}</b> ${extendedBoothsArray[i - 1]}`;
        extendedBoothsArray[i] = `${extendedBoothsArray[i]} ${extendedBoothsArray[i - 1]}`;
    }

    const templateNoDiv = 
        `<table class = "demo-box-table">
            <tr>
                <th>Modified Multiplier</th>
                <td id = "modified-multiplier">${splitMultipliers[recodeNumber]}</td>
            </tr>
            <tr>
                <th>Extended Booth's</th>
                <td id = "extended-booths-display">${extendedBoothsDisplay[recodeNumber]}</td>
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

function extendedBoothsDisplayStepD(multiplierForRecoding, extendedBoothsRecoding) {
    const contents = $('#algo-steps').html();
    $('#algo-steps').html(`${contents}${extendedBoothsStepD}${extendedBoothsStepDShowTable}${extendedBoothsStepDTableProvision}`);

    $('#modified-multiplier').text(multiplierForRecoding);
    $('#extended-booths-display').text(extendedBoothsRecoding);

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

function extendedBoothsPencil(displayNumber, multiplicand, multiplicandDec, multiplierDec, extendedBoothsRecoding) {
    let summands = [];
    let summandsFormatted = [];
    let extendedBoothsDisplay = [];

    const extendedBoothsArray = extendedBoothsRecoding.trim().split(' ').reverse();

    for (let i = 0; i < extendedBoothsArray.length; i++) {
        const multiplier = parseInt(extendedBoothsArray[i]);
        summands.push(multiply(multiplicandDec, multiplier, 2 * (multiplicand.length - i)));
        summandsFormatted.push(emphasizeProduct(multiplicand, multiplier, summands[i]));

        extendedBoothsDisplay.push(extendedBoothsRecoding.trim().split(' ').reverse());
        extendedBoothsDisplay[i][i] = `<b class = "emphasized no-underline">${extendedBoothsArray[i]}</b>`;
        extendedBoothsDisplay[i] = extendedBoothsDisplay[i].reverse().join(' ');
    }

    const template = 
        `<div class = "indented-2 demo-box">
            <table id = "extended-booths-pencil-table" class = "demo-box-table pencil-table">
                <tr>
                    <th></th>
                    <td id = "step-d-extended-booths-multiplicand" class = "right-align">${multiplicand}</td>
                    <td class = "carry-over">
                        <b>Carry-over:</b>
                    </td>
                </tr>
                <tr class = "bottom-border">
                    <th class = "no-bold">&times;</th>
                    <td id = "step-d-extended-booths-display" class = "right-align">${extendedBoothsRecoding}</td>
                    <td class = "carry-over">
                        <span id = "extended-booths-carry-over"></span>
                    </td>
                </tr>
            </table>
        </div><br>`;

    let addlRow = 
        `<tr>
            <th class = "no-bold"></th>
            <td id = "extended-booths-summands-${displayNumber - 1}">${summandsFormatted[displayNumber - 1]}</td>
        </tr>`;

    const numBitsProduct = 2 * multiplicand.length;
    const numSummands = extendedBoothsArray.length;

    const product = multiply(multiplicandDec, multiplierDec, numBitsProduct);
    const productDisplay = formatProductDisplay(product);

    if (displayNumber == 0) {
        const contents = $('#algo-steps').html();
        $('#algo-steps').html(`${contents}${template}`);

    } else if (displayNumber <= numSummands) {
        const contents = $('#extended-booths-pencil-table').html();

        if (displayNumber == numSummands) {
            addlRow =
                `<tr class = "summands bottom-border">
                    <th class = "no-bold">+</th>
                    <td id = "extended-booths-summands-${displayNumber - 1}">${summandsFormatted[displayNumber - 1]}</td>
                </tr>`;
        }

        $('#extended-booths-pencil-table').html(`${contents}${addlRow}`);

        $('#step-d-extended-booths-multiplicand').html(`<b class = "emphasized no-underline">${multiplicand}</b>`);
        $('#step-d-extended-booths-display').html(`${extendedBoothsDisplay[displayNumber - 1]}`);
        $(`#extended-booths-summands-${displayNumber - 2}`).html(`${summands[displayNumber - 2]}`);

    } else if (displayNumber <= extendedBoothsArray.length + numBitsProduct) {
        if (displayNumber == extendedBoothsArray.length + 1) {
            $('#step-d-extended-booths-multiplicand').html(`${multiplicand}`);
            $('#step-d-extended-booths-display').html(`${extendedBoothsRecoding}`);
            $(`#extended-booths-summands-${displayNumber - 2}`).html(`${summands[displayNumber - 2]}`);
            $('.carry-over b').css('display', 'block');

            const contents = $('#extended-booths-pencil-table').html();
            $('#extended-booths-pencil-table').html(`${contents}${productRow}`);

        } else if (displayNumber == extendedBoothsArray.length + numBitsProduct) {
            $('#extended-booths-product-carry-over').text('shoob');

        }

        $('#extended-booths-carry-over').text('SHOOB');

        const index = numBitsProduct - (displayNumber - extendedBoothsArray.length);
        for (let i = 0; i < numSummands; i++) {
            const summand = $(`#extended-booths-summands-${i}`).text();
            if (index < summand.length) {
                const summandFormatted = 
                    `${summand.substring(0, index)}<b class = "emphasized no-underline">${summand[index]}</b>${summand.substring(index + 1)}`;

                $(`#extended-booths-summands-${i}`).html(summandFormatted);
            }
        }

        $('#extended-booths-product').html(`${productDisplay[displayNumber - extendedBoothsArray.length - 1]}`);
    }

    incrementStepNumber();

    return product;
}

function extendedBoothsVerify(multiplicandDec, multiplierDec, product, numSummands) {
    const contents = $('#algo-steps').html();
    const productDec = multiplicandDec * multiplierDec;
    const doubleCheck = 
        `${multiplicandDec}<sub>10</sub> &times; ${multiplierDec}<sub>10</sub> &nbsp;&nbsp;=&nbsp;&nbsp; ${productDec}<sub>10</sub> &nbsp;&nbsp;=&nbsp;&nbsp; <span class = "final-answer">&nbsp;&nbsp;${product}<sub>2</sub>&nbsp;&nbsp; </span><br><br>`;

    $('#algo-steps').html(`${contents}${verify} &nbsp;&nbsp; ${doubleCheck}`);
    hideCarryOver();

    for (let i = 0; i < numSummands; i++) {
        $(`#extended-booths-summands-${i} b`).addClass('remove-emphasis');
    }

    $('#extended-booths-product b').addClass('remove-emphasis');

    incrementStepNumber();
}

function extendedBoothsSteps(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec) {
    const [multiplicand, multiplier] = equalizeBits(multiplicandBin, multiplierBin);
    const multiplierZeroAppended = `${multiplier}0`;
    let extendedBoothsRecoding = '';
    let product = '';

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
                extendedBoothsDisplayStepD(multiplierForRecoding, extendedBoothsRecoding);
            } else if (stepNumber <= 8 + 2 * numDigitsRecoding + 2 * multiplicand.length) {
                product = extendedBoothsPencil(stepNumber - 8 - numDigitsRecoding, 
                    multiplicand, multiplicandDec, multiplierDec, extendedBoothsRecoding);
            } else if (stepNumber == 9 + 2 * numDigitsRecoding + 2 * multiplicand.length) {
                extendedBoothsVerify(multiplicandDec, multiplierDec, product, numDigitsRecoding);
            }

            window.scrollTo(0, document.body.scrollHeight);
        }
    });
}

function extendedBoothsDemo(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec) {
    extendedBoothsInit(multiplicandBin, multiplierBin);
    extendedBoothsSteps(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec);
}