import { abbreviateNumber } from './helperFunctions'

export async function getAllCrypto() {

    const response = await fetch(`https://api.coinstats.app/public/v1/coins?skip=0&limit=50`)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Could not fetch data")
    }

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