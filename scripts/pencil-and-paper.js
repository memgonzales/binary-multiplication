/**
 * File containing the utility functions for the demonstration (simulation) of the pencil-and-paper method.
 *
 * For horizontal spacing, use the .tab-n (where n is a natural number) classes found in style.css,
 * as seen in the strings related to the pencil-and-paper method. Avoid using consecutive &nbsp;
 * since these clutter the text included when the user performs a selection.
 */

/**
 * Row where the product is displayed (final steps of pencil-and-paper demonstration/simulation).
 */
const pencilProductRow = `<tr>
        <th id = "pencil-product-carry-over" class = "no-bold right-align carry-over blurred"></th>
        <td id = "pencil-product" class = "right-align"></td>
    </tr>`;

/**
 * Initializes the results area at the start of the demonstration (simulation) and displays steps A and B.
 *
 * Note that the initialization of the step number is handled in the demo() method in demo-util.js.
 */
function pencilInit() {
	$('#algo-name').hide();
	$('#algo-steps').html(`${pencilStepA}<br>${pencilStepB}`);
}

/**
 * Initializes the results area at the start of the demonstration (simulation) and displays
 * the description of the algorithm.
 */
function pencilDescription() {
	/* 0 refers to the index of the pencil-and-paper method. */
	showTrivia(0);
	showAlgoName(0);
	showAlgoSteps(0);
}

/**
 * Initializes the total number of steps.
 *
 * Note that the initialization of the step number is handled in the demo() method in demo-util.js.
 *
 * @param {string} multiplicandBin Binary multiplicand.
 * @param {string} multiplierBin Binary multiplier.
 */
