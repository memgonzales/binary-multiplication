$(function() {
    const operands = ['multiplicand', 'multiplier'];
    const bases = ['dec', 'bin'];

    for (const operand of operands) {
        for (const base of bases) {
            focusOperandBorder(operand, base);
        }
    }

    $('#multiplicand-dec').on('keyup', function() {
        if ($('#multiplicand-dec').val().trim().length > 0) {
            $('#multiplicand-bin').val(toBinary($('#multiplicand-dec').val()));
        } else {
            $('#multiplicand-bin').val('');
        }
    });
});