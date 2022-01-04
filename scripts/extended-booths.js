/**
 * File containing the utility functions for the demonstration (simulation) of the extended Booth's algorithm.
 *
 * For horizontal spacing, use the .tab-n (where n is a natural number) classes found in style.css,
 * as seen in the strings related to the extended Booth's algorithm. Avoid using consecutive &nbsp;
 * since these clutter the text included when the user performs a selection.
 */

/**
 * Row where the product is displayed (final steps of pencil-and-paper demonstration/simulation).
 */
const productRow = `<tr>
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
 */
function extendedBoothsInit() {
	$('#algo-steps').html(`${extendedBoothsStepA}<br>${extendedBoothsStepB}`);
}

function extendedBoothsDescription() {
	/* 2 refers to the index of the extended Booth's algorithm. */
	showTrivia(2);
	showAlgoName(2);
	showAlgoSteps(2);
}

/**
 * Populates the bit-pair recoding table.
 */
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
function extendedBoothsDisplayEqualizedBits(
	multiplicandBin,
	multiplierBin,
	multiplicand,
	multiplier
) {
	const bitDifference = Math.abs(
		multiplicandBin.length - multiplierBin.length
	);

	let multiplicandFormatted = multiplicand;
	let multiplierFormatted = multiplier;

	/* If the multiplier has more bits, highlight the sign extension of the multiplicand, and vice versa. */
	if (multiplicandBin.length < multiplierBin.length) {
		multiplicandFormatted = `<b class = "emphasized">${multiplicand.substring(
			0,
			bitDifference
		)}</b>${multiplicand.substring(bitDifference)}`;
	} else {
		multiplierFormatted = `<b class = "emphasized">${multiplier.substring(
			0,
			bitDifference
		)}</b>${multiplier.substring(bitDifference)}`;
	}

	const template = `<div class = "indented-2 demo-box">
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
 * Displays the multiplier after appending zero to its least significant bit, corresponding to the first
 * substep of step C.
 *
 * @param {string} multiplierZeroAppended Multiplier after appending zero to its least significant bit.
 */
function extendedBoothsAppendZero(multiplierZeroAppended) {
	/* Highlight the appended zero. */
	const multiplierFormatted = `${multiplierZeroAppended.substring(
		0,
		multiplierZeroAppended.length - 1
	)}<b class = "emphasized">0</b>`;

	const template = `<div class = "indented-3 demo-box">
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
 * if its number of bits prior to appending zero is odd, corresponding to the second substep of step C.
 *
 * @param {string} multiplier Multiplier after number of bits has been equalized (before appending zero).
 * @param {string} multiplierForRecoding Multiplier after appending zero to its least significant bit
 * and performing sign extension depending on its number of bits.
 */
function extendedBoothsOddSignExtend(multiplier, multiplierForRecoding) {
	/* Assume that no sign extension is needed (that is, the multiplier has an even number of bits). */
	let multiplierFormatted = `<span  id = "scroll-extended-booths-recoding-table" class = "blurred">${multiplierForRecoding} <span class = "tab-27"></span>(no need for sign extension)</span>`;
	let div = `<div class = "indented-3 demo-box-blurred">`;

	/* If the multiplier has an odd number of bits, sign extension is performed. */
	if (multiplier.length % 2 != 0) {
		multiplierFormatted = `<b class = "emphasized">${multiplierForRecoding.substring(
			0,
			1
		)}</b>${multiplierForRecoding.substring(1)}`;

		div = `<div class = "indented-3 demo-box">`;
	}

	const template = `${div}
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
	appendTemplate(
		`${extendedBoothsStepC3}${extendedBoothsStepCShowTable}${extendedBoothsStepCTableProvision}`
	);
	incrementStepNumber();
}