function pencilTotalSteps(multiplicandBin, multiplierBin) {
	const numBits = Math.max(multiplicandBin.length, multiplierBin.length);

	if (multiplierBin[0] == '0') {
		/* Should be one more than the conditional in the method pencilSteps() */
		$('#total-steps').text(5 + numBits + 2 * numBits);

	/* If the multiplier is negative, add another step for adding the two's complement of the multiplicand as 
	 * an intermediate product.
	 */
	} else {
		$('#total-steps').text(6 + numBits + 2 * numBits);
	}
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
function pencilDisplayEqualizedBits(
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
 * Displays step C.
 *
 */
function pencilDisplayStepC() {
	appendTemplate(
		`${pencilStepC}`
	);

	incrementStepNumber();
}

/**
 * Displays the pencil-and-paper multiplication of the multiplicand and the multiplier,
 * corresponding to step C.
 *
 * @param {number} displayNumber Step number relative to the pencil-and-paper multiplication.
 * @param {string} multiplicand Multiplicand after number of bits has been equalized.
 * @param {number} multiplicandDec Decimal multiplicand.
 * @param {number} multiplierDec Decimal multiplier.
 * @param {string} multiplierFull Multiplier after number of bits has been equalized.
 * @param {number} carry Carry of the current addition step.
 * @returns {string} Binary product.
 */
 function pencilPencil(
	displayNumber,
	multiplicand,
	multiplicandDec,
	multiplierDec,
	multiplierFull,
	carry
) {
	let summands = []; /* Summands (without format) */
	let summandsFormatted = []; /* Summands (with format) */
	let multiplierDisplay = []; /* Multiplier (with format) */
	let currentCarry = carry;	/* Carry of the current addition step */

	/* Multiplier (without format) */
	const multiplierArray = multiplierFull.trim().split('').reverse();

	for (let i = 0; i < multiplierArray.length; i++) {
		const multiplier = parseInt(multiplierArray[i]);

		/* Multiply the multiplicand by the digit in the recoding, starting at the rightmost digit. */
		summands.push(multiply(multiplicandDec, multiplier, 2 * multiplicand.length - i));
		summandsFormatted.push(emphasizeProduct(multiplicand, multiplier, summands[i]));

		/* Highlight the digit in the recoding by which the multiplicand is multiplied. */
		multiplierDisplay.push(multiplierFull.trim().split('').reverse());
		multiplierDisplay[i][
			i
		] = `<b class = "emphasized no-underline">${multiplierArray[i]}</b>`;
		multiplierDisplay[i] = multiplierDisplay[i].reverse().join(' ');
	}

	/* If the multiplier is negative, add the two's complement of the multiplicand as an intermediate product. */
	if (multiplierFull[0] == '1') {
		summands.push(multiply(multiplicandDec, -1, multiplicand.length));
		summandsFormatted.push(emphasizeProduct(multiplicand, -1, summands[multiplierArray.length]));

		multiplierDisplay.push(multiplierFull.trim().split('').reverse());
		multiplierDisplay[multiplicand.length] = multiplierDisplay[multiplicand.length].reverse().join(' ');
	}

	const template = `<div class = "indented-2 demo-box">
            <table id = "pencil-pencil-table" class = "demo-box-table pencil-table">
                <tr>
                    <th></th>
                    <td id = "step-c-pencil-multiplicand" class = "right-align">${multiplicand}</td>
                    <td class = "carry-over">
                        <b>Carry-over:</b>
                    </td>
                </tr>
                <tr class = "bottom-border">
                    <th class = "no-bold right-align">&times;</th>
                    <td id = "step-c-pencil-display" class = "right-align">${multiplierFull}</td>
                    <td class = "carry-over">
                        <span id = "pencil-carry-over"></span>
                    </td>
                </tr>
            </table>
        </div><br>`;

	/* Row for each intermediate summand. */
	let addlRow = `<tr>
            <th class = "no-bold"></th>
            <td id = "pencil-summands-${displayNumber - 1}">${
		summandsFormatted[displayNumber - 1]
	}</td>
        </tr>`;

	const numBitsProduct = 2 * multiplicand.length;

	let numSummands = multiplierArray.length;
	let offset = 0;

	/* If the multiplier is negative, the number of summands, and subsequently the number of steps, is 
	 * increased by 1.
	 */
	if (multiplierFull[0] == '1') {
		numSummands = numSummands + 1;
		offset = 1;
	}

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
                    <td id = "pencil-summands-${displayNumber - 1}">${
				summandsFormatted[displayNumber - 1]
			}</td>
                </tr>`;
		}

		appendRow('pencil-pencil-table', `${addlRow}`);

		/* Display the formatted multiplicand, multiplier, and summand. */
		$('#step-c-pencil-multiplicand').html(
			`<b class = "emphasized no-underline">${multiplicand}</b>`
		);
		$('#step-c-pencil-display').html(`<span id="booths-display-spacing-span" style="letter-spacing: 1px;">${multiplierDisplay[displayNumber - 1]}</span>`);

		/* Remove the highlight of the previous summand (thus, subtract 2 from the step number). */
		$(`#pencil-summands-${displayNumber - 2}`).html(`${summands[displayNumber - 2]}`);
	} else if (displayNumber <= multiplierArray.length + numBitsProduct + offset) {
		/*
		 * Compute for the total of the bit column being summed.
		 * Calculate the index so that the rightmost bit column is processed first.
		 */
		const index = numBitsProduct - (displayNumber - multiplierArray.length - offset);
		let total = currentCarry;
		for (let i = 0; i < numSummands; i++) {
			let summand = $(`#pencil-summands-${i}`).text();
			
			if (summand[index] != undefined) {
				total = total + parseInt(summand[index]);
			}
		}
		
		/* Compute for the carry based on the sum of the bit column. */
		currentCarry = Math.floor(total / 2);

		/*
		 * If it is the least significant bit of the product:
		 * - Remove the highlight of the multiplicand and multiplier.
		 * - Display the carryover.
		 * - Append the row for displaying the product.
		 */
		if (displayNumber == multiplierArray.length + 1 + offset) {
			$('#step-c-pencil-multiplicand').html(`${multiplicand}`);
			$('#step-c-pencil-display').html(`<span id="booths-display-spacing-span">${multiplierFull}</span>`);

			/* Remove the highlight of the last summand (thus, subtract 2 from the step number). */
			$(`#pencil-summands-${displayNumber - 2}`).html(`${summands[displayNumber - 2]}`);
			$('.carry-over b').css('display', 'block');

			appendRow('pencil-pencil-table', `${pencilProductRow}`);
		} else if (displayNumber == multiplierArray.length + numBitsProduct + offset) {
			/*
			 * If it is the most significant bit of the product, display the final carry-over at the cell
			 * to the left of the product.
			 */
			$('#pencil-product-carry-over').text(currentCarry);
		}

		/* Update the carry-over after summation of each bit column. */
		$('#pencil-carry-over').text(currentCarry);

		/*
		 * Highlight the bit column being summed.
		 * Calculate the index so that the rightmost bit column is highlighted first.
		 */
		for (let i = 0; i < numSummands; i++) {
			const summand = $(`#pencil-summands-${i}`).text();
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

			$(`#pencil-summands-${i}`).html(summandFormatted);
		}

		/* Highlight the bit in the product that corresponds to the sum of the bit column. */
		$('#pencil-product').html(
			`${productDisplay[displayNumber - multiplierArray.length - 1 - offset]}`
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

	incrementStepNumber();

	/* Return the binary product and the carry. */
	return [product, currentCarry];
}

/**
 * Displays the verification step.
 *
 * @param {string} multiplicandDec Decimal multiplicand.
 * @param {string} multiplierDec Decimal multiplier.
 * @param {string} product Binary product.
 * @param {number} numSummands Number of intermediate summands.
 */
function pencilVerify(multiplicandDec, multiplierDec, product, numSummands) {
	const productDec = multiplicandDec * multiplierDec;
	const doubleCheck = `${multiplicandDec}<sub>10</sub><span class = "tab-9"></span>&times;<span class = "tab-9"></span>${multiplierDec}<sub>10</sub><span class = "tab-10"></span>=<span class = "tab-10"></span>${productDec}<sub>10</sub><span class = "tab-10"></span>=<span class = "tab-10"></span><span class = "final-answer">${product}<sub>2</sub></span><br>`;

	appendTemplate(`${verify}<span class = "tab-13"></span>${doubleCheck}`);

	/* Hide the carry-over and remove the highlights from the previous step. */
	hideCarryOver();
	for (let i = 0; i < numSummands; i++) {
		$(`#pencil-summands-${i} b`).addClass('remove-emphasis');
	}

	$('#pencil-product b').addClass('remove-emphasis');

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
 function pencilSteps(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec) {
	/* Equalize the number of bits of the operands. */
	const [multiplicand, multiplier] = equalizeBits(multiplicandBin, multiplierBin);

	/* Store formatted values in hidden spans for export use. */
	$('#multiplicand-equalized').text(multiplicand);
	$('#multiplier-equalized').text(multiplier);

	/* This will be set by the method calls. */
	let product = '';

	/* The carry initially has a value of 0. */
	let carry = 0;

	$('#next-step').on('click', function () {
		withPreviousAndNextStep();

		/* Add one to the step number conditionals for the pencil-and-paper computation proper if the 
		 * multiplier is negative.
		 */
		let offset = 0;
		if (multiplierBin[0] == '1') {
			offset = 1;
		}

		/* Check if the selected multiplication method is the pencil-and-paper method. */
		if (checkMulMethod(algoNames[0])) {
			const stepNumber = parseInt($('#step-number-value').text());
			if (stepNumber == 0) {
				pencilInit();
				initStepNumber(1);
			} else if (stepNumber == 1) {
				pencilDisplayEqualizedBits(
					multiplicandBin,
					multiplierBin,
					multiplicand,
					multiplier
				);
			} else if (stepNumber == 2) {
			 	pencilDisplayStepC();
		    } else if (stepNumber <= offset + 3 + multiplier.length + 2 * multiplier.length) {
				/*
				 * The number of steps taken is one more than the number of bits in the multiplier plus the number
				 * of bits in the product.
				 *
				 * The additional step comes from the display of the multiplication statement (prior to performing
				 * pencil-and-paper method).
				 *
				 * The first argument refers to the step number relative to the pencil-and-paper method.
				 */
				[product, carry] = pencilPencil(
					stepNumber - 3,
					multiplicand,
					multiplicandDec,
					multiplierDec,
					multiplier,
					carry
				);

			} else if (stepNumber == offset + 4 + multiplier.length + 2 * multiplier.length) {
				pencilVerify(multiplicandDec, multiplierDec, product, multiplier.length);

				/* Hide the next step button. */
				$('#next-step').css('visibility', 'hidden');
			}

			/* Scroll to the bottom of the page at every step. */
			window.scrollTo(0, document.body.scrollHeight);
		}
	});

	product = pencilPencil(
					2,
					multiplicand,
					multiplicandDec,
					multiplierDec,
					multiplier,
					carry
				);

	decrementStepNumber();

	// $('#multiplier-zero-appended').text(multiplierZeroAppended);
	// $('#multiplier-for-recoding').text(multiplierForRecoding);
	// $('#booths-recoding').text(boothsRecoding);
	// $('#tracking-product').text(product);
}

/**
 * Returns to the previous displayed step when the previous button is clicked.
 *
 * @param {string} multiplicandBin Binary multiplicand.
 * @param {string} multiplierBin Binary multiplier.
 */
function pencilRewind(multiplicandBin, multiplierBin) {
	$('#prev-step').on('click', function () {
		withPreviousAndNextStep();

		/*
		 * Subtract 2 since the pencilSteps() method triggers the displayed step based on the previous
		 * value of the step number.
		 */
		if ($('#step-number-value').text() == 1) {
			pencilGoToStep0();
		} else {
			pencilGoTo(
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
function pencilGoToStep(multiplicandBin, multiplierBin) {
	/* Trigger the change when the enter key is pressed. */
	$('#step-number').on('keyup', function (e) {
		if (e.code == 'Enter') {
			withPreviousAndNextStep();

			/*
			 * Subtract 1 since the pencilSteps() method triggers the displayed step based on the previous
			 * value of the step number.
			 */
			if ($('#step-number').val() == 0) {
				pencilGoToStep0();
			} else {
				pencilGoTo(
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
function pencilGoToStep0() {
	initStepNumber(0);
	pencilDescription();

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
function pencilGoTo(stepNumber, multiplicandBin, multiplierBin) {
	/* Return to the first step, and repeatedly trigger the click (next step) event to change the displayed step. */
	pencilInit();
	initStepNumber(1);
	pencilTotalSteps(multiplicandBin, multiplierBin);

	for (let i = 0; i < stepNumber; i++) {
		$('#next-step').trigger('click');
	}
}

/**
 * Handles the demonstration (simulation) of the pencil-and-paper method.
 *
 * @param {string} multiplicandBin Binary multiplicand.
 * @param {string} multiplierBin Binary multiplier.
 * @param {number} multiplicandDec Decimal multiplicand.
 * @param {number} multiplierDec Decimal multiplier.
 */
function pencilDemo(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec) {
	pencilInit();
	pencilTotalSteps(multiplicandBin, multiplierBin);
	pencilSteps(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec);
	pencilRewind(multiplicandBin, multiplierBin);
	pencilGoToStep(multiplicandBin, multiplierBin);
}
