function toBinaryRaw(number) {
    return (number >>> 0).toString(2);
}

function toBinary(number) {
    if (number == -1 * Math.pow(2, MAX_NUM_BITS - 1)) {
        let minBinary = '1';
        for (let i = 0; i < MAX_NUM_BITS - 1; i++) {
            minBinary = `${minBinary}0`
        }

        return minBinary;
    }

    const binary = toBinaryRaw(number);
    if (number > 0) {
        return `0${binary}`;
    }

    const invBinary = toBinaryRaw(-1 * number);
    return binary.substring(binary.length - invBinary.length - 1, binary.length);
}

function toDecimalRaw(number) {
    const [decimal] = new Int16Array([`0b${number}`]);
    return decimal;
}

function toDecimal(number) {
    if (number == '1') {
        return '';
    }

    return toDecimalRaw(signExtend(number, MAX_NUM_BITS));
}

function signExtend(number, numBits) {
    const numRemainingBits = numBits - number.length;

    let signExtended = number;
    let msb = number[0];

    if (msb == '1') {
        for (let i = 0; i < numRemainingBits; i++) {
            signExtended = `${msb}${signExtended}`;
        }
    }

    return signExtended;
}