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
		if (
			isValidDec(
				$('#' + operand + '-dec'),
				operand,
				$('#' + operand + '-dec').val()
			) &&
			!isSignOnly($('#' + operand + '-dec').val())
		) {
			$('#' + operand + '-bin').val(
				toBinary($('#' + operand + '-dec').val())
			);
		} else {
			$('#' + operand + '-bin').val('');
		}

		if (canMultiply()) {
			$('#multiply').attr('disabled', false);
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
		if (
			isValidBin(
				$('#' + operand + '-bin'),
				operand,
				$('#' + operand + '-bin').val()
			)
		) {
			$('#' + operand + '-dec').val(
				toDecimal($('#' + operand + '-bin').val())
			);
		} else {
			$('#' + operand + '-dec').val('');
		}

		if (canMultiply()) {
			$('#multiply').attr('disabled', false);
		}
	});
}

function isSignOnly(value) {
	return value.trim() == '+' || value.trim() == '-';
}

function isValidDec(inputField, operand, value) {
	const pattern = /^(-|\+)?(\d+)?$/;
	if (!pattern.test(value)) {
		const slicedVal = value.slice(0, -1);

		if (pattern.test(slicedVal)) {
			$(inputField).val(slicedVal);
		} else {
			$('#' + operand + '-error > p').html(INVALID_DEC);
			$('#multiply').attr('disabled', true);
		}

		return false;
	}

	if (parseInt(value) > Math.pow(2, MAX_NUM_BITS - 1) - 1) {
		$('#' + operand + '-error > p').html(MAX_ERROR);
		$('#multiply').attr('disabled', true);
		return false;
	}

	if (parseInt(value) < -1 * Math.pow(2, MAX_NUM_BITS - 1)) {
		$('#' + operand + '-error > p').html(MIN_ERROR);
		$('#multiply').attr('disabled', true);
		return false;
	}

	if (value.length == 0) {
		$('#' + operand + '-error > p').html('');
		$('#multiply').attr('disabled', true);
		return false;
	}

	$('#' + operand + '-error > p').html('');
	return true;
}

function isValidBin(inputField, operand, value) {
	const pattern = /^[0-1]*$/;
	if (!pattern.test(value)) {
		const slicedVal = value.slice(0, -1);

		if (pattern.test(slicedVal)) {
			$(inputField).val(slicedVal);
		} else {
			$('#' + operand + '-error > p').html(INVALID_BIN);
			$('#multiply').attr('disabled', true);
			hideTriviaDiv();
		}

		return false;
	}

	if (value.length > MAX_NUM_BITS) {
		$('#' + operand + '-error > p').html(
			`${EXCEED_BITS} ${value.length} bits)`
		);
		$('#multiply').attr('disabled', true);
		hideTriviaDiv();
		return false;
	}

	if (value.length == 0) {
		$('#' + operand + '-error > p').html('');
		$('#multiply').attr('disabled', true);
		showTriviaDiv();
		return false;
	}

	$('#' + operand + '-error > p').html('');
	showTriviaDiv();
	return true;
}

function canMultiply() {
	return (
		isValidBin(
			$('#multiplicand-bin'),
			'multiplicand',
			$('#multiplicand-bin').val()
		) &&
		isValidBin(
			$('#multiplier-bin'),
			'multiplier',
			$('#multiplier-bin').val()
		)
	);
}

function hideTriviaDiv() {
	$('#input-numbers').css('overflow-y', 'hidden');
	$('#trivia-div').css('color', grayBg);
	$('#trivia-body i').hide();

	$('#trivia-div').css('user-select', 'none');
	$('#trivia-div').css('-moz-user-select', 'none');
	$('#trivia-div').css('-khtml-user-select', 'none');
	$('#trivia-div').css('-webkit-user-select', 'none');
	$('#trivia-div').css('-o-user-select', 'none');
}

function showTriviaDiv() {
	$('#input-numbers').css('overflow-y', 'auto');
	$('#trivia-div').css('color', green);
	$('#trivia-body i').show();

	$('#trivia-div').css('user-select', 'none');
	$('#trivia-div').css('-moz-user-select', 'none');
	$('#trivia-div').css('-khtml-user-select', 'none');
	$('#trivia-div').css('-webkit-user-select', 'none');
	$('#trivia-div').css('-o-user-select', 'none');
}
