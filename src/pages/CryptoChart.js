import React from 'react'
import { nanoid } from 'nanoid'

import Crypto from '../components/Crypto'
import LoadingSpinner from '../components/LoadingSpinner'

const CryptoChart = (props) => {

  if(props.crypto === null){
    return <LoadingSpinner />
  }

  const cryptocurrencies = (props.crypto).map(coin => {
    return (
      <Crypto
        key={nanoid()}
        name={coin.name}
        icon={coin.icon}
        symbol={coin.symbol}
        rank={coin.rank}
        price={coin.price}
        priceBtc={coin.priceBtc}
        marketCap={coin.marketCap}
        availableSupply={coin.availableSupply}
        totalSupply={coin.totalSupply}
        volume={coin.volume}
        priceChange1h={coin.priceChange1h}
        priceChange1d={coin.priceChange1d}
        priceChange1w={coin.priceChange1w}
      />
    )
  })

  if (props.statusCrypto === 'loading') {
    return (
      <LoadingSpinner />
    )
  }

  if (props.error) {
    return (
      <p>{props.error}</p>
    )
  }

  return (
    <section className="coins">

      <p className="coins-instructions">Select an asset to display more details.</p>

      <div className="tableHeader">
        <p className="tableHeader-rank hide-for-mobile">Rank</p>

        <p className="tableHeader-name">Assets</p>

        <p className="tableHeader-mcap">Market Cap</p>

        <p className="tableHeader-price">Price</p>
      </div>

      {cryptocurrencies}

    </section>
  )
}

export default CryptoChart