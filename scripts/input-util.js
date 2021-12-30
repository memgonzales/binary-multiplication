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
			$('#' + operand + '-dec')
				.val()
				.trim().length > 0
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
