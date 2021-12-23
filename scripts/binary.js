function toBinaryRaw(number) {
    return (number >>> 0).toString(2);
}

function toBinary(number) {
    if (number == -1 * Math.pow(2, 15)) {
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
    const [ decimal ] = new Int16Array([number]);
    return decimal;
}

function toDecimal(number) {
    
}