/**
 * File containing the function for animating the logo and title at website startup.
 */

/**
 * Animates the logo and title. In particular, this method changes the color of the logo and the title,
 * as well as sets the title to random (hardcoded) binary strings.
 */
function animateTitle() {
	const timer = 125;

	$('#title-logo').attr('src', 'assets/title.PNG');
	$('#title-text').text('10111010101');
	$('#title-text').css('color', yellow);

	setTimeout(function () {
		$('#title-text').text('01110101010');
		$('#title-text').css('color', white);
	}, timer);

	setTimeout(function () {
		$('#title-logo').attr('src', 'assets/title-yellow.png');
		$('#title-text').text('00101101010');
		$('#title-text').css('color', yellow);
	}, 2 * timer);

	setTimeout(function () {
		$('#title-text').text('110101010101');
		$('#title-text').css('color', white);
	}, 3 * timer);

	setTimeout(function () {
		$('#title-logo').attr('src', 'assets/title.PNG');
		$('#title-text').text('100101010011');
		$('#title-text').css('color', yellow);
	}, 4 * timer);

	setTimeout(function () {
		$('#title-text').text('110001110010');
		$('#title-text').css('color', white);
	}, 5 * timer);

	setTimeout(function () {
		$('#title-logo').attr('src', 'assets/title-yellow.png');
		$('#title-text').html(
			'BINARY<span style = "margin-left: 11px;"></span>MULTIPLICAT<span class = "code">10</span>N'
		);
		$('.code').css('font-size', '18px');
		$('.code').css('color', yellow);
	}, 6 * timer);

	setTimeout(function () {
		$('#title-logo').attr('src', 'assets/title.PNG');
		$('#title-text').html(
			'BINARY<span style = "margin-left: 11px;"></span>MULTIPLICATION'
		);
		$('.hidden').css('visibility', 'visible');

		$('#step-number-value').hide();
	}, 9 * timer);
}
