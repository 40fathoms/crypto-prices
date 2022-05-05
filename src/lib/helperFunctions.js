// function to convert big numbers into shorter strings
export function abbreviateNumber(num, fixed) {
    if (num === null) { return null; } // terminate early
    if (num === 0) { return '0'; } // terminate early
    fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
    var b = (num).toPrecision(2).split("e"), // get power
        k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
        c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
        d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
        e = d + ['', ' K', ' M', ' B', ' T'][k]; // append power
    return e;
}

// function to calculate the portfolio's value
export function valuePortfolio(wallet, crypto) {
    if (crypto[0].name === undefined) {
        return 0
    }
    else if (!wallet) {
        return 0
    }

    let portfolio = 0

    Object.keys(wallet).map(key => {
        return crypto.map(item => {
            return (item.id === wallet[key].id) ?
                portfolio += (item.price * wallet[key].amount) : portfolio += 0
        })
    })

    return portfolio.toFixed(4)
}

// function to calculate the value of any amount of an individual crypto
export function valueIndividualCoin(id, amountCrypto, amountUSD, crypto) {
    if (crypto[0].name === undefined) {
        return 0
    }
    else if (amountUSD === 0) {
        // Gathers the price of the "id" (bitcoin, ethereum, etc)
        let currentCoinPrice = crypto.filter(item => item.id === id)[0].price
        // Returns how many dollars the amount of "id" crypto is worth
        return currentCoinPrice * amountCrypto
    }
    else if (amountCrypto === 0) {
        // Gathers the price of the "id" (bitcoin, ethereum, etc)
        let currentCoinPrice = crypto.filter(item => item.id === id)[0].price
        // Returns how many "id" crypto can be bought
        return amountUSD / currentCoinPrice
    }
}
