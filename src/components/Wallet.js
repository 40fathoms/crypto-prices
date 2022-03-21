import React from 'react'

const Wallet = (props) => {

  // function to calculate the portfolio's value
  function valuePortfolio(wallet, crypto){
    if(crypto[0].name === undefined){
      return 0
    }

    let portfolio = 0
    wallet.map(walletItem => {
      return crypto.map(item => {
        return (item.id === walletItem.id) ?
        portfolio+=(item.price*walletItem.amount) : portfolio+=0
      })
    })

    return portfolio.toFixed(4)
  }

  // function to calculate the value of any amount of an individual crypto
  function valueIndividualCoin(id, amount, crypto){ 
    if(crypto[0].name === undefined){
      return 0
    }

    // Gathers the price of the "id" (bitcoin, ethereum, etc)
    let currentCoinPrice = crypto.filter(item => item.id === id)[0].price
    // Returns how many dollars the amount of "id" is worth
    return currentCoinPrice*amount
  }

  // generating each crypto element in the wallet
  const walletCoins = props.wallet.map(item => {
    return (
      <div className="wallet-coin">
        <img className="wallet-coin-icon" src={item.icon} alt="" />
        <p className="wallet-coin-amount">{item.amount} {item.name}</p>
        <p className="wallet-coin-usd">
          ${valueIndividualCoin(item.id, item.amount, props.crypto)}
        </p>
      </div>
    )
  })

  return (
    <section className="wallet">
      <h2 className="wallet-portfolio">
        Portfolio: ${valuePortfolio(props.wallet, props.crypto)}
      </h2>

      <div className="wallet-coins">
        {walletCoins}
      </div>
    </section>
  )
}

export default Wallet