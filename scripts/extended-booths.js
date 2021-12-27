/** 
 * File containing the utility functions for the demonstration (simulation) of the extended Booth's algorithm.
 */

/**
 * Row where the product is displayed (final steps of pencil-and-paper demonstration/simulation).
 */
 const productRow =
    `<tr>
        <th id = "extended-booths-product-carry-over" class = "no-bold right-align carry-over blurred"></th>
        <td id = "extended-booths-product" class = "right-align"></td>
    </tr>`;

/**
 * Bit-pair recoding table.
 */
const recodeMap = new Map();

/**
 * Initializes the results area at the start of the demonstration (simulation) and displays steps A and B.
 * 
 * Note that the initialization of the step number is handled in the demo() method in demo-util.js.
 * 
 * @param {string} multiplicandBin Binary multiplicand.
 * @param {string} multiplierBin Binary multiplier.
 */
function extendedBoothsInit(multiplicandBin, multiplierBin) {
    $('#algo-steps').html(`${extendedBoothsStepA}<br>${extendedBoothsStepB}`);
}

function extendedBoothsInitRecodeMap() {
    recodeMap.set('000', '0');
    recodeMap.set('001', '+1');
    recodeMap.set('010', '+1');
    recodeMap.set('011', '+2');
    recodeMap.set('100', '-2');
    recodeMap.set('101', '-1');
    recodeMap.set('110', '-1');
    recodeMap.set('111', '0');
}

/**
 * Initializes the total number of steps.
 * 
 * Note that the initialization of the step number is handled in the demo() method in demo-util.js.
 * 
 * @param {string} multiplicandBin Binary multiplicand.
 * @param {string} multiplierBin Binary multiplier.
 */
function extendedBoothsTotalSteps(multiplicandBin, multiplierBin) {
    const numBits = Math.max(multiplicandBin.length, multiplierBin.length);

    /* 
     * Extended Booth's results in the number of intermediate summands reduced by half. 
     *
     * For example,
     * - Multiplier: 10101 --> [after appending zero] 10101(0) --> [after sign extension] 110101(0) --> 3 summands
     * - Multiplier: 1010 --> [after appending zero] 1010(0) --> [after sign extension] 11010(0) --> 2 summands
     */
    const numDigitsRecoding = Math.ceil(numBits / 2);

    /* Should be one more than the conditional in the method extendedBoothsSteps() */
    $('#total-steps').text(10 + 2 * numDigitsRecoding + 2 * numBits);
}

/**
 * Displays the multiplicand and multiplier after their number of bits have been equalized, corresponding
 * to step B.
 * 
 * @param {string} multiplicandBin Binary multiplicand.
 * @param {string} multiplierBin Binary multiplier.
 * @param {string} multiplicand Multiplicand after number of bits has been equalized.
 * @param {string} multiplier Multiplier after number of bits has been equalized.
 */
function extendedBoothsDisplayEqualizedBits(multiplicandBin, multiplierBin, multiplicand, multiplier) {
    const bitDifference = Math.abs(multiplicandBin.length - multiplierBin.length);

    let multiplicandFormatted = multiplicand;
    let multiplierFormatted = multiplier;

    /* If the multiplier has more bits, highlight the sign extension of the multiplicand, and vice versa. */
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

    /* Append the template. */
    const contents = $('#algo-steps').html();
    $('#algo-steps').html(`${contents}${template}`);

    incrementStepNumber();
}

/**
 * Displays the first substep of step C.
 */
function extendedBoothsDisplayStepC01() {
    appendTemplate(`${extendedBoothsStepC0}${extendedBoothsStepC1}`);
    incrementStepNumber();
}

/**
 * Displays the multiplier after appending zero to its least significant bit.
 * 
 * @param {string} multiplierZeroAppended Multiplier after appending zero to its least significant bit.
 */
function extendedBoothsAppendZero(multiplierZeroAppended) {
    /* Highlight the appended zero. */
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

    appendTemplate(template);
    incrementStepNumber();
}

/**
 * Displays the second substep of step C.
 */
function extendedBoothsDisplayStepC2() {
    appendTemplate(`${extendedBoothsStepC2}`);
    incrementStepNumber();
}

/**
 * Displays the multiplier after appending zero to its least significant bit and performing sign extension
 * if its number of bits prior to appending zero is odd.
 * 
 * @param {string} multiplier 
 * @param {string} multiplierForRecoding Multiplier after appending zero to its least significant bit
 * and performing sign extension depending on its number of bits.
 */
