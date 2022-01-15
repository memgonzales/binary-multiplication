/**
 * File containing the utility functions for the real-time processing of the input.
 */

/**
 * Converts the decimal input to binary in real-time.
 *
 * @param {string} operand Operand associated with the input field.
 */
function decimalToBinary(operand) {
	$('#' + operand + '-dec').on('keyup', function () {
		/* If the user has only entered the sign, do not perform conversion. */
		if (
			isValidDec($('#' + operand + '-dec'), operand, $('#' + operand + '-dec').val()) &&
			!isSignOnly($('#' + operand + '-dec').val())
		) {
			$('#' + operand + '-bin').val(toBinary($('#' + operand + '-dec').val()));
		} else {
			$('#' + operand + '-bin').val('');
		}

		/* Enable the submit button and show the trivia if the operands can already be multiplied. */
		if (canMultiply()) {
			$('#multiply').attr('disabled', false);
			showTriviaDiv();
		}

		/* Do not enable the submit button but show the trivia if all the fields are blank. */
		if (allFieldsBlank()) {
			showTriviaDiv();
		}
	});
}

/**
 * Converts the binary input to decimal in real-time.
 *
 * @param {string} operand Operand associated with the input field.
 */
function binaryToDecimal(operand) {
	$('#' + operand + '-bin').on('keyup', function () {
		if (isValidBin($('#' + operand + '-bin'), operand, $('#' + operand + '-bin').val())) {
			$('#' + operand + '-dec').val(toDecimal($('#' + operand + '-bin').val()));
		} else {
			$('#' + operand + '-dec').val('');
		}

		/* Enable the submit button and show the trivia if the operands can already be multiplied. */
		if (canMultiply()) {
			$('#multiply').attr('disabled', false);
			showTriviaDiv();
		}

		/* Do not enable the submit button but show the trivia if all the fields are blank. */
		if (allFieldsBlank()) {
			showTriviaDiv();
		}
	});
}

/**
 * Checks if the given string is only a sign (that is, either '+' or '-').
 *
 * @param {string} value String to be checked.
 * @returns {boolean} `true` if the given string is only a sign (that is, either '+' or '-'); `false`,
 * otherwise.
 */
function isSignOnly(value) {
	return value.trim() == '+' || value.trim() == '-';
}

/**
 * Checks if the decimal operand is valid and supported by the calculator.
 *
 * Note that this methods recognizes '+' or '-' as valid strings. However, they are properly handled
 * in the method canMultiply().
 *
 * @param {HTMLElement} inputField Input field being validated.
 * @param {string} operand Operand associated with the input field being validated.
 * @param {string} value Decimal operand.
 * @returns {boolean} `true` if the decimal operand is valid and supported by the calculator (or if `value`
 * is either a positive or a negative sign); `false`, otherwise.
 */
function isValidDec(inputField, operand, value) {
	/* Regex that zero or one positive or negative sign, followed by zero or more digits */
	const pattern = /^(-|\+)?(\d+)?$/;
	if (!pattern.test(value)) {
		const slicedVal = value.slice(0, -1);

		if (pattern.test(slicedVal)) {
			$(inputField).val(slicedVal);
		} else {
			/* Trap the case where the user pasted an erroneous value (instead of typing it). */
			$('#' + operand + '-error > p').html(INVALID_DEC);
			$('#multiply').attr('disabled', true);
			hideTriviaDiv();
		}

		return false;
	}

	/* Check if the value is within the range of supported signed integers. */
	if (parseInt(value) > Math.pow(2, MAX_NUM_BITS - 1) - 1) {
		$('#' + operand + '-error > p').html(MAX_ERROR);
		$('#multiply').attr('disabled', true);
		hideTriviaDiv();
		return false;
	}

	if (parseInt(value) < -1 * Math.pow(2, MAX_NUM_BITS - 1)) {
		$('#' + operand + '-error > p').html(MIN_ERROR);
		$('#multiply').attr('disabled', true);
		hideTriviaDiv();
		return false;
	}

	/* Remove the error message if the value has been deleted, but flag as an error. */
	if (value.length == 0) {
		$('#' + operand + '-error > p').html('');
		$('#multiply').attr('disabled', true);
		return false;
	}

	/* No error found */
	$('#' + operand + '-error > p').html('');
	return true;
}

