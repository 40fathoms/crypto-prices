import React from 'react'

const Wallet = (props) => {

  // generating each crypto element in the wallet

  const walletKeys = Object.keys(props.wallet)

  const walletCoins = walletKeys.map(key => {
    return (
      <div className="wallet-coin">
        <img className="wallet-coin-icon" src={props.wallet[key].icon} alt="" />
        <p className="wallet-coin-amount">{props.wallet[key].amount} {props.wallet[key].name}</p>
        <p className="wallet-coin-usd">
          ${props.valueIndividualCoin(props.wallet[key].id, props.wallet[key].amount, 0, props.crypto).toFixed(4)}
        </p>
      </div>
    )
  })


  return (
    <section className="wallet">
      <h2 className="wallet-portfolio">
        Portfolio Value: ${props.valuePortfolio(props.wallet, props.crypto)}
      </h2>

      <div className="wallet-coins">
        {walletCoins}
      </div>
    </section>
  )
}

export default Wallet