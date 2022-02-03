/**
 * Generates the string for the content of the exported .txt file for the pencil-and-paper method.
 *
 * @param {string} multiplicandBin Binary multiplicand.
 * @param {string} multiplierBin Binary multiplier.
 * @param {number} multiplicandDec Decimal multiplicand.
 * @param {number} multiplierDec Decimal multiplier.
 * @param {number} productDec Decimal product.
 * @returns {string} The string for the pencil-and-paper method to be inputted into the file.
 */
function pencilText(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec, productDec) {
	let returnString =
		'PENCIL-AND-PAPER METHOD\n\n' + 
		'Multiplicand\n\tDecimal\t' +
		multiplicandDec +
		'\n\tBinary\t' +
		multiplicandBin +
		'\n\nMultiplier\n\tDecimal\t' +
		multiplierDec +
		'\n\tBinary\t' +
		multiplierBin +
		'\n\n----------------------------------------------------------------\n\n';

	/* Obtain the values needed from the hidden spans */
	let multiplierEqualized = $('#multiplier-equalized').text();
	let multiplicandEqualized = $('#multiplicand-equalized').text();
	let productBin = $('#tracking-product').text();
	let summands = $('#tracking-summands').text().split(',');

	/* Build the string per line. */
	for (let i = 0; i < pencilStepStrings.length; i++) {
		returnString = returnString.concat(pencilStepStrings[i]);

		if (i == 1) {
			returnString = returnString.concat('\tMultiplicand:\t', multiplicandEqualized);
			returnString = returnString.concat('\n\t  Multiplier:\t', multiplierEqualized);

			if (multiplicandBin.length == multiplierBin.length) {
				returnString = returnString.concat('\t');
			}
		} else if (i == 2) {
			/* Build the pencil-and-paper portion of the pencil-and-paper method. */
			returnString = returnString.concat('\t', multiplicandEqualized);
			returnString = returnString.concat('\n x\t', multiplierEqualized);
			returnString = returnString.concat('\n----------------------------------------\n');

			for (let j = 0; j < summands.length; j++) {
				if (j == summands.length - 1) {
					returnString = returnString.concat(' +\t', summands[j] + '\n');
				} else {
					returnString = returnString.concat('\t', summands[j] + '\n');
				}
			}

			returnString = returnString.concat('----------------------------------------\n');
			returnString = returnString.concat('\t', productBin + '\n');

			let verificationString =
				'Verification:  ' +
				multiplicandDec +
				'  x  ' +
				multiplierDec +
				'  =  ' +
				productDec +
				'  =  0b' +
				productBin;

			returnString = returnString.concat('\n', verificationString);
		}
	}

	return returnString;
}

/**
 * Generates the string for the content of the exported .txt file for Booth's Algorithm.
 *
 * @param {string} multiplicandBin Binary multiplicand.
 * @param {string} multiplierBin Binary multiplier.
 * @param {number} multiplicandDec Decimal multiplicand.
 * @param {number} multiplierDec Decimal multiplier.
 * @param {number} productDec Decimal product.
 * @returns {string} The string for the Booths Algorithm to be inputted into the file.
 */
