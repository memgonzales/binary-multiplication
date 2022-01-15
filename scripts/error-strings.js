const MAX_ERROR = `Should not exceed 2<sup>${MAX_NUM_BITS - 1}</sup> &ndash; 1 = ${
	Math.pow(2, MAX_NUM_BITS - 1) - 1
}<br>(largest ${MAX_NUM_BITS}-bit signed integer)`;

const MIN_ERROR = `Should not be less than &ndash;2<sup>${
	MAX_NUM_BITS - 1
}</sup> = &ndash;${Math.pow(2, MAX_NUM_BITS - 1)}<br>(smallest ${MAX_NUM_BITS}-bit signed integer)`;

const EXCEED_BITS = `Should not exceed ${MAX_NUM_BITS} bits<br>(Your input currently has`;

const INVALID_DEC = `Should be a decimal number`;
const INVALID_BIN = `Should be a binary number in two's complement`;

const AMBIGUOUS_BIN_1 = `This calculator accepts 16-bit two's complement:`;
const AMBIGUOUS_BIN_2 = `If you meant`;
const AMBIGUOUS_BIN_3 = ', enter';
