import { abbreviateNumber } from './helperFunctions'

export async function getAllCrypto() {

    const response = await fetch(`https://api.coinstats.app/public/v1/coins?skip=0&limit=50`)

    if (!response.ok) {
        throw new Error(data.message || "Could not fetch data")
    }

    const data = await response.json()

    const allCrypto = []

    data.coins.forEach(item => {
        allCrypto.push({
            name: item.name,
            id: item.id,
            icon: item.icon,
            symbol: item.symbol,
            rank: item.rank,
            price: (item.price > 0.001) ? (item.price).toFixed(3) : (item.price),
            priceBtc: item.priceBtc,
            marketCap: abbreviateNumber(item.marketCap, 0),
            availableSupply: abbreviateNumber(item.availableSupply, 0),
            totalSupply: abbreviateNumber(item.totalSupply, 0),
            volume: item.volume,
            priceChange1h: item.priceChange1h,
            priceChange1d: item.priceChange1d,
            priceChange1w: item.priceChange1w,
        })
    })

    return allCrypto
}


export async function getWallet() {
    const response = await fetch(`https://crypto-app-ac377-default-rtdb.firebaseio.com/wallet.json`)

    if (!response.ok) {
        throw new Error(data.message || "Could not fetch data")
    }

    const data = await response.json()

    let walletData = []

    for (const key in data) {
        walletData.push({
            name: data[key].name,
            symbol: data[key].symbol,
            icon: data[key].icon,
            id: data[key].id,
            amount: data[key].amount
        })
    }

    return walletData
}

export async function updateWallet(walletData) {

    const response = await fetch(`https://crypto-app-ac377-default-rtdb.firebaseio.com/wallet.json`, {
        method: 'PUT',
        body: JSON.stringify(walletData),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        throw new Error(data.message || "Could not fetch data")
    }

    const data = await response.json()

}