function decimalToBinary(operand) {
    $('#' + operand + '-dec').on('keyup', function() {
        if ($('#' + operand + '-dec').val().trim().length > 0) {
            $('#' + operand + '-bin').val(toBinary($('#' + operand + '-dec').val()));
        } else {
            $('#' + operand + '-bin').val('');
        }
    });
}

function binaryToDecimal(operand) {
    $('#' + operand + '-bin').on('keyup', function() {
        if ($('#' + operand + '-bin').val().trim().length > 0) {
            $('#' + operand + '-dec').val(toDecimal($('#' + operand + '-bin').val()));
        } else {
            $('#' + operand + '-dec').val('');
        }
    });
}