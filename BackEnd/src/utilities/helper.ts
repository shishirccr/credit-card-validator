export function luhnCheckSum(value) {
    let nCheck = 0,
        nDigit = 0,
        bEven = false;

    for (let n = value.length - 1; n >= 0; n--) {
        let cDigit = value.charAt(n);
        nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }

    return nCheck % 10 == 0;
}