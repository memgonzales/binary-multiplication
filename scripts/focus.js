/**
 * File containing the utility functions for focusing on an input field.
 */

/**
 * Changes the color of the vertical highlight of the division enclosing the input field
 * 
 * @param {string} operand Operand associated with the input field gaining focus.
 */
function focusOperandBorderUtil(operand, color) {
    $('#' + operand + '-container').css('border-left', '3px solid ' + color);
}

/**
 * Changes the color of the vertical highlight of the division enclosing the input field depending on whether
 * it receives or loses focus.
 * 
 * @param {string} operand Operand associated with the input field gaining focus.
 * @param {string} base Number base associated with the input field gaining focus.
 */
function focusOperandBorder(operand, base) {
    $('#' + operand + '-' + base).on('focus', function() {
        focusOperandBorderUtil(operand, green);
    });

    $('#' + operand + '-' + base).on('blur', function() {
        focusOperandBorderUtil(operand, gray); 
    });
}