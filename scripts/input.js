/**
 * File containing the function calls for the behaviors in the input area.
 */

$(function () {
	const operands = ['multiplicand', 'multiplier'];
	const bases = ['dec', 'bin'];

	/* Handle the case where the tab was accidentally closed but restored along with valid input operands. */
	if (canMultiply()) {
		$('#multiply').attr('disabled', false);
	}

	for (const operand of operands) {
		for (const base of bases) {
			focusOperandBorder(operand, base);
		}

		decimalToBinary(operand);
		binaryToDecimal(operand);
	}
});
