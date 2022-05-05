import React from 'react'
import {nanoid} from 'nanoid'
import { valuePortfolio, valueIndividualCoin } from '../lib/helperFunctions'

const SwapPortfolio = (props) => {
    
    // generating each crypto element in the wallet
    const walletKeys = Object.keys(props.wallet)
    const swapWalletCoins = walletKeys.map(key => {
        return (
            <div className="swap-wallet-coin" key={nanoid()}>
                <img className="swap-wallet-coin-icon" src={props.wallet[key].icon} alt="" />
                <p className="swap-wallet-coin-amount">{props.wallet[key].amount} {props.wallet[key].symbol}</p>
                <p className="swap-wallet-coin-usd">
                    ${valueIndividualCoin(props.wallet[key].id, props.wallet[key].amount, 0, props.crypto).toFixed(4)}
                </p>
            </div>
        )
    })
    
    return (
        <div className="swap-wallet">
            <h3>Portfolio value: ${valuePortfolio(props.wallet, props.crypto)}</h3>
            {swapWalletCoins}
        </div>
    )
}

export default SwapPortfolio