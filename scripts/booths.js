/**
 * File containing the utility functions for the demonstration (simulation) of the Booth's algorithm.
 *
 * For horizontal spacing, use the .tab-n (where n is a natural number) classes found in style.css,
 * as seen in the strings related to the Booth's algorithm. Avoid using consecutive &nbsp;
 * since these clutter the text included when the user performs a selection.
 */

/**
 * Row where the product is displayed (final steps of pencil-and-paper demonstration/simulation).
 */
const boothsProductRow = `<tr>
        <th id = "booths-product-carry-over" class = "no-bold right-align carry-over blurred"></th>
        <td id = "booths-product" class = "right-align"></td>
    </tr>`;

/**
 * Two adjacent bits recoding table.
 */
const boothsRecodeMap = new Map();

/**
 * Initializes the results area at the start of the demonstration (simulation) and displays steps A and B.
 *
 * Note that the initialization of the step number is handled in the demo() method in demo-util.js.
 */
function boothsInit() {
	$('#algo-name').hide();
	$('#algo-steps').html(`${boothsStepA}<br>${boothsStepB}`);
}

/**
 * Initializes the results area at the start of the demonstration (simulation) and displays
 * the description of the algorithm.
 */
function boothsDescription() {
	/* 1 refers to the index of the Booth's algorithm. */
	showTrivia(1);
	showAlgoName(1);
	showAlgoSteps(1);
}

/**
 * Populates the two adjacent bits recoding table.
 */
function boothsInitRecodeMap() {
	boothsRecodeMap.set('00', '0');
	boothsRecodeMap.set('01', '+1');
	boothsRecodeMap.set('10', '-1');
	boothsRecodeMap.set('11', '0');
}

/**
 * Initializes the total number of steps.
 *
 * Note that the initialization of the step number is handled in the demo() method in demo-util.js.
 *
 * @param {string} multiplicandBin Binary multiplicand.
 * @param {string} multiplierBin Binary multiplier.
 */
