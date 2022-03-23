import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { nanoid } from 'nanoid'

import Navbar from './components/Navbar'
import CryptoChart from './components/CryptoChart'
import Wallet from './components/Wallet'
import Swap from './components/Swap'

function App() {

  // state to handle the current crypto chart
  const [crypto, setCrypto] = React.useState([{}])

  // state to handle the wallet
  const [wallet, setWallet] = React.useState({
    "usd-coin": {
      name: "USD Coin",
      symbol: "USDC",
      icon: "https://static.coinstats.app/coins/usd-coiniGm.png",
      id: "usd-coin",
      amount: 52721.24
    }
  })

  // function to calculate the portfolio's value
  function valuePortfolio(wallet, crypto) {
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
  function valueIndividualCoin(id, amountCrypto, amountUSD, crypto) {
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
          key: nanoid()
        }
      })))

  }, [])

  // function to update the wallet state after each transaction
  function handleWallet(
    sellId,
    buyId,
    buyName,
    buyIcon,
    buySymbol,
    sellAmount,
    buyAmount,
    availableFunds
  ) {
  
    if (
      sellId !== "" &&
      buyId !== "" &&
      sellId !== buyId &&
      availableFunds === true
    ) {

      let currentWallet = { ...wallet }

      // subtracts the crypto sold 
      currentWallet[sellId].amount-=sellAmount

      // adds the bought crypto to the wallet
      // if the coin is a new asset
      if(currentWallet[buyId] === undefined) {
        Object.assign(currentWallet, {
          [buyId]: {
            name: buyName,
            symbol: buySymbol,
            icon: buyIcon,
            id: buyId,
            amount: buyAmount
          }
        })
  
        setWallet(currentWallet)
      }
      // if the asset already exists
      else{
        currentWallet[buyId].amount+=buyAmount
        setWallet(currentWallet)
      }
    }
    else {
      alert("Invalid transaction")
    }
  }

  return (
    <main>

      <Navbar />

      <Routes>

        <Route path="/" element={
          <CryptoChart
            crypto={crypto}
          />
        }
        />

        <Route path="/wallet" element={
          <Wallet
            crypto={crypto}
            wallet={wallet}
            valuePortfolio={valuePortfolio}
            valueIndividualCoin={valueIndividualCoin}
          />
        }
        />

        <Route path="/swap" element={
          <Swap
            crypto={crypto}
            wallet={wallet}
            valuePortfolio={valuePortfolio}
            valueIndividualCoin={valueIndividualCoin}
            handleWallet={handleWallet}
          />
        }
        />

      </Routes>

    </main>
  );
}

export default App;