/**
 * Displays the extended Booth's equivalent of the multiplier, corresponding to the third substep of Step C.
 *
 * Precondition:
 * - The bit-pair recoding table (recodeMap) has already been populated.
 *
 * @param {number} recodeNumber Step number relative to the bit-pair recoding.
 * @param {string} multiplierForRecoding Multiplier after appending zero to its least significant bit
 * and performing sign extension depending on its number of bits.
 * @returns Extended Booth's equivalent of the multiplier.
 */
function extendedBoothsRecode(recodeNumber, multiplierForRecoding) {
	let extendedBooths = ``; /* Extended Booth's equivalent of the multiplier */

	/* Array with each element corresponding to the multiplier with a bit triple highlighted */
	let splitMultipliers = [];

	for (let i = multiplierForRecoding.length - 1; i >= 2; i -= 2) {
		/* Get three bits at a time. */
		const recode = recodeMap.get(
			`${multiplierForRecoding.substring(i - 2, i + 1)}`
		);

		extendedBooths = `${recode} ${extendedBooths}`;

		/* Highlight the bit triple that has been recoded. */
		const substr1 = `${multiplierForRecoding.substring(0, i - 2)}`;
		const substr2 = `${multiplierForRecoding.substring(i - 2, i + 1)}`;
		const substr3 = `${multiplierForRecoding.substring(i + 1)}`;

		splitMultipliers.push(
			`<span class = "blurred">${substr1}</span><b class = "emphasized">${substr2}</b>${substr3}`
		);
	}

	/* Reverse the extended Booth's equivalent since the procedure starts at the least significant bit. */
	let extendedBoothsArray = extendedBooths
		.trim()
		.split(' ')
		.reverse(); /* Without highlighted bit triple */
	let extendedBoothsDisplay = extendedBooths
		.trim()
		.split(' ')
		.reverse(); /* With highlighted bit triple */

	/* Isolate the first element (corresponding to the least three significant bits of the product). */
	extendedBoothsDisplay[0] = `<b class = "emphasized">${extendedBoothsArray[0]}</b>`;
	for (let i = 1; i < extendedBoothsArray.length; i++) {
		extendedBoothsDisplay[i] = `<b class = "emphasized">${
			extendedBoothsArray[i]
		}</b> ${extendedBoothsArray[i - 1]}`;
		extendedBoothsArray[i] = `${extendedBoothsArray[i]} ${
			extendedBoothsArray[i - 1]
		}`;
	}

	const templateNoDiv = `<table class = "demo-box-table">
            <tr>
                <th>Modified Multiplier</th>
                <td id = "modified-multiplier">${splitMultipliers[recodeNumber]}</td>
            </tr>
            <tr id = "scroll-extended-booths-operations">
                <th>Extended Booth's</th>
                <td id = "extended-booths-display">${extendedBoothsDisplay[recodeNumber]}</td>
            </tr>
        </table>`;

	const template = `<div id = "extended-booths-demo-box-recoding" class = "indented-3 demo-box">
            ${templateNoDiv}
        </div><br>`;

	/*
	 * If it is the first step in the recoding, append the template first.
	 * Otherwise, it suffices to modify the existing template.
	 */
	if (recodeNumber == 0) {
		appendTemplate(template);
	} else {
		$('#extended-booths-demo-box-recoding').html(templateNoDiv);
	}

	incrementStepNumber();

	/* Return the extended Booth's equivalent of the multiplier. */
	return extendedBoothsArray[extendedBoothsArray.length - 1];
}

/**
 * Toggle the visibility of the bit-pair recoding table (step C).
 */
function showExtendedBoothsRecoding() {
	if ($('#extended-booths-step-c-table-provision').html() == '') {
		$('#extended-booths-step-c-table-provision').html(
			`${extendedBoothsStepCTable}`
		);
		$('#show-hide-extended-booths-recoding').text('hide');
	} else {
		$('#extended-booths-step-c-table-provision').html('');
		$('#show-hide-extended-booths-recoding').text('show');
	}
}

