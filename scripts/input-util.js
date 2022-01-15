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
			$('#' + operand + '-bin')
				.val()
				.trim().length > 0
		) {
			$('#' + operand + '-dec').val(
				toDecimal($('#' + operand + '-bin').val())
			);
		} else {
			$('#' + operand + '-dec').val('');
		}
	});
}

function isSignOnly(value) {
	return value.trim() == '+' || value.trim() == '-';
}

function isValidDec(inputField, operand, value) {
	const pattern = /^(-|\+)?(\d+)?$/;
	if (!pattern.test(value)) {
		$(inputField).val(value.slice(0, -1));
		return false;
	}

	if (parseInt(value) > Math.pow(2, MAX_NUM_BITS - 1) - 1) {
		$('#' + operand + '-error > p').html(MAX_ERROR);
		return false;
	}

	if (parseInt(value) < -1 * Math.pow(2, MAX_NUM_BITS - 1)) {
		$('#' + operand + '-error > p').html(MIN_ERROR);
		return false;
	}

	if (value.length == 0) {
		$('#' + operand + '-error > p').html('');
		return false;
	}

	$('#' + operand + '-error > p').html('');
	return true;
}

function isValidBin(inputField, operand, value) {
	const pattern = /^[0-1]*$/;
	if (!pattern.test(value)) {
		$(inputField).val(value.slice(0, -1));
		return false;
	}

	if (value.length > MAX_NUM_BITS) {
		$('#' + operand + '-error > p').html(
			`${EXCEED_BITS} ${value.length} bits)`
		);
		return false;
	}

	if (value.length == 0) {
		$('#' + operand + '-error > p').html('');
		return false;
	}

	$('#' + operand + '-error > p').html('');
	return true;
}