/**
 * Checks if the binary operand is valid and supported by the calculator.
 *
 * @param {HTMLElement} inputField Input field being validated.
 * @param {string} operand Operand associated with the input field being validated.
 * @param {string} value Binary operand.
 * @returns {boolean} `true` if the binary operand is valid and supported by the calculator; `false`,
 * otherwise.
 */
function isValidBin(inputField, operand, value) {
	/* Regex that only accepts zero or more 0s or 1s */
	const pattern = /^[0-1]*$/;
	if (!pattern.test(value)) {
		const slicedVal = value.slice(0, -1);

		if (pattern.test(slicedVal)) {
			$(inputField).val(slicedVal);
		} else {
			/* Trap the case where the user pasted an erroneous value (instead of typing it). */
			$('#' + operand + '-error > p').html(INVALID_BIN);
			$('#multiply').attr('disabled', true);
			hideTriviaDiv();
		}

		return false;
	}

	/* Check if the value is within the range of supported signed integers. */
	if (value.length > MAX_NUM_BITS) {
		$('#' + operand + '-error > p').html(`${EXCEED_BITS} ${value.length} bits)`);
		$('#multiply').attr('disabled', true);
		hideTriviaDiv();
		return false;
	}

	/* Remove the error message if the value has been deleted, but flag as an error. */
	if (value.length == 0) {
		$('#' + operand + '-error > p').html('');
		$('#multiply').attr('disabled', true);
		return false;
	}

	/* No error found */
	$('#' + operand + '-error > p').html('');
	return true;
}

/**
 * Checks if a binary number is valid and supported by the calculator, but without performing any changes
 * to the display (that is, this method does not display or hide any error message).
 *
 * @param {string} value Binary number.
 * @returns {boolean} `true` if the binary number is supported by the calculator; `false`, otherwise.
 */
function isValidBinNoDisplay(value) {
	const pattern = /^[0-1]*$/;
	return pattern.test(value) && value.length != 0 && value.length <= MAX_NUM_BITS;
}

/**
 * Checks if the given operands can already be multiplied (without taking into account the ambiguous
 * cases of having an operand of the form 10...0).
 *
 * In particular, if the binary multiplicand and binary multiplier are already valid, then the given operands
 * can already be multiplied. The binary operands were chosen instead of the decimal operands for the following
 * reasons:
 * - To provide some leeway for the user to correct the ambiguous case of having an operand of the form 10...0
 * - To handle the case where the user only entered a '+' or '-' sign (this is accepted as a valid string by
 *   the method isValidDec(), but cannot be converted into a binary number, thus throwing an error)
 *
 * @returns {boolean} `true` if the given operands can already be multiplied; `false`, otherwise.
 */
function canMultiply() {
	return (
		isValidBinNoDisplay($('#multiplicand-bin').val()) &&
		isValidBinNoDisplay($('#multiplier-bin').val())
	);
}

/**
 * Hides the trivia below the multiply button.
 */
function hideTriviaDiv() {
	/* Remove the scrollbar, and camouflage the font color. */
	$('#input-numbers').css('overflow-y', 'hidden');
	$('#trivia-div').css('color', grayBg);

	/* Prevent selection of trivia text. */
	$('#trivia-div').css('user-select', 'none');
	$('#trivia-div').css('-moz-user-select', 'none');
	$('#trivia-div').css('-khtml-user-select', 'none');
	$('#trivia-div').css('-webkit-user-select', 'none');
	$('#trivia-div').css('-o-user-select', 'none');
}

/**
 * Shows the trivia below the multiply button.
 */
function showTriviaDiv() {
	/* Reverse the changes resulting from the invocation of hideTriviaDiv(). */
	$('#input-numbers').css('overflow-y', 'auto');
	$('#trivia-div').css('color', green);

	$('#trivia-div').css('user-select', 'none');
	$('#trivia-div').css('-moz-user-select', 'none');
	$('#trivia-div').css('-khtml-user-select', 'none');
	$('#trivia-div').css('-webkit-user-select', 'none');
	$('#trivia-div').css('-o-user-select', 'none');
}

/**
 * Checks if the all the fields for the operands are blank.
 *
 * @returns {boolean} `true` if all the fields for the operands are blank; `false`, otherwise.
 */
function allFieldsBlank() {
	return (
		$('#multiplicand-bin').val().length == 0 &&
		$('#multiplicand-dec').val().length == 0 &&
		$('#multiplier-bin').val().length == 0 &&
		$('#multiplier-dec').val().length == 0
	);
}
