import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'

import CryptoChart from './pages/CryptoChart'
import Wallet from './pages/Wallet'
import Swap from './pages/Swap'

import useHttp from './hooks/useHttp'
import { getAllCrypto, getWallet } from './lib/api'

function App() {



  // state to fetch the current crypto chart
  const { sendRequest: sendRequestCrypto, data: crypto, status: statusCrypto, error: errorCrypto} = useHttp(getAllCrypto)
  
  // state to fetch the wallet data from the backend
  const { sendRequest: sendRequestWallet, data: wallet, status: statusWallet, error: errorWallet} = useHttp(getWallet)

  React.useEffect(()=>{
    sendRequestCrypto()
    sendRequestWallet()
  },[sendRequestCrypto])

  return (
    <main>

      <Navbar />

      <Routes>

        <Route path="/" element={
          <CryptoChart
            crypto={crypto}
            statusCrypto={statusCrypto}
            errorCrypto={errorCrypto}
          />
        }
        />

        <Route path="/wallet" element={
          <Wallet
            crypto={crypto}
            wallet={wallet}
            statusWallet={statusWallet}
            errorWallet={errorWallet}
          />
        }
        />

        <Route path="/swap" element={
          <Swap
            crypto={crypto}
            wallet={wallet}
            statusWallet={statusWallet}
            errorWallet={errorWallet}
            sendRequestWallet={sendRequestWallet}
          />
        }
        />

      </Routes>

    </main>
  );
}

export default App;