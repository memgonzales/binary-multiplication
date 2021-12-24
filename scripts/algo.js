const mulMethods = ['pencil', 'booths', 'extended-booths'];

function showTriviaUtil(mulMethod) { 
    const index = mulMethods.indexOf(mulMethod);

    $('#trivia-header').text(triviaHeaders[index]);
    $('#trivia-body').html(trivia[index]);
}

function showTrivia(mulMethod) {
    $('#' + mulMethod + '-text').on('click', function() {
        showTriviaUtil(mulMethod);
    });

    $('#' + mulMethod + '-logo').on('click', function() {
        showTriviaUtil(mulMethod);
    });
}