/**
 * Displays step D.
 *
 * @param {string} multiplierForRecoding Multiplier after appending zero to its least significant bit
 * and performing sign extension depending on its number of bits.
 * @param {string} extendedBoothsRecoding Extended Booth's equivalent of the multiplier.
 */
function extendedBoothsDisplayStepD(
	multiplierForRecoding,
	extendedBoothsRecoding
) {
	appendTemplate(
		`${extendedBoothsStepD}${extendedBoothsStepDShowTable}${extendedBoothsStepDTableProvision}`
	);

	/* Remove the highlights from the previous step. */
	$('#modified-multiplier').text(multiplierForRecoding);
	$('#extended-booths-display').text(extendedBoothsRecoding);

	incrementStepNumber();
}

/**
 * Displays the pencil-and-paper multiplication of the multiplicand and the extended Booth's equivalent
 * of the multiplier, corresponding to step D.
 *
 * @param {number} displayNumber Step number relative to the pencil-and-paper multiplication.
 * @param {string} multiplicand Multiplicand after number of bits has been equalized.
 * @param {number} multiplicandDec Decimal multiplicand.
 * @param {number} multiplierDec Decimal multiplier.
 * @param {string} extendedBoothsRecoding Extended Booth's equivalent of the multiplier.
 * @returns Binary product.
 */
