import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { nanoid } from 'nanoid'

import Navbar from './components/Navbar'
import Crypto from './components/Crypto'
import Wallet from './components/Wallet'

function App() {

  // state to handle the current crypto chart
  const [crypto, setCrypto] = React.useState([{}])

  // state to handle the wallet
  const [wallet, setWallet] = React.useState([
    {
      name: "Bitcoin",
      symbol: "BTC",
      icon: "https://static.coinstats.app/coins/Bitcoin6l39t.png",
      id: "bitcoin",
      amount: "1.46"
    },

    {
      name: "Ethereum",
      symbol: "ETH",
      icon: "https://static.coinstats.app/coins/EthereumOCjgD.png",
      id: "ethereum",
      amount: "0.97"
    }

  ])
  //console.log(crypto)

  // function to convert big numbers into shorter strings
  function abbreviateNumber(num, fixed) {
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

  React.useEffect(() => {

    fetch(`https://api.coinstats.app/public/v1/coins?skip=0&limit=50`)
      .then(res => res.json())
      .then(data => setCrypto(data.coins.map(item => {
        return {
          name: item.name,
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
          id: item.id,
          key: nanoid()
        }
      })))

  }, [])



  const cryptocurrencies = crypto.map(coin => {
    return (
      <Crypto
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

  return (
    <main>

      <Navbar />

      <Routes>

        <Route path="/" element={
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
        }
        />

        <Route path="/wallet" element={
          <Wallet
            crypto={crypto}
            wallet={wallet}
          />
        }
        />

      </Routes>

    </main>
  );
}

export default App;