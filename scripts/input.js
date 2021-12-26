/**
 * File containing the function calls for the behaviors in the input area.
 */

$(function() {
    const operands = ['multiplicand', 'multiplier'];
    const bases = ['dec', 'bin'];

    for (const operand of operands) {
        for (const base of bases) {
            focusOperandBorder(operand, base);
        }

        decimalToBinary(operand);
        binaryToDecimal(operand);
    }
});