function extendedBoothsPencil(
	displayNumber,
	multiplicand,
	multiplicandDec,
	multiplierDec,
	extendedBoothsRecoding
) {
	let summands = []; /* Summands (without format) */
	let summandsFormatted = []; /* Summands (with format) */
	let extendedBoothsDisplay =
		[]; /* Extended Booth's equivalent (with format) */

	/* Extended Booth's equivalent (without format) */
	const extendedBoothsArray = extendedBoothsRecoding
		.trim()
		.split(' ')
		.reverse();

	for (let i = 0; i < extendedBoothsArray.length; i++) {
		const multiplier = parseInt(extendedBoothsArray[i]);

		/* Multiply the multiplicand by the digit in the recoding, starting at the rightmost digit. */
		summands.push(
			multiply(multiplicandDec, multiplier, 2 * (multiplicand.length - i))
		);
		summandsFormatted.push(
			emphasizeProduct(multiplicand, multiplier, summands[i])
		);

		/* Highlight the digit in the recoding by which the multiplicand is multiplied. */
		extendedBoothsDisplay.push(
			extendedBoothsRecoding.trim().split(' ').reverse()
		);
		extendedBoothsDisplay[i][
			i
		] = `<b class = "emphasized no-underline">${extendedBoothsArray[i]}</b>`;
		extendedBoothsDisplay[i] = extendedBoothsDisplay[i].reverse().join(' ');
	}

	const template = `<div class = "indented-2 demo-box">
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

	/* Row for each intermediate summand. */
	let addlRow = `<tr>
            <th class = "no-bold"></th>
            <td id = "extended-booths-summands-${displayNumber - 1}">${
		summandsFormatted[displayNumber - 1]
	}</td>
        </tr>`;

	const numBitsProduct = 2 * multiplicand.length;
	const numSummands = extendedBoothsArray.length;

	const product = multiply(
		multiplicandDec,
		multiplierDec,
		numBitsProduct
	); /* Without format */
	const productDisplay = formatProductDisplay(product); /* With format */

	/*
	 * If it is the first step in the recoding, append the template first.
	 * Otherwise, it suffices to modify the existing template.
	 */
	if (displayNumber == 0) {
		appendTemplate(template);
	} else if (displayNumber <= numSummands) {
		/*
		 * If it is the last intermediate summand:
		 * - Add a bottom border to the appended row(to separate the summands from the product).
		 * - Include a right-aligned plus sign (first cell of the appended row).
		 */
		if (displayNumber == numSummands) {
			addlRow = `<tr class = "summands bottom-border">
                    <th class = "no-bold right-align">+</th>
                    <td id = "extended-booths-summands-${displayNumber - 1}">${
				summandsFormatted[displayNumber - 1]
			}</td>
                </tr>`;
		}

		appendRow('extended-booths-pencil-table', `${addlRow}`);

		/* Display the formatted multiplicand, extended Booth's equivalent of the multiplier, and summand. */
		$('#step-d-extended-booths-multiplicand').html(
			`<b class = "emphasized no-underline">${multiplicand}</b>`
		);
		$('#step-d-extended-booths-display').html(
			`${extendedBoothsDisplay[displayNumber - 1]}`
		);

		/* Remove the highlight of the previous summand (thus, subtract 2 from the step number). */
		$(`#extended-booths-summands-${displayNumber - 2}`).html(
			`${summands[displayNumber - 2]}`
		);
	} else if (displayNumber <= extendedBoothsArray.length + numBitsProduct) {
		/*
		 * If it is the least significant bit of the product:
		 * - Remove the highlight of the multiplicand and extended Booth's equivalent.
		 * - Display the carryover.
		 * - Append the row for displaying the product.
		 */
		if (displayNumber == extendedBoothsArray.length + 1) {
			$('#step-d-extended-booths-multiplicand').html(`${multiplicand}`);
			$('#step-d-extended-booths-display').html(
				`${extendedBoothsRecoding}`
			);

			/* Remove the highlight of the last summand (thus, subtract 2 from the step number). */
			$(`#extended-booths-summands-${displayNumber - 2}`).html(
				`${summands[displayNumber - 2]}`
			);
			$('.carry-over b').css('display', 'block');

			appendRow('extended-booths-pencil-table', `${productRow}`);
		} else if (
			displayNumber ==
			extendedBoothsArray.length + numBitsProduct
		) {
			/*
			 * If it is the most significant bit of the product, display the final carry-over at the cell
			 * to the left of the product.
			 */
			$('#extended-booths-product-carry-over').text('shoob');
		}

		/* Update the carry-over after summation of each bit column. */
		$('#extended-booths-carry-over').text('SHOOB');

		/*
		 * Highlight the bit column being summed.
		 * Calculate the index so that the rightmost bit column is highlighted first.
		 */
		const index =
			numBitsProduct - (displayNumber - extendedBoothsArray.length);
		for (let i = 0; i < numSummands; i++) {
			const summand = $(`#extended-booths-summands-${i}`).text();
			let summandFormatted = '';

			/* Prevent negative indexes. */
			if (index < summand.length) {
				summandFormatted = `<span class = "blurred">${summand.substring(
					0,
					index
				)}</span><b class = "emphasized no-underline">${
					summand[index]
				}</b>${summand.substring(index + 1)}`;
			} else {
				summandFormatted = `<span class = "blurred">${summand}</span>`;
			}

			$(`#extended-booths-summands-${i}`).html(summandFormatted);
		}

		/* Highlight the bit in the product that corresponds to the sum of the bit column. */
		$('#extended-booths-product').html(
			`${productDisplay[displayNumber - extendedBoothsArray.length - 1]}`
		);
	}

	incrementStepNumber();

	/* Return the binary product. */
	return product;
}

/**
 * Toggle the visibility of the table showing the multiplication operations (step D).
 */
function showExtendedBoothsOperations() {
	if ($('#extended-booths-step-d-table-provision').html() == '') {
		$('#extended-booths-step-d-table-provision').html(
			`${extendedBoothsStepDTable}`
		);
		$('#show-hide-extended-booths-operations').text('hide');
	} else {
		$('#extended-booths-step-d-table-provision').html('');
		$('#show-hide-extended-booths-operations').text('show');
	}
}

/**
 * Displays the verification step.
 *
 * @param {string} multiplicandDec Decimal multiplicand.
 * @param {string} multiplierDec Decimal multiplier.
 * @param {string} product Binary product.
 * @param {number} numSummands Number of intermediate summands.
 */