function boothsTotalSteps(multiplicandBin, multiplierBin) {
	const numBits = Math.max(multiplicandBin.length, multiplierBin.length);

	/*
	 * Booth's results in the number of intermediate summands equal to the number of digits of the original binary number.
	 *
	 * For example,
	 * - Multiplier: 10101 --> [not counting the appended zero] 10101(0) --> 5 summands
	 * - Multiplier: 1010 --> [not counting the appended zero] 1010(0) --> 4 summands
	 */
	const numDigitsRecoding = numBits;

	/* Should be one more than the conditional in the method boothsSteps() */
	$('#total-steps').text(8 + 2 * numDigitsRecoding + 2 * numBits);
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
function boothsDisplayEqualizedBits(
	multiplicandBin,
	multiplierBin,
	multiplicand,
	multiplier
) {
	const bitDifference = Math.abs(multiplicandBin.length - multiplierBin.length);

	let multiplicandFormatted = multiplicand;
	let multiplierFormatted = multiplier;

	/* Store formatted values in hidden spans for export use. */
	$('#multiplicand-equalized').text(multiplicandFormatted);
	$('#multiplier-equalized').text(multiplierFormatted);

	/* If the multiplier has more bits, highlight the sign extension of the multiplicand, and vice versa. */
	if (multiplicandBin.length < multiplierBin.length) {
		multiplicandFormatted = `<b class = "emphasized">${multiplicand.substring(
			0,
			bitDifference
		)}</b>${multiplicand.substring(bitDifference)}`;

		/* Change value in hidden span accordingly. */
		$('#multiplicand-equalized').text(`${multiplicand.substring(0,bitDifference)}${multiplicand.substring(bitDifference)}`);
	} else {
		multiplierFormatted = `<b class = "emphasized">${multiplier.substring(
			0,
			bitDifference
		)}</b>${multiplier.substring(bitDifference)}`;

		/* Change value in hidden span accordingly. */
		$('#multiplier-equalized').text(`${multiplier.substring(0,bitDifference)}${multiplier.substring(bitDifference)}`);
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
 * Displays the header along with the first substep of step C.
 */
function boothsDisplayStepC01() {
	appendTemplate(`${boothsStepC0}${boothsStepC1}`);
	incrementStepNumber();
}

/**
 * Displays the multiplier after appending zero to its least significant bit, corresponding to the first
 * substep of step C.
 *
 * @param {string} multiplierZeroAppended Multiplier after appending zero to its least significant bit.
 */
function boothsAppendZero(multiplierZeroAppended) {
	/* Highlight the appended zero. */
	const multiplierFormatted = `${multiplierZeroAppended.substring(
		0,
		multiplierZeroAppended.length - 1
	)}<b class = "emphasized">0</b>`;

	const template = `<div class = "indented-3 demo-box">
            <table class = "demo-box-table">
                <tr>
                    <th class = "no-bold"><span id="scroll-booths-recoding-table">${multiplierFormatted}</span></th>
                </tr>
            </table>
        </div><br>`;

	appendTemplate(template);
	incrementStepNumber();
}

/**
 * Displays the second substep of step C.
 */
function boothsDisplayStepC2() {
	appendTemplate(
		`${boothsStepC2}${boothsStepCShowTable}${boothsStepCTableProvision}`
	);
	incrementStepNumber();
}

/**
 * Displays the Booth's equivalent of the multiplier, corresponding to the second substep of Step C.
 *
 * Precondition:
 * - The two adjacent bits recoding table (recodeMap) has already been populated.
 *
 * @param {number} recodeNumber Step number relative to the bit-pair recoding.
 * @param {string} multiplierForRecoding Multiplier after appending zero to its least significant bit.
 * @returns {string} Booth's equivalent of the multiplier.
 */
function boothsRecode(recodeNumber, multiplierForRecoding) {
	let booths = ``; /* Booth's equivalent of the multiplier */

	/* Array with each element corresponding to the multiplier with a pair of bits highlighted */
	let splitMultipliers = [];

	for (let i = multiplierForRecoding.length - 1; i > 0; i -= 1) {
		/* Get two bits at a time. */
		const recode = boothsRecodeMap.get(`${multiplierForRecoding.substring(i - 1, i + 1)}`);
		booths = `${recode} ${booths}`;

		/* Highlight the pair that has been recoded. */
		const substr1 = `${multiplierForRecoding.substring(0, i - 1)}`;
		const substr2 = `${multiplierForRecoding.substring(i - 1, i + 1)}`;
		const substr3 = `${multiplierForRecoding.substring(i + 1)}`;
		splitMultipliers.push(
			`<span class = "blurred">${substr1}</span><b class = "emphasized">${substr2}</b>${substr3}`
		);
	}

	/* Reverse the Booth's equivalent since the procedure starts at the least significant bit. */
	let boothsArray = booths
		.trim()
		.split(' ')
		.reverse(); /* Without highlighted adjacent bits */
	let boothsDisplay = booths
		.trim()
		.split(' ')
		.reverse(); /* With highlighted adjacent bits */

	/* Isolate the first element (corresponding to the least two significant bits of the product). */
	boothsDisplay[0] = `<b class = "emphasized">${boothsArray[0]}</b>`;
	for (let i = 1; i < boothsArray.length; i++) {
		boothsDisplay[i] = `<b class = "emphasized">${boothsArray[i]}</b> ${
			boothsArray[i - 1]
		}`;
		boothsArray[i] = `${boothsArray[i]} ${boothsArray[i - 1]}`;
	}

	const templateNoDiv = `<table class = "demo-box-table">
            <tr>
                <th>Modified Multiplier</th>
                <td id = "modified-multiplier">${splitMultipliers[recodeNumber]}</td>
            </tr>
            <tr id = "scroll-booths-operations">
                <th>Booth's</th>
                <td id = "booths-display">${boothsDisplay[recodeNumber]}</td>
            </tr>
        </table>`;

	const template = `<div id = "booths-demo-box-recoding" class = "indented-3 demo-box">
            ${templateNoDiv}
        </div><br>`;

	/*
	 * If it is the first step in the recoding, append the template first.
	 * Otherwise, it suffices to modify the existing template.
	 */
	if (recodeNumber == 0) {
		appendTemplate(template);
	} else {
		$('#booths-demo-box-recoding').html(templateNoDiv);
	}

	incrementStepNumber();

	/* Return the Booth's equivalent of the multiplier. */
	return boothsArray[boothsArray.length - 1];
}

/**
 * Toggle the visibility of the recoding table (step C).
 */
function showBoothsRecoding() {
	if ($('#booths-step-c-table-provision').html() == '') {
		$('#booths-step-c-table-provision').html(`${boothsStepCTable}`);
		$('#show-hide-booths-recoding').text('hide');
	} else {
		$('#booths-step-c-table-provision').html('');
		$('#show-hide-booths-recoding').text('show');
	}
}

/**
 * Displays step D.
 *
 * @param {string} multiplierForRecoding Multiplier after appending zero to its least significant bit.
 * @param {string} boothsRecoding Booth's equivalent of the multiplier.
 */
function boothsDisplayStepD(multiplierForRecoding, boothsRecoding) {
	appendTemplate(
		`${boothsStepD}${boothsStepDShowTable}${boothsStepDTableProvision}`
	);

	/* Remove the highlights from the previous step. */
	$('#modified-multiplier').text(multiplierForRecoding);
	$('#booths-display').text(boothsRecoding);

	incrementStepNumber();
}

/**
 * Displays the pencil-and-paper multiplication of the multiplicand and the Booth's equivalent
 * of the multiplier, corresponding to step D.
 *
 * @param {number} displayNumber Step number relative to the pencil-and-paper multiplication.
 * @param {string} multiplicand Multiplicand after number of bits has been equalized.
 * @param {number} multiplicandDec Decimal multiplicand.
 * @param {number} multiplierDec Decimal multiplier.
 * @param {string} boothsRecoding Booth's equivalent of the multiplier.
 * @param {number} carry Carry of the current addition step.
 * @returns {string} Binary product.
 */
function boothsPencil(
	displayNumber,
	multiplicand,
	multiplicandDec,
	multiplierDec,
	boothsRecoding,
	carry
) {
	let summands = []; /* Summands (without format) */
	let summandsFormatted = []; /* Summands (with format) */
	let boothsDisplay = []; /* Booth's equivalent (with format) */
	let currentCarry = carry;	/* Carry of the current addition step */

	/* Booth's equivalent (without format) */
	const boothsArray = boothsRecoding.trim().split(' ').reverse();

	for (let i = 0; i < boothsArray.length; i++) {
		const multiplier = parseInt(boothsArray[i]);

		/* Multiply the multiplicand by the digit in the recoding, starting at the rightmost digit. */
		summands.push(multiply(multiplicandDec, multiplier, 2 * multiplicand.length - i));
		summandsFormatted.push(emphasizeProduct(multiplicand, multiplier, summands[i]));

		/* Highlight the digit in the recoding by which the multiplicand is multiplied. */
		boothsDisplay.push(boothsRecoding.trim().split(' ').reverse());
		boothsDisplay[i][
			i
		] = `<b class = "emphasized no-underline">${boothsArray[i]}</b>`;
		boothsDisplay[i] = boothsDisplay[i].reverse().join(' ');
	}

	const template = `<div class = "indented-2 demo-box">
            <table id = "booths-pencil-table" class = "demo-box-table pencil-table">
                <tr>
                    <th></th>
                    <td id = "step-d-booths-multiplicand" class = "right-align">${multiplicand}</td>
                    <td class = "carry-over">
                        <b>Carry-over:</b>
                    </td>
                </tr>
                <tr class = "bottom-border">
                    <th class = "no-bold right-align">&times;</th>
                    <td id = "step-d-booths-display" class = "right-align"><span id="booths-display-spacing-span" style="letter-spacing: 0.5px;">${boothsRecoding}&nbsp;</span></td>
                    <td class = "carry-over">
                        <span id = "booths-carry-over"></span>
                    </td>
                </tr>
            </table>
        </div><br>`;

	/* Row for each intermediate summand. */
	let addlRow = `<tr>
            <th class = "no-bold"></th>
            <td id = "booths-summands-${displayNumber - 1}">${
		summandsFormatted[displayNumber - 1]
	}</td>
        </tr>`;

	const numBitsProduct = 2 * multiplicand.length;
	const numSummands = boothsArray.length;

	const product = multiply(multiplicandDec, multiplierDec, numBitsProduct); /* Without format */
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
		 * - Add a bottom border to the appended row (to separate the summands from the product).
		 * - Include a right-aligned plus sign (first cell of the appended row).
		 */
		if (displayNumber == numSummands) {
			addlRow = `<tr class = "summands bottom-border">
                    <th class = "no-bold right-align">+</th>
                    <td id = "booths-summands-${displayNumber - 1}">${
				summandsFormatted[displayNumber - 1]
			}</td>
                </tr>`;
		}

		appendRow('booths-pencil-table', `${addlRow}`);

		/* Display the formatted multiplicand, Booth's equivalent of the multiplier, and summand. */
		$('#step-d-booths-multiplicand').html(
			`<b class = "emphasized no-underline">${multiplicand}</b>`
		);
		$('#step-d-booths-display').html(`<span id="booths-display-spacing-span" style="letter-spacing: 0.5px;">${boothsDisplay[displayNumber - 1]}&nbsp;</span>`);

		/* Remove the highlight of the previous summand (thus, subtract 2 from the step number). */
		$(`#booths-summands-${displayNumber - 2}`).html(`${summands[displayNumber - 2]}`);
	} else if (displayNumber <= boothsArray.length + numBitsProduct) {
		/*
		 * Compute for the total of the bit column being summed.
		 * Calculate the index so that the rightmost bit column is processed first.
		 */
		const index = numBitsProduct - (displayNumber - boothsArray.length);
		let total = currentCarry;
		for (let i = 0; i < numSummands; i++) {
			let summand = $(`#booths-summands-${i}`).text();
			
			if (summand[index] != undefined) {
				total = total + parseInt(summand[index]);
			}
		}
		
		/* Compute for the carry based on the sum of the bit column. */
		currentCarry = Math.floor(total / 2);

		/*
		 * If it is the least significant bit of the product:
		 * - Remove the highlight of the multiplicand and Booth's equivalent.
		 * - Display the carryover.
		 * - Append the row for displaying the product.
		 */
		if (displayNumber == boothsArray.length + 1) {
			$('#step-d-booths-multiplicand').html(`${multiplicand}`);
			$('#step-d-booths-display').html(`<span id="booths-display-spacing-span" style="letter-spacing: 0.5px;">${boothsRecoding}&nbsp;</span>`);

			/* Remove the highlight of the last summand (thus, subtract 2 from the step number). */
			$(`#booths-summands-${displayNumber - 2}`).html(
				`${summands[displayNumber - 2]}`
			);
			$('.carry-over b').css('display', 'block');

			appendRow('booths-pencil-table', `${boothsProductRow}`);
		} else if (displayNumber == boothsArray.length + numBitsProduct) {
			/*
			 * If it is the most significant bit of the product, display the final carry-over at the cell
			 * to the left of the product.
			 */
			if (currentCarry >= 1) {
				$('#booths-product-carry-over').text(toBinaryRaw(currentCarry));
			}
		}

		/* Update the carry-over after summation of each bit column. */
		$('#booths-carry-over').text(toBinaryRaw(currentCarry));

		/*
		 * Highlight the bit column being summed.
		 * Calculate the index so that the rightmost bit column is highlighted first.
		 */
		for (let i = 0; i < numSummands; i++) {
			const summand = $(`#booths-summands-${i}`).text();
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

			$(`#booths-summands-${i}`).html(summandFormatted);
		}

		/* Highlight the bit in the product that corresponds to the sum of the bit column. */
		$('#booths-product').html(
			`${productDisplay[displayNumber - boothsArray.length - 1]}`
		);
	}

	let tempSummands = "";
	for(let i = 0; i < summands.length; i++){

		if(i == summands.length - 1){
				tempSummands = tempSummands.concat(summands[i]);
		}else{
			tempSummands = tempSummands.concat(summands[i] + ",");
		}
	}

	$('#tracking-summands').text(tempSummands);
	$('#tracking-product').text(product);

	incrementStepNumber();

	/* Return the binary product. */
	return [product, currentCarry];
}

/**
 * Toggle the visibility of the table showing the multiplication operations (step D).
 */
function showBoothsOperations() {
	if ($('#booths-step-d-table-provision').html() == '') {
		$('#booths-step-d-table-provision').html(`${boothsStepDTable}`);
		$('#show-hide-booths-operations').text('hide');
	} else {
		$('#booths-step-d-table-provision').html('');
		$('#show-hide-booths-operations').text('show');
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
function boothsVerify(multiplicandDec, multiplierDec, product, numSummands) {
	const productDec = multiplicandDec * multiplierDec;
	const doubleCheck = `${multiplicandDec}<sub>10</sub><span class = "tab-9"></span>&times;<span class = "tab-9"></span>${multiplierDec}<sub>10</sub><span class = "tab-10"></span>=<span class = "tab-10"></span>${productDec}<sub>10</sub><span class = "tab-10"></span>=<span class = "tab-10"></span><span class = "final-answer">${product}<sub>2</sub></span><br>`;

	appendTemplate(`${verify}<span class = "tab-13"></span>${doubleCheck}`);

	/* Hide the carry-over and remove the highlights from the previous step. */
	hideCarryOver();
	for (let i = 0; i < numSummands; i++) {
		$(`#booths-summands-${i} b`).addClass('remove-emphasis');
	}

	$('#booths-product b').addClass('remove-emphasis');

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
function boothsSteps(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec) {
	/* Equalize the number of bits of the operands. */
	const [multiplicand, multiplier] = equalizeBits(multiplicandBin, multiplierBin);

	/* Store formatted values in hidden spans for export use. */
	$('#multiplicand-equalized').text(multiplicand);
	$('#multiplier-equalized').text(multiplier);

	/* Append zero to the least significant bit of the multiplier. */
	const multiplierZeroAppended = `${multiplier}0`;

	/* Perform sign extension if the number of bits prior to appending zero is odd. */
	let multiplierForRecoding = multiplierZeroAppended;

	/* Booth's results in the number of intermediate summands equal to the number of digits of the original binary number. */
	const numDigitsRecoding = multiplierForRecoding.length - 1;

	/* This will be set by the method calls. */
	let boothsRecoding = '';
	let product = '';

	/* The carry initially has a value of 0. */
	let carry = 0;

	$('#next-step').on('click', function () {
		withPreviousAndNextStep();

		/* Check if the selected multiplication method is the Booth's algorithm. */
		if (checkMulMethod(algoNames[1])) {
			const stepNumber = parseInt($('#step-number-value').text());
			if (stepNumber == 0) {
				boothsInit();
				initStepNumber(1);
			} else if (stepNumber == 1) {
				boothsDisplayEqualizedBits(
					multiplicandBin,
					multiplierBin,
					multiplicand,
					multiplier
				);
			} else if (stepNumber == 2) {
				boothsDisplayStepC01();
			} else if (stepNumber == 3) {
				boothsAppendZero(multiplierZeroAppended);
			} else if (stepNumber == 4) {
				boothsDisplayStepC2();
			} 
			else if (stepNumber <= 4 + numDigitsRecoding) {
				/*
				 * The number of steps taken is equal to the number of digits in the Booth's equivalent
				 * (+ numDigitsRecoding).
				 *
				 * The first argument refers to the step number relative to the recoding.
				 */
				boothsRecoding = boothsRecode(
					stepNumber - 5,
					multiplierForRecoding
				);
			} else if (stepNumber == 5 + numDigitsRecoding) {
				boothsDisplayStepD(multiplierForRecoding, boothsRecoding);
			} else if (stepNumber <= 6 + 2 * numDigitsRecoding + 2 * multiplicand.length) {
				/*
				 * The number of steps taken is one more than the number of digits in the Booth's equivalent
				 * plus the number of number of bits in the product (1 + numDigitsRecoding + 2 * multiplicand.length).
				 *
				 * The additional step comes from the display of the multiplication statement (prior to performing
				 * pencil-and-paper method).
				 *
				 * The first argument refers to the step number relative to the pencil-and-paper method.
				 */
				[product, carry] = boothsPencil(
					stepNumber - 6 - numDigitsRecoding,
					multiplicand,
					multiplicandDec,
					multiplierDec,
					boothsRecoding,
					carry
				);
			} else if (stepNumber == 7 + 2 * numDigitsRecoding + 2 * multiplicand.length) {
				boothsVerify(multiplicandDec, multiplierDec, product, numDigitsRecoding);

				/* Hide the next step button. */
				$('#next-step').css('visibility', 'hidden');
			}

			/* Scroll to the bottom of the page at every step. */
			window.scrollTo(0, document.body.scrollHeight);
		}
	});

	boothsRecoding = boothsRecode(
								2,
								multiplierForRecoding
							);

	boothsPencil(
					2,
					multiplicand,
					multiplicandDec,
					multiplierDec,
					boothsRecoding,
					carry
				);

	decrementStepNumber();

	$('#multiplier-zero-appended').text(multiplierZeroAppended);
	$('#multiplier-for-recoding').text(multiplierForRecoding);
	$('#booths-recoding').text(boothsRecoding);
}

/**
 * Returns to the previous displayed step when the previous button is clicked.
 *
 * @param {string} multiplicandBin Binary multiplicand.
 * @param {string} multiplierBin Binary multiplier.
 */
function boothsRewind(multiplicandBin, multiplierBin) {
	$('#prev-step').on('click', function () {
		withPreviousAndNextStep();

		/*
		 * Subtract 2 since the boothsSteps() method triggers the displayed step based on the previous
		 * value of the step number.
		 */
		if ($('#step-number-value').text() == 1) {
			boothsGoToStep0();
		} else {
			boothsGoTo(
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
function boothsGoToStep(multiplicandBin, multiplierBin) {
	/* Trigger the change when the enter key is pressed. */
	$('#step-number').on('keyup', function (e) {
		if (e.code == 'Enter') {
			withPreviousAndNextStep();

			/*
			 * Subtract 1 since the boothsSteps() method triggers the displayed step based on the previous
			 * value of the step number.
			 */
			if ($('#step-number').val() == 0) {
				boothsGoToStep0();
			} else {
				boothsGoTo(
					parseInt($('#step-number').val() - 1),
					multiplicandBin,
					multiplierBin
				);

				if ($('#step-number').val() == $('#total-steps').text()) {
					/* Hide the next step button. */
					$('#next-step').css('visibility', 'hidden');
				}
			}
		}
	});
}

/**
 * Returns to the description of the algorithm (step 0).
 */
function boothsGoToStep0() {
	initStepNumber(0);
	boothsDescription();

	noPreviousStep();

	/* Scroll back to the top. */
	window.scrollTo(0, 0);
}

/**
 * Changes the displayed step depending on the specified step number.
 *
 * @param {number} stepNumber Step number.
 * @param {string} multiplicandBin Binary multiplicand.
 * @param {string} multiplierBin Binary multiplier.
 */
function boothsGoTo(stepNumber, multiplicandBin, multiplierBin) {
	/* Return to the first step, and repeatedly trigger the click (next step) event to change the displayed step. */
	boothsInit();
	initStepNumber(1);
	boothsTotalSteps(multiplicandBin, multiplierBin);

	for (let i = 0; i < stepNumber; i++) {
		$('#next-step').trigger('click');
	}

	/* Hide the next button if going to the last step (for example, when 'Show All Steps' is selected). */
	if (parseInt(stepNumber) >= parseInt($('#total-steps').text())) {
		$('#next-step').css('visibility', 'hidden');
	} else {
		$('#next-step').css('visibility', 'visible');
	}
}

/**
 * Scrolls to the designated area when the visibility of the recoding table is toggled.
 *
 * The actual toggling of visibility is controlled in the constant boothsStepCShowTable, found
 * in algo-strings.js.
 */
function scrollToBoothsRecoding() {
	$('html, body').animate({
		scrollTop: $('#scroll-booths-recoding-table').offset().top
	});
}

/**
 * Scrolls to the designated area when the visibility of the operations table is toggled.
 *
 * The actual toggling of visibility is controlled in the constant boothsStepDShowTable, found
 * in algo-strings.js.
 */
function scrollToBoothsOperations() {
	$('html, body').animate({
		scrollTop: $('#scroll-booths-operations').offset().top
	});
}

/**
 * Handles the demonstration (simulation) of the Booth's algorithm.
 *
 * @param {string} multiplicandBin Binary multiplicand.
 * @param {string} multiplierBin Binary multiplier.
 * @param {number} multiplicandDec Decimal multiplicand.
 * @param {number} multiplierDec Decimal multiplier.
 */
function boothsDemo(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec) {
	boothsInit();
	boothsInitRecodeMap();
	boothsTotalSteps(multiplicandBin, multiplierBin);
	boothsSteps(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec);
	boothsRewind(multiplicandBin, multiplierBin);
	boothsGoToStep(multiplicandBin, multiplierBin);
}
