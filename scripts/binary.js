const numberBits = 16;

function toBinaryRaw(number) {
    return (number >>> 0).toString(2);
}

function toBinary(number) {
    if (number == -1 * Math.pow(2, numberBits - 1)) {
        return '1000000000000000';
    }

    const binary = toBinaryRaw(number);
    if (number > 0) {
        return '0'.concat(binary);
    }

    const invBinary = toBinaryRaw(-1 * number);
    return binary.substring(binary.length - invBinary.length - 1, binary.length);
}

function toDecimalRaw(number) {
    const [ decimal ] = new Int16Array(["0b".concat(number)]);
    return decimal;
}

function toDecimal(number) {
    if (number == 1) {
        return '';
    } else {
        return toDecimalRaw(signExtend(number));
    }
}

function signExtend(number) {
    const numRemainingBits = numberBits - number.length;

    let signExtended = number;
    let msb = number[0];
    for (let i = 0; i < numRemainingBits; i++) {
        signExtended = msb.concat(signExtended);
    }

    return signExtended;
}