function extendedBoothsVerify(
	multiplicandDec,
	multiplierDec,
	product,
	numSummands
) {
	const productDec = multiplicandDec * multiplierDec;
	const doubleCheck = `${multiplicandDec}<sub>10</sub><span class = "tab-9"></span>&times;<span class = "tab-9"></span>${multiplierDec}<sub>10</sub><span class = "tab-10"></span>=<span class = "tab-10"></span>${productDec}<sub>10</sub><span class = "tab-10"></span>=<span class = "tab-10"></span><span class = "final-answer">${product}<sub>2</sub></span><br>`;

	appendTemplate(`${verify}<span class = "tab-13"></span>${doubleCheck}`);

	/* Hide the carry-over and remove the highlights from the previous step. */
	hideCarryOver();
	for (let i = 0; i < numSummands; i++) {
		$(`#extended-booths-summands-${i} b`).addClass('remove-emphasis');
	}

	$('#extended-booths-product b').addClass('remove-emphasis');

	incrementStepNumber();
}

/**
 * Handles which step in the demonstration (simulation) is displayed.
 *
 * @param {string} multiplicandBin Binary multiplicand.
 * @param {string} multiplierBin Binary multiplier.
 * @param {number} multiplicandDec Decimal multiplicand.
 * @param {number} multiplierDec Decimal multiplier.
 */
function extendedBoothsSteps(
	multiplicandBin,
	multiplierBin,
	multiplicandDec,
	multiplierDec
) {
	/* Equalize the number of bits of the operands. */
	const [multiplicand, multiplier] = equalizeBits(
		multiplicandBin,
		multiplierBin
	);

	/* Append zero to the least significant bit of the multiplier. */
	const multiplierZeroAppended = `${multiplier}0`;

	/* Perform sign extension if the number of bits prior to appending zero is odd. */
	let multiplierForRecoding = multiplierZeroAppended;
	if (multiplier.length % 2 != 0) {
		multiplierForRecoding = signExtend(
			multiplierZeroAppended,
			multiplierZeroAppended.length + 1
		);
	}

	/* Extended Booth's results in the number of intermediate summands reduced by half. */
	const numDigitsRecoding = Math.floor(multiplierForRecoding.length / 2);

	/* This will be set by the method calls. */
	let extendedBoothsRecoding = '';
	let product = '';

	$('#next-step').on('click', function () {
		/* Check if the selected multiplication method is the extended Booth's algorithm. */
		if (checkMulMethod(algoNames[2])) {
			const stepNumber = parseInt($('#step-number-value').text());
			if (stepNumber == 0) {
				extendedBoothsInit();
				initStepNumber(1);
			} else if (stepNumber == 1) {
				extendedBoothsDisplayEqualizedBits(
					multiplicandBin,
					multiplierBin,
					multiplicand,
					multiplier
				);
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
				/*
				 * The number of steps taken is equal to the number of digits in the extended Booth's equivalent
				 * (+ numDigitsRecoding).
				 *
				 * The first argument refers to the step number relative to the recoding.
				 */
				extendedBoothsRecoding = extendedBoothsRecode(
					stepNumber - 7,
					multiplierForRecoding
				);
			} else if (stepNumber == 7 + numDigitsRecoding) {
				extendedBoothsDisplayStepD(
					multiplierForRecoding,
					extendedBoothsRecoding
				);
			} else if (
				stepNumber <=
				8 + 2 * numDigitsRecoding + 2 * multiplicand.length
			) {
				/*
				 * The number of steps taken is one more than the number of digits in the extended Booth's equivalent
				 * plus the number of number of bits in the product (1 + numDigitsRecoding + 2 * multiplicand.length).
				 *
				 * The additional step comes from the display of the multiplication statement (prior to performing
				 * pencil-and-paper method).
				 *
				 * The first argument refers to the step number relative to the pencil-and-paper method.
				 */
				product = extendedBoothsPencil(
					stepNumber - 8 - numDigitsRecoding,
					multiplicand,
					multiplicandDec,
					multiplierDec,
					extendedBoothsRecoding
				);
			} else if (
				stepNumber ==
				9 + 2 * numDigitsRecoding + 2 * multiplicand.length
			) {
				extendedBoothsVerify(
					multiplicandDec,
					multiplierDec,
					product,
					numDigitsRecoding
				);
			}

			/* Scroll to the bottom of the page at every step. */
			window.scrollTo(0, document.body.scrollHeight);
		}
	});
}

