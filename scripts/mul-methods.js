/**
 * File containing the utility functions for the behaviors related to hovering over or selecting
 * the multiplication methods in the header and the elements in the footer.
 */

/**
 * Changes the color of elements associated with the multiplication method.
 *
 * @param {string} elem Multiplication method.
 * @param {string} color Color of elements associated with the multiplication method.
 */
function hoverElemUtil(elem, color) {
	if ($('#' + elem + '-text').attr('class') != 'selected') {
		if (color == white) {
			$('#' + elem + '-logo').attr('src', 'assets/' + elem + '.png');
		} else if (color == yellow) {
			$('#' + elem + '-logo').attr('src', 'assets/' + elem + '-yellow.png');
		}

		$('#' + elem + '-text').css('color', color);
	}
}

/**
 * Changes the color of elements associated with the multiplication method upon hover.
 *
 * @param {string} elem Multiplication method.
 */
function hoverSelectedElem(elem) {
	$('#' + elem + '-text').on('mouseover', function () {
		if ($('#' + elem + '-text').attr('class') != 'selected') {
			hoverElemUtil(elem, yellow);
		}
	});

	$('#' + elem + '-text').on('mouseout', function () {
		if ($('#' + elem + '-text').attr('class') != 'selected') {
			hoverElemUtil(elem, white);
		}
	});

	$('#' + elem + '-logo').on('mouseover', function () {
		if ($('#' + elem + '-text').attr('class') != 'selected') {
			hoverElemUtil(elem, yellow);
		}
	});

	$('#' + elem + '-logo').on('mouseout', function () {
		if ($('#' + elem + '-text').attr('class') != 'selected') {
			hoverElemUtil(elem, white);
		}
	});
}

/**
 * Changes the color of elements associated with the footer element upon hover.
 *
 * @param {string} elem Multiplication method.
 */
function hoverElem(elem) {
	$('#' + elem + '-text').on('mouseover', function () {
		hoverElemUtil(elem, yellow);
	});

	$('#' + elem + '-text').on('mouseout', function () {
		hoverElemUtil(elem, white);
	});

	$('#' + elem + '-logo').on('mouseover', function () {
		hoverElemUtil(elem, yellow);
	});

	$('#' + elem + '-logo').on('mouseout', function () {
		hoverElemUtil(elem, white);
	});
}

/**
 * Changes the color of elements associated with the selected multiplication method.
 *
 * @param {string} elems List of multiplication methods.
 * @param {string} clickedElem Selected multiplication method.
 */
function changeColorMulMethod(elems, clickedElem) {
	/* Remove the yellow color of the elements associated with all the multiplication methods before selection. */
	for (const elem of elems) {
		$('#' + elem + '-logo').attr('src', 'assets/' + elem + '.png');
		$('#' + elem + '-text').css('color', white);
		$('#' + elem + '-text').removeClass('selected');
	}

	$('#' + clickedElem + '-logo').attr('src', 'assets/' + clickedElem + '-yellow.png');
	$('#' + clickedElem + '-text').addClass('selected');
}

/**
 * Displays the trivia depending on the multiplication method index.
 *
 * @param {number} index Index of the multiplication method with respect to the mulMethods array in header.js.
 */
function showTrivia(index) {
	$('#trivia-header').text(triviaHeaders[index]);
	$('#trivia-body').html(trivia[index]);
}

/**
 * Displays the algorithm name depending on the multiplication method index.
 *
 * @param {number} index Index of the multiplication method with respect to the mulMethods array in header.js.
 */
function showAlgoName(index) {
	$('#algo-name').text(algoNames[index]);
	$('#algo-name').show();

	$('#algo-value').text(algoNames[index]);
}

/**
 * Displays the steps of the algorithm depending on the multiplication method index.
 *
 * @param {number} index Index of the multiplication method with respect to the mulMethods array in header.js.
 */
function showAlgoSteps(index) {
	$('#algo-steps').html(algoSteps[index]);
}

/**
 * Checks if the user has already entered a multiplicand and a multiplier and clicked the
 * Multiply button.
 *
 * @returns {boolean} `true` if the user has already entered a multiplicand and a multiplier and clicked the
 * Multiply button; `false`, otherwise.
 */
function noInput() {
	/* The hidden spans are updated in a single method; thus, it suffices to check only one of them. */
	return $('#multiplicand-bin-value').text().trim().length == 0;
}

/**
 * Changes the display depending on the selected multiplication method.
 *
 * @param {string} elems List of multiplication methods.
 * @param {string} clickedElem Selected multiplication method.
 */
function clickMulMethodUtil(elems, clickedElem) {
	const index = elems.indexOf(clickedElem);

	changeColorMulMethod(elems, clickedElem);
	showTrivia(index);
	showAlgoName(index);
	showAlgoSteps(index);

	/* Scroll back to the top. */
	window.scrollTo(0, 0);

	/*
	 * Failure to unbind will result in the repeated triggering of the click event (even with only
	 * a single click) when the user selects the same method again without refreshing the page.
	 */
	unbindClickCallback();

	if (noInput()) {
		noPreviousNextStep();
	} else {
		demoUtilStartAtDesc();
	}
}

/**
 * Starts the demonstration (simulation) at step 0 (that is, the description of the algorithm).
 */
function demoUtilStartAtDesc() {
	switch ($('#algo-value').text()) {
		case algoNames[0] /* Pencil-and-Paper Method */:
			break;

		case algoNames[1] /* Booth's Algorithm */:
			break;

		case algoNames[2] /* Extended Booth's Algorithm */:
			extendedBoothsDemo(
				$('#multiplicand-bin-value').text(),
				$('#multiplier-bin-value').text(),
				parseInt($('#multiplicand-dec-value').text()),
				parseInt($('#multiplier-dec-value').text())
			);

			/* Start at step 0 (description). */
			initStepNumber(0);
			extendedBoothsDescription();
			withPreviousAndNextStep();
			noPreviousStep();

			break;
		default:
			/* Should not cascade here */
			break;
	}

	if ($('#display-mode-text').text().trim() == 'Show All Steps') {
		showAllSteps();
		window.scrollTo(0, 0);
	}
}

/**
 * Changes the display depending on the selected multiplication method when either the name
 * or the icon of the said method is clicked.
 *
 * @param {string} elems List of multiplication methods.
 * @param {string} clickedElem Selected multiplication method.
 */
function clickMulMethod(elems, clickedElem) {
	const index = elems.indexOf(clickedElem);

	$('#' + clickedElem + '-text').on('click', function () {
		clickMulMethodUtil(elems, clickedElem);
	});

	$('#' + clickedElem + '-logo').on('click', function () {
		clickMulMethodUtil(elems, clickedElem);
	});
}
