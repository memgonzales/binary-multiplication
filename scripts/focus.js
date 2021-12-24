function focusOperandBorderUtilGreen(operand, base) {
    $('#' + operand + '-container').css('border-left', '3px solid ' + green);
}

function focusOperandBorderUtilGray(operand, base) {
    $('#' + operand + '-container').css('border-left', '3px solid ' + gray);
}

function focusOperandBorder(operand, base) {
    $('#' + operand + '-' + base).on('focus', function() {
        focusOperandBorderUtilGreen(operand, base);
    });

    $('#' + operand + '-' + base).on('blur', function() {
        focusOperandBorderUtilGray(operand, base); 
    });
}