function extendedBoothsOddSignExtend(multiplier, multiplierForRecoding) {
    /* Assume that no sign extension is needed (that is, the multiplier has an even number of bits). */
    let multiplierFormatted = 
        `<span class = "blurred">${multiplierForRecoding} &nbsp;&nbsp;&nbsp; (no need for sign extension)</span>`;
    let div = `<div class = "indented-3 demo-box-blurred">`;

    /* If the multiplier has an odd number of bits, sign extension is performed. */
    if (multiplier.length % 2 != 0) {
        multiplierFormatted = 
            `<b class = "emphasized">${multiplierForRecoding.substring(0, 1)}</b>${multiplierForRecoding.substring(1)}`;
        
        div = `<div class = "indented-3 demo-box">`;
    }

    const template = 
        `${div}
            <table class = "demo-box-table">
                <tr>
                    <th class = "no-bold">${multiplierFormatted}</th>
                </tr>
            </table>
        </div><br>`;

    appendTemplate(template);
    incrementStepNumber();
}

/**
 * Displays the third substep of step C.
 */
function extendedBoothsDisplayStepC3() {
    appendTemplate(`${extendedBoothsStepC3}${extendedBoothsStepCShowTable}${extendedBoothsStepCTableProvision}`);
    incrementStepNumber();
}

function extendedBoothsRecode(recodeNumber, multiplierForRecoding) {
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

    extendedBoothsDisplay[0] = `<b class = "emphasized">${extendedBoothsArray[0]}</b>`;
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
        appendTemplate(template);
    } else {
        $('#extended-booths-demo-box-recoding').html(templateNoDiv);
    }

    incrementStepNumber();
    window.scrollTo(0, document.body.scrollHeight);

    return extendedBoothsArray[extendedBoothsArray.length - 1];
}

/**
 * Displays step D.
 */
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
                    <th class = "no-bold right-align">&times;</th>
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
        appendTemplate(template);

    } else if (displayNumber <= numSummands) {
        const contents = $('#extended-booths-pencil-table').html();

        if (displayNumber == numSummands) {
            addlRow =
                `<tr class = "summands bottom-border">
                    <th class = "no-bold right-align">+</th>
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
        `${multiplicandDec}<sub>10</sub>&nbsp; &times; &nbsp;${multiplierDec}<sub>10</sub> &nbsp;&nbsp;=&nbsp;&nbsp; ${productDec}<sub>10</sub> &nbsp;&nbsp;=&nbsp;&nbsp; <span class = "final-answer">${product}<sub>2</sub></span><br>`;

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

function extendedBoothsRewind(multiplicandBin, multiplierBin) {
    $('#prev-step').on('click', function() {
        extendedBoothsGoTo(parseInt($('#step-number-value').text()) - 2, multiplicandBin, multiplierBin);
    });
}

function extendedBoothsGoToStep(multiplicandBin, multiplierBin) {
    $('#step-number').on('keyup', function(e) {
        if (e.code == 'Enter') {
            extendedBoothsGoTo(parseInt($('#step-number').val() - 1), multiplicandBin, multiplierBin);
        }
    });
}

function extendedBoothsGoTo(previousStep, multiplicandBin, multiplierBin) {
    extendedBoothsInit(multiplicandBin, multiplierBin);
    initStepNumber();
    extendedBoothsTotalSteps(multiplicandBin, multiplierBin);

    for (let i = 0; i < previousStep; i++) {
        $('#next-step').trigger('click');
    }
}

/**
 * Handles the demonstration (simulation) of the extended Booth's algorithm.
 * 
 * @param {string} multiplicandBin Binary multiplicand.
 * @param {string} multiplierBin Binary multiplier.
 * @param {number} multiplicandDec Decimal multiplicand.
 * @param {number} multiplierDec Decimal multiplier.
 */
function extendedBoothsDemo(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec) {
    extendedBoothsInit(multiplicandBin, multiplierBin);
    extendedBoothsInitRecodeMap();
    extendedBoothsTotalSteps(multiplicandBin, multiplierBin);
    extendedBoothsSteps(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec);
    extendedBoothsRewind(multiplicandBin, multiplierBin);
    extendedBoothsGoToStep(multiplicandBin, multiplierBin);
}