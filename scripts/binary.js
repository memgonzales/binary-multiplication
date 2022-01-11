/**
 * File containing the utility functions for binary number operations.
 *
 * The methods here are purely mathematical in nature. For methods related to formatting binary numbers
 * and strings, refer to demo-util.js.
 */

/**
 * Converts a number to its 32-bit two's complement.
 *
 * This method does not place a leading zero on positive integers. For example, 6 is converted to 110.
 * As a form of differentiation, negative integers are represented using exactly 32 bits.
 * For example, -6 is converted to 11111111111111111111111111111010.
 *
 * @param {number} number Number to be converted to its 32-bit two's complement.
 * @returns {string} 32-bit two's complement of the given number.
 */
function toBinaryRaw(number) {
	/* Perform an arithmetic shift first to force two's complement. */
	return (number >>> 0).toString(2);
}

/**
 * Converts a number to its two's complement using the fewest number of bits.
 *
 * This method places a leading zero on positive integers. A special case is the smallest representable
 * n-bit signed number, that is, -2^n - 1, which is represented as 1 followed by (n-1) zeroes.
 *
 * @param {number} number Number to be converted to its two's complement using the fewest number of bits.
 * @returns {string} Two's complement of the given number using the fewest number of bits.
 */
function toBinary(number) {
	/* Designate the smallest representable signed number, that is, -2^MAX_NUM_BITS - 1, as a special case. */
	if (number == -1 * Math.pow(2, MAX_NUM_BITS - 1)) {
		let minBinary = '1';
		for (let i = 0; i < MAX_NUM_BITS - 1; i++) {
			minBinary = `${minBinary}0`;
		}

		return minBinary;
	}

	const binary = toBinaryRaw(number);

	/* Place a leading zero on positive integers. */
	if (number > 0) {
		return `0${binary}`;
	}

	/* Express negative numbers using the fewest number of bits. */
	const invBinary = toBinaryRaw(-1 * number);

	/* Subtract 1 since toBinaryRaw() does not place a leading zero */
	return binary.substring(binary.length - invBinary.length - 1);
}

/**
 * Converts a binary number to its signed decimal equivalent.
 *
 * This method converts the binary number 1 to -1.
 *
 * Precondition:
 * - The binary number should have less than or equal to 16 bits.
 *
 * @param {string} number Binary number to be converted to its signed decimal equivalent.
 * @returns {number} Decimal equivalent of the binary number.
 */
function toDecimalRaw(number) {
	const [decimal] = new Int16Array([`0b${number}`]);
	return decimal;
}

/**
 * Converts a binary number to its signed decimal equivalent.
 *
 * This method converts the binary number 1 to an empty string (instead of -1) to reduce ambiguity.
 *
 * Precondition:
 * - The binary number should have less than or equal to 16 bits.
 * - The number is captured as a string to isolate the special case (binary number '1') and differentiate it
 *   from other equivalents of the number 1 (e.g., binary number '01').
 *
 * @param {string} number Binary number to be converted to its signed decimal equivalent.
 * @returns {number} Decimal equivalent of the binary number, or empty string if the binary number is 1.
 */
function toDecimal(number) {
	/* Convert the binary number 1 to an empty string (instead of -1) to reduce ambiguity. */
	if (number == '1') {
		return '';
	}

	return toDecimalRaw(signExtend(number, MAX_NUM_BITS));
}

/**
 * Performs sign extension on a binary number.
 *
 * If the binary number has more bits than the specified number of bits, this method returns the number
 * without any modification.
 *
 * @param {string} number Binary number to be sign extended.
 * @param {number} numBits Number of bits after performing sign extension.
 * @returns {string} Sign-extended equivalent of the given binary number.
 */
function signExtend(number, numBits) {
	const numRemainingBits = numBits - number.length;

	let signExtended = number;
	let msb = number[0];

	for (let i = 0; i < numRemainingBits; i++) {
		signExtended = `${msb}${signExtended}`;
	}

	return signExtended;
}

/**
 * Truncates a binary number to the specified number of bits, discarding bits at the most significant side.
 *
 * Precondition:
 * - The number of bits in the binary number should be greater than or equal to the specified number of bits.
 *
 * @param {string} number Binary number to be truncated.
 * @param {number} numBits Number of bits after performing truncation.
 * @returns {string} Truncated binary number (with bits at the most significant side discarded).
 */
function truncate(number, numBits) {
	return number.substring(number.length - numBits);
}

/**
 * Expresses a binary number in the specified number of bits by performing either sign extension or truncation.
 *
 * @param {string} number Binary number to be expressed in the specified number of bits.
 * @param {number} numBits Number of bits after performing either sign extension or truncation.
 * @returns {string} Binary number expressed in the specified number of bits.
 */
function expressInNumBits(number, numBits) {
	if (number.length > numBits) {
		return truncate(number, numBits);
	}

	return signExtend(number, numBits);
}

/**
 * Expresses the two binary numbers using an equal number of bits by performing sign extension on the number
 * with fewer bits.
 *
 * @param {string} number1 First binary number.
 * @param {string} number2 Second binary number.
 * @returns {array} Array containing the two binary numbers expressed using an equal number of bits after performing
 * sign extension on the number with fewer bits.
 */
function equalizeBits(number1, number2) {
	const numBitsNumber1 = number1.length;
	const numBitsNumber2 = number2.length;

	const numBits = Math.max(numBitsNumber1, numBitsNumber2);

	return [signExtend(number1, numBits), signExtend(number2, numBits)];
}

/**
 * Multiplies two decimal numbers and expresses the result as a binary number in the specified number of bits.
 *
 * @param {number} multiplicandDec Decimal multiplicand.
 * @param {number} multiplierDec Decimal multiplier.
 * @param {number} numBits Number of bits of the product.
 * @returns {string} Product of the two decimal numbers expressed as a binary number in the specified number of bits.
 */
function multiply(multiplicandDec, multiplierDec, numBits) {
	return expressInNumBits(toBinary(multiplicandDec * multiplierDec), numBits);
}