function boothsText(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec, productDec) {
	let returnString =
		"BOOTH'S ALGORITHM\n\n" + 
		'Multiplicand\n\tDecimal\t' +
		multiplicandDec +
		'\n\tBinary\t' +
		multiplicandBin +
		'\n\nMultiplier\n\tDecimal\t' +
		multiplierDec +
		'\n\tBinary\t' +
		multiplierBin +
		'\n\n----------------------------------------------------------------\n\n';

	/* Obtain the values needed from the hidden spans */
	let multiplierEqualized = $('#multiplier-equalized').text();
	let multiplicandEqualized = $('#multiplicand-equalized').text();
	let multiplierZeroAppended = $('#multiplier-zero-appended').text();
	let multiplierForRecoding = $('#multiplier-for-recoding').text();
	let boothRecoding = $('#booths-recoding').text();
	let productBin = $('#tracking-product').text();
	let summands = $('#tracking-summands').text().split(',');

	/* Build the string per line. */
	for (let i = 0; i < boothsStepStrings.length; i++) {
		returnString = returnString.concat(boothsStepStrings[i]);

		if (i == 1) {
			returnString = returnString.concat('\tMultiplicand:\t', multiplicandEqualized);
			returnString = returnString.concat('\n\t  Multiplier:\t', multiplierEqualized);

			if (multiplicandBin.length == multiplierBin.length) {
				returnString = returnString.concat('\t');
			}
		} else if (i == 2) {
			returnString = returnString.concat('\n\t\t', multiplierZeroAppended);
		} else if (i == 3) {
			returnString = returnString.concat('\n\t\t', boothRecoding);
		} else if (i == 4) {
			/* Build the pencil-and-paper portion of the extended booth's algorithm. */
			returnString = returnString.concat('\t', multiplicandEqualized);
			returnString = returnString.concat('\n x\t', boothRecoding);
			returnString = returnString.concat('\n----------------------------------------\n');

			for (let j = 0; j < summands.length; j++) {
				if (j == summands.length - 1) {
					returnString = returnString.concat(' +\t', summands[j] + '\n');
				} else {
					returnString = returnString.concat('\t', summands[j] + '\n');
				}
			}

			returnString = returnString.concat('----------------------------------------\n');
			returnString = returnString.concat('\t', productBin + '\n');

			let verificationString =
				'Verification:  ' +
				multiplicandDec +
				'  x  ' +
				multiplierDec +
				'  =  ' +
				productDec +
				'  =  0b' +
				productBin;

			returnString = returnString.concat('\n', verificationString);
		}
	}

	return returnString;
}

/**
 * Generates the string for the content of the exported .txt file for Extended Booth's Algorithm.
 *
 * @param {string} multiplicandBin Binary multiplicand.
 * @param {string} multiplierBin Binary multiplier.
 * @param {number} multiplicandDec Decimal multiplicand.
 * @param {number} multiplierDec Decimal multiplier.
 * @param {number} productDec Decimal product.
 * @returns {string} The string for the Extended Booths Algorithm to be inputted into the file.
 */
function extendedBoothsText(
	multiplicandBin,
	multiplierBin,
	multiplicandDec,
	multiplierDec,
	productDec
) {
	let returnString =
		"EXTENDED BOOTH'S ALGORITHM\n\n" + 
		'Multiplicand\n\tDecimal\t' +
		multiplicandDec +
		'\n\tBinary\t' +
		multiplicandBin +
		'\n\nMultiplier\n\tDecimal\t' +
		multiplierDec +
		'\n\tBinary\t' +
		multiplierBin +
		'\n\n----------------------------------------------------------------\n\n';

	/* Obtain the values needed from the hidden spans */
	let multiplierEqualized = $('#multiplier-equalized').text();
	let multiplicandEqualized = $('#multiplicand-equalized').text();
	let multiplierZeroAppended = $('#multiplier-zero-appended').text();
	let multiplierForRecoding = $('#multiplier-for-recoding').text();
	let extendedBoothsRecoding = $('#extended-booths-recoding').text();
	let productBin = $('#tracking-product').text();
	let summands = $('#tracking-summands').text().split(',');

	/* Build the string per line. */
	for (let i = 0; i < extendedBoothsStepStrings.length; i++) {
		returnString = returnString.concat(extendedBoothsStepStrings[i]);

		if (i == 1) {
			returnString = returnString.concat('\tMultiplicand:\t', multiplicandEqualized);
			returnString = returnString.concat('\n\t  Multiplier:\t', multiplierEqualized);
		} else if (i == 2) {
			returnString = returnString.concat('\n\t\t', multiplierZeroAppended);
		} else if (i == 3) {
			returnString = returnString.concat('\n\t\t', multiplierForRecoding);
						
			if (multiplierEqualized.length % 2 == 0) {
				returnString = returnString.concat('\t(no need for sign extension)');
			}
		} else if (i == 4) {
			returnString = returnString.concat('\n\t\t', extendedBoothsRecoding);
		} else if (i == 5) {
			/* Build the pencil-and-paper portion of the extended booth's algorithm. */
			returnString = returnString.concat('\t', multiplicandEqualized);
			returnString = returnString.concat('\n x\t', extendedBoothsRecoding);
			returnString = returnString.concat('\n----------------------------------------\n');

			for (let j = 0; j < summands.length; j++) {
				if (j == summands.length - 1) {
					returnString = returnString.concat(' +\t', summands[j] + '\n');
				} else {
					returnString = returnString.concat('\t', summands[j] + '\n');
				}
			}

			returnString = returnString.concat('----------------------------------------\n');
			returnString = returnString.concat('\t', productBin + '\n');

			let verificationString =
				'Verification:  ' +
				multiplicandDec +
				'  x  ' +
				multiplierDec +
				'  =  ' +
				productDec +
				'  =  0b' +
				productBin;

			returnString = returnString.concat('\n', verificationString);
		}
	}

	return returnString;
}

