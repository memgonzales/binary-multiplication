
/**
 * Handles which step in the demonstration (simulation) is displayed.
 *
 * @param {string} multiplicandBin Binary multiplicand.
 * @param {string} multiplierBin Binary multiplier.
 * @param {number} multiplicandDec Decimal multiplicand.
 * @param {number} multiplierDec Decimal multiplier.
 * @param {number} productDec Decimal product.
 * @returns {string} The string for the Extended Booths Algorithm to be inputted into the file.
 */
function extendedBoothsText(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec, productDec){

	let returnString = "Multiplicand\n\tDecimal\t" + multiplicandDec + "\n\tBinary\t" + multiplicandBin + "\n\nMultiplier\n\tDecimal\t" + multiplierDec + "\n\tBinary\t" + multiplierBin + "\n\n----------------------------------------------------------------\n\n";

	/* Obtain the values needed from the hidden spans */
	let multiplierEqualized = $('#multiplier-equalized').text();
	let multiplicandEqualized = $('#multiplicand-equalized').text();
	let multiplierZeroAppended = $('#multiplier-zero-appended').text();
	let multiplierForRecoding = $('#multiplier-for-recoding').text();
	let extendedBoothsRecoding = $('#extended-booths-recoding').text();
	let productBin = $('#tracking-product').text();
	let summands = $('#tracking-summands').text().split(",");

	/* Build the string per line. */
	for(let i = 0; i < extendedBoothsStepStrings.length; i++){
		returnString = returnString.concat(extendedBoothsStepStrings[i]);

		if(i == 1){
			returnString = returnString.concat("\tMultiplicand:\t", multiplicandEqualized);
			returnString = returnString.concat("\n\tMultiplier:\t", multiplierEqualized);

			if(multiplicandBin.length == multiplierBin.length){
				returnString = returnString.concat("\t(no need for sign extension)");
			}
		}
		else if(i == 2){
			returnString = returnString.concat("\n\t\t", multiplierZeroAppended);
		}
		else if(i == 3){
			returnString = returnString.concat("\n\t\t", multiplierForRecoding);
		}
		else if(i == 4){
			returnString = returnString.concat("\t\t", multiplierForRecoding);
			returnString = returnString.concat("\n\t\t", extendedBoothsRecoding);
		}
		else if(i == 5){

			/* Build the pencil-and-paper portion of the extended booth's algorithm. */
			returnString = returnString.concat("\t", multiplicandEqualized);
			returnString = returnString.concat("\n x\t", extendedBoothsRecoding);
			returnString = returnString.concat("\n----------------------------------------\n");

			for(let j = 0; j < summands.length; j++){

				if(j == summands.length - 1){
					returnString = returnString.concat(" +\t", summands[j] + "\n");
				}else{
					returnString = returnString.concat("\t", summands[j] + "\n");
				}
			}

			returnString = returnString.concat("----------------------------------------\n");
			returnString = returnString.concat("\t", productBin + "\n");

			let verificationString = "Verification:  " +  multiplicandDec + "  x  " + multiplierDec + "  =  " + productDec + "  =  0b" + productBin ;

			returnString = returnString.concat("\n", verificationString);
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
	let finalString = "";

	let multiplicandBin = $('#multiplicand-bin-value').text();
	let multiplierBin = $('#multiplier-bin-value').text();
	let multiplicandDec = $('#multiplicand-dec-value').text();
	let multiplierDec = $('#multiplier-dec-value').text();

	let productDec = parseInt(multiplierDec) * parseInt(multiplicandDec);

	if(algorithm == algoNames[0]){
	}
	else if(algorithm == algoNames[1]){
	}
	else{
		finalString = extendedBoothsText(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec, productDec)
	}

	return finalString;
}

/**
 * Executes a download for the file containing all the steps and answer.
 */
function download(algorithm){
	let content = generateContent(algorithm);
	let filename = "binaryMultiplication.txt";

	let uriContent = URL.createObjectURL(new Blob([content], {type: 'text/plain'}));
	let link = document.createElement('a');

	link.setAttribute('href', uriContent);
	link.setAttribute('download', filename);

	let event = new MouseEvent('click');
	link.dispatchEvent(event);
}

/**
 * Exports the steps of the algorithm to a text file.
 */
function exportText() {
	$('#save-text').on('click', function () {
		if (
			!isAmbiguousCase($('#multiplicand-bin').val()) &&
			!isAmbiguousCase($('#multiplier-bin').val())
		) {
			switch ($('#algo-value').text()) {
				case algoNames[0] /* Pencil-and-Paper Method */:
					break;
				case algoNames[1] /* Booth's Algorithm */:
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
	});
}