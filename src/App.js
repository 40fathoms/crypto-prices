import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'

import CryptoChart from './pages/CryptoChart'
import Wallet from './pages/Wallet'
import Swap from './pages/Swap'

import useHttp from './hooks/useHttp'
import { getAllCrypto } from './lib/api'

function App() {

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

  // state to fetch the current crypto chart
  const { sendRequest: sendRequestCrypto, data: crypto, status: statusCrypto, error: errorCrypto} = useHttp(getAllCrypto)
  
  React.useEffect(()=>{
    sendRequestCrypto()
  },[sendRequestCrypto])





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
            statusCrypto={statusCrypto}
            error={errorCrypto}
          />
        }
        />

        <Route path="/wallet" element={
          <Wallet
            crypto={crypto}
            wallet={wallet}
          />
        }
        />

        <Route path="/swap" element={
          <Swap
            crypto={crypto}
            wallet={wallet}
            handleWallet={handleWallet}
          />
        }
        />

      </Routes>

    </main>
  );
}

export default App;