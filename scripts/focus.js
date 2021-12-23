function focusOperandBorder(operand, base) {
    $('#' + operand + '-' + base).on('focus', function() {
        $('#' + operand + '-container').css('border-left', '3px solid ' + green);
    });

    $('#' + operand + '-' + base).on('blur', function() {
        $('#' + operand + '-container').css('border-left', '3px solid ' + gray);
    });
}