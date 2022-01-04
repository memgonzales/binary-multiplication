/**
 * File containing the utility functions for the demonstration (simulation).
 */

/**
 * Initializes the step number.
 *
 * Note that the initialization of the total number of steps is deferred to the script files of the respective
 * multiplication methods since it is algorithm-dependent.
 *
 * @param {number} number Initial step number (0 if the description of the multiplication algorithm is displayed;
 * 1, otherwise)
 */
function initStepNumber(number) {
	$('#step-number-value').text(number);
	$('#step-number').val(number);
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
 * Highlights the non-sign-extended portion of the product (that is, the least significant bits excluding the
 * sign extension).
 *
 * For example, if the product is 0000101, 0101 is highlighted.
 *
 * Precondition:
 * - The multiplier is 0, -1, 1, 2, or -2.
 *
 * @param {string} multiplicandBin Binary multiplicand.
 * @param {number} multiplierDec Decimal multiplier.
 * @param {string} product Binary product.
 * @returns Product with the non-sign-extended portion highlighted.
 */
function emphasizeProduct(multiplicandBin, multiplierDec, product) {
	let formattedProduct = product;
	let numBits = multiplicandBin.length;

	switch (multiplierDec) {
		case 0:
		case -1:
		case 1:
			formattedProduct = `<span class = "blurred">${product.substring(
				0,
				product.length - numBits
			)}</span><b class = "emphasized no-underline">${product.substring(
				product.length - numBits
			)}</b>`;
			break;
		case -2:
		case 2:
			formattedProduct = `<span class = "blurred">${product.substring(
				0,
				product.length - numBits - 1
			)}</span><b class = "emphasized no-underline">${product.substring(
				product.length - numBits - 1
			)}</b>`;
			break;
		default:
			/* Should not cascade here */
			break;
	}

	return formattedProduct;
}

/**
 * Hides the carry-over in pencil-and-paper simulation.
 */
function hideCarryOver() {
	$('.carry-over b').css('display', 'none');
	$('.carry-over span').css('display', 'none');
}

/**
 * Constructs an array with each element corresponding to the product with one bit highlighted.
 *
 * For example, if the product is 001, the returned array is [00*1*, 0*0*1, *0*01], with the bit enclosed
 * in asterisks referring to the highlighted bit.
 *
 * @param {string} product Binary product.
 * @returns Array with each element corresponding to the product with one bit highlighted.
 */
function formatProductDisplay(product) {
	let productDisplay = []; /* With highlighted bits */
	let productArray = []; /* Without highlighted bits */

	/* Isolate the first element (corresponding to the least significant bit of the product). */
	productDisplay.push(
		`<b class = "emphasized no-underline">${
			product[product.length - 1]
		}</b>`
	);
	productArray.push(product[product.length - 1]);

	for (let i = 1; i < product.length; i++) {
		productDisplay.push(
			`<b class = "emphasized no-underline">${
				product[product.length - i - 1]
			}</b>${productArray[i - 1]}`
		);
		productArray.push(
			`${product[product.length - i - 1]}${productArray[i - 1]}`
		);
	}

	return productDisplay;
}

/**
 * Appends a template string to the existing demonstration (simulation) display.
 *
 * @param {string} template Template string containing the formatted display to be appended.
 */
function appendTemplate(template) {
	const contents = $('#algo-steps').html();
	$('#algo-steps').html(`${contents}${template}`);
}

/**
 * Appends a row to an existing table given the template string corresponding to the row and the ID
 * corresponding to the table.
 *
 * @param {string} table ID corresponding to the existing table
 * @param {string} addlRow Template string corresponding to the row to be appended.
 */
function appendRow(table, addlRow) {
	const contents = $('#' + table).html();
	$('#' + table).html(`${contents}${addlRow}`);
}

function demoUtil() {
	/*
	 * Unbind the jQuery click callback of the playback controls. 

	 * Failure to unbind will result in the repeated triggering of the click event (even with only
	 * a single click) when the user presses the multiply button again without refreshing the page.
	 */
	$('#next-step').prop('onclick', null).off('click');
	$('#prev-step').prop('onclick', null).off('click');

	/* Clear the results area. */
	$('#algo-name').hide();
	$('#algo-steps').html('');

	initStepNumber(1);

	const multiplicandBin = $('#multiplicand-bin').val();
	const multiplierBin = $('#multiplier-bin').val();
	const multiplicandDec = $('#multiplicand-dec').val();
	const multiplierDec = $('#multiplier-dec').val();

	/* Store the values in hidden span elements to retain them even if the input fields are modified. */
	$('#multiplicand-bin-value').text(multiplicandBin);
	$('#multiplier-bin-value').text(multiplierBin);
	$('#multiplicand-dec-value').text(multiplicandDec);
	$('#multiplier-dec-value').text(multiplierDec);

	switch ($('#algo-value').text()) {
		case algoNames[0] /* Pencil-and-Paper Method */:
			break;
		case algoNames[1] /* Booth's Algorithm */:
			break;
		case algoNames[2] /* Extended Booth's Algorithm */:
			extendedBoothsDemo(
				$('#multiplicand-bin-value').text(),
				$('#multiplier-bin-value').text(),
				parseInt($('#multiplicand-dec-value').text()),
				parseInt($('#multiplier-dec-value').text())
			);
			break;
		default:
			/* Should not cascade here */
			break;
	}
}

/**
 * Starts the demonstration (simulation) when the multiply button is clicked.
 */
function demo() {
	$('#multiply').on('click', function () {
		/* Make the previous step button visible. */
		$('#prev-step').css('visibility', 'visible');

		demoUtil();
	});
}