/**
 * Generates the content of the file based on the algorithm selected.
 *
 * @param {string} algorithm The algorithm selected by the user
 * @returns {string} The final string to be placed in the .txt file corresponding to the algorithm selected.
 */
function generateContent(algorithm) {
	let finalString = '';

	let multiplicandBin = $('#multiplicand-bin-value').text();
	let multiplierBin = $('#multiplier-bin-value').text();
	let multiplicandDec = $('#multiplicand-dec-value').text();
	let multiplierDec = $('#multiplier-dec-value').text();

	let productDec = parseInt(multiplierDec) * parseInt(multiplicandDec);

	if (algorithm == algoNames[0]) {
		finalString = pencilText(
			multiplicandBin,
			multiplierBin,
			multiplicandDec,
			multiplierDec,
			productDec
		);
	} else if (algorithm == algoNames[1]) {
		finalString = boothsText(
			multiplicandBin,
			multiplierBin,
			multiplicandDec,
			multiplierDec,
			productDec
		);
	} else {
		finalString = extendedBoothsText(
			multiplicandBin,
			multiplierBin,
			multiplicandDec,
			multiplierDec,
			productDec
		);
	}

	return finalString;
}

/**
 * Executes a download for the file containing all the steps and answer.
 */
function download(algorithm) {
	let content = generateContent(algorithm);
	let filename = 'binaryMultiplication.txt';

	let uriContent = URL.createObjectURL(new Blob([content], { type: 'text/plain' }));
	let link = document.createElement('a');

	link.setAttribute('href', uriContent);
	link.setAttribute('download', filename);

	let event = new MouseEvent('click');
	link.dispatchEvent(event);
}

function exportTextUtil() {
	if (
		!isAmbiguousCase($('#multiplicand-bin').val()) &&
		!isAmbiguousCase($('#multiplier-bin').val())
	) {
		switch ($('#algo-value').text()) {
			case algoNames[0] /* Pencil-and-Paper Method */:
				download(algoNames[0]);
				break;
			case algoNames[1] /* Booth's Algorithm */:
				download(algoNames[1]);
				break;
			case algoNames[2] /* Extended Booth's Algorithm */:
				download(algoNames[2]);
				break;
			default:
				/* Should not cascade here */
				break;
		}
	} else {
		handleAmbiguousCases();
	}
}

/**
 * Exports the steps of the algorithm to a text file.
 */
function exportText() {
	$('#save-text').on('click', function () {
		const saveCursor = $('#save-text').css('cursor');

		/* Disable saving to text file when multiply button is not yet clicked. */
		if (saveCursor != 'not-allowed') {
			exportTextUtil();
		}
	});

	$('#save-logo').on('click', function () {
		const saveCursor = $('#save-text').css('cursor');

		/* Disable saving to text file when multiply button is not yet clicked. */
		if (saveCursor != 'not-allowed') {
			exportTextUtil();
		}
	});
}