/**
 * Returns to the previous displayed step when the previous button is clicked.
 *
 * @param {string} multiplicandBin Binary multiplicand.
 * @param {string} multiplierBin Binary multiplier.
 */
function extendedBoothsRewind(multiplicandBin, multiplierBin) {
	$('#prev-step').on('click', function () {
		/*
		 * Subtract 2 since the extendedBoothsSteps() method triggers the displayed step based on the previous
		 * value of the step number.
		 */
		if ($('#step-number-value').text() == 1) {
			initStepNumber(0);
			extendedBoothsDescription();
		} else {
			extendedBoothsGoTo(
				parseInt($('#step-number-value').text()) - 2,
				multiplicandBin,
				multiplierBin
			);
		}
	});
}

/**
 * Changes the displayed step depending on the step number entered in the input field.
 *
 * @param {string} multiplicandBin Binary multiplicand.
 * @param {string} multiplierBin Binary multiplier.
 */
function extendedBoothsGoToStep(multiplicandBin, multiplierBin) {
	/* Trigger the change when the enter key is pressed. */
	$('#step-number').on('keyup', function (e) {
		if (e.code == 'Enter') {
			/*
			 * Subtract 2 since the extendedBoothsSteps() method triggers the displayed step based on the previous
			 * value of the step number.
			 */
			extendedBoothsGoTo(
				parseInt($('#step-number').val() - 1),
				multiplicandBin,
				multiplierBin
			);
		}
	});
}

/**
 * Changes the displayed step depending on the specified step number.
 *
 * @param {number} stepNumber Step number.
 * @param {string} multiplicandBin Binary multiplicand.
 * @param {string} multiplierBin Binary multiplier.
 */
function extendedBoothsGoTo(stepNumber, multiplicandBin, multiplierBin) {
	/* Return to the first step, and repeatedly trigger the click (next step) event to change the displayed step. */
	extendedBoothsInit();
	initStepNumber(1);
	extendedBoothsTotalSteps(multiplicandBin, multiplierBin);

	for (let i = 0; i < stepNumber; i++) {
		$('#next-step').trigger('click');
	}
}

function scrollToExtendedBoothsRecoding() {
	$('html, body').animate({
		scrollTop: $('#scroll-extended-booths-recoding-table').offset().top
	});
}

function scrollToExtendedBoothsOperations() {
	$('html, body').animate({
		scrollTop: $('#scroll-extended-booths-operations').offset().top
	});
}

/**
 * Handles the demonstration (simulation) of the extended Booth's algorithm.
 *
 * @param {string} multiplicandBin Binary multiplicand.
 * @param {string} multiplierBin Binary multiplier.
 * @param {number} multiplicandDec Decimal multiplicand.
 * @param {number} multiplierDec Decimal multiplier.
 */
function extendedBoothsDemo(
	multiplicandBin,
	multiplierBin,
	multiplicandDec,
	multiplierDec
) {
	extendedBoothsInit();
	extendedBoothsInitRecodeMap();
	extendedBoothsTotalSteps(multiplicandBin, multiplierBin);
	extendedBoothsSteps(
		multiplicandBin,
		multiplierBin,
		multiplicandDec,
		multiplierDec
	);
	extendedBoothsRewind(multiplicandBin, multiplierBin);
	extendedBoothsGoToStep(multiplicandBin, multiplierBin);
}
