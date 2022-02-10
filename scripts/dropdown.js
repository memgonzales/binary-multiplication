/**
 * File containing the utility functions for the display mode dropdown.
 */

/**
 * Global variable to track if the display mode dropdown is open.
 */
let isDropdownOpen = false;

/**
 * Changes the color of elements associated with the display mode.
 *
 * @param {string} elem Display mode.
 * @param {string} color Color of elements associated with the display mode.
 */
function hoverDropdownUtil(elem, color) {
	$('#' + elem + '-dropdown').css('color', color);
	$('#' + elem + '-text').css('color', color);
}

/**
 * Changes the color of elements associated with the display mode upon hover.
 *
 * @param {string} elem Display mode.
 */
function hoverDropdown(elem) {
	$('#' + elem + '-text').on('mouseover', function () {
		hoverDropdownUtil(elem, yellow);
	});

	$('#' + elem + '-text').on('mouseout', function () {
		hoverDropdownUtil(elem, white);
	});

	$('#' + elem + '-dropdown').on('mouseover', function () {
		hoverDropdownUtil(elem, yellow);
	});

	$('#' + elem + '-dropdown').on('mouseout', function () {
		hoverDropdownUtil(elem, white);
	});
}

/**
 * Toggles the visibility of the display mode dropdown content.
 *
 * @param {string} elem Display mode.
 */
function controlDropdownUtil(elem) {
	if (!isDropdownOpen) {
		$('#' + elem + '-content').css('display', 'block');
	} else {
		$('#' + elem + '-content').css('display', 'none');
	}

	isDropdownOpen = !isDropdownOpen;
}

/**
 * Toggles the visibility of the display mode dropdown content upon click.
 *
 * @param {string} elem Display mode.
 */
function controlDropdown(elem) {
	$('#' + elem + '-text').on('click', function () {
		controlDropdownUtil(elem);
	});

	$('#' + elem + '-dropdown').on('click', function () {
		controlDropdownUtil(elem);
	});

	/* Change the display mode. */
	clickDropdown(elem);

	/* Close the dropdown content when focus is lost. */
	$('html').on('click', function (e) {
		if (canCloseDropdown(e, elem, isDropdownOpen)) {
			$('#' + elem + '-content').css('display', 'none');
			isDropdownOpen = false;
		}
	});
}

/**
 * Checks if the display mode dropdown content should be closed by the click event.
 *
 * @param {event} e Click event.
 * @param {string} elem Display mode.
 * @param {boolean} isDropdownOpen `true` if the display mode dropdown content is open; `false`, otherwise.
 * @returns {boolean} `true` if the display mode dropdown content should be closed by the click event; `false`, otherwise.
 */
function canCloseDropdown(e, elem, isDropdownOpen) {
	return (
		!$(e.target).is($('#' + elem + '-option')) &&
		!$(e.target).is($('#' + elem + '-text')) &&
		!$(e.target).is($('#' + elem + '-dropdown')) &&
		isDropdownOpen
	);
}

/**
 * Changes the display mode depending on the option clicked.
 *
 * @param {string} elem Display mode.
 */
function clickDropdown(elem) {
	$('#' + elem + '-option').on('click', function () {
		const currentOption = $('#' + elem + '-text').text();
		const selectedOption = $('#' + elem + '-option').text();

		/* Close the dropdown content before changing the display mode for smoother visual feedback. */
		$('#' + elem + '-content').css('display', 'none');
		$('#' + elem + '-text').text(selectedOption);
		$('#' + elem + '-option').text(currentOption);

		isDropdownOpen = false;

		/* Show playback controls. */
		$('#playback-control').css('visibility', 'visible');

		$('#prev-step').show();
		$('#next-step').show();
		demoUtil();

		/* Return to the description. */
		$('#prev-step').trigger('click');

		/* Do nothing if the multiply button is not yet clicked. */
		const saveCursor = $('#save-text').css('cursor');
		if (saveCursor == 'not-allowed') {
			$('#next-step').css('visibility', 'hidden');
		} else {
			if ($('#display-mode-text').text().trim() == 'Show All Steps') {
				showAllSteps();
				window.scrollTo(0, 0);
				$('#playback-control').css('visibility', 'hidden');
				$('#prev-step').css('visibility', 'hidden');
			}
		}
	});
}
