import React from 'react'
import { nanoid } from 'nanoid'

import { valuePortfolio, valueIndividualCoin } from '../lib/helperFunctions'

import LoadingSpinner from '../components/LoadingSpinner'

const Wallet = (props) => {

  if (props.crypto === null || props.wallet === null) {
    return <LoadingSpinner />
  }

  // generating each crypto element in the wallet
  const walletKeys = Object.keys(props.wallet)

  const walletCoins = walletKeys.map(key => {

    let individualCoinValue = valueIndividualCoin(props.wallet[key].id, props.wallet[key].amount, 0, props.crypto).toFixed(4)

    if (individualCoinValue >= 0.01) {
      return (
        <div className="wallet-coin" key={nanoid()}>
          <img className="wallet-coin-icon" src={props.wallet[key].icon} alt="" />
          <p className="wallet-coin-amount">{props.wallet[key].amount.toFixed(8)} {props.wallet[key].name}</p>
          <p className="wallet-coin-usd">
            ${valueIndividualCoin(props.wallet[key].id, props.wallet[key].amount, 0, props.crypto).toFixed(4)}
          </p>
        </div>
      )
    }
    
  })

  if (props.statusWallet === 'loading') {
    return (
      <LoadingSpinner />
    )
  }

  if (props.errorWallet) {
    return (
      <p>{props.errorWallet}</p>
    )
  }

  return (
    <section className="wallet">
      <h2 className="wallet-portfolio">
        Portfolio Value: ${valuePortfolio(props.wallet, props.crypto)}
      </h2>

      <div className="wallet-coins">
        {walletCoins}
      </div>
    </section>
  )
}

export default Wallet