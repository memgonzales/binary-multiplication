function showTriviaExtendedBoothsUtil() {
    $('#trivia-header').text(extendedBoothsTriviaHeader);
    $('#trivia-body').html(extendedBoothsTrivia);
}

function showTriviaExtendedBooths() {
    $('#extended-booths-text').on('click', function() {
        showTriviaExtendedBoothsUtil();
    });
}