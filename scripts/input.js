$(function() {
    $('#multiplicand-dec').on('keyup', function() {
        $('#multiplicand-bin').val(toBinary($('#multiplicand-dec').val()));
    });

    alert(toDecimalRaw(1001));
});