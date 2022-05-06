import React from 'react'
import { nanoid } from 'nanoid'

import LoadingSpinner from './LoadingSpinner'

import { valuePortfolio, valueIndividualCoin } from '../lib/helperFunctions'

const SwapPortfolio = (props) => {

    // generating each crypto element in the wallet
    const walletKeys = Object.keys(props.wallet)
    const swapWalletCoins = walletKeys.map(key => {

        let individualCoinValue = valueIndividualCoin(props.wallet[key].id, props.wallet[key].amount, 0, props.crypto).toFixed(4)

        if(individualCoinValue >= 0.01){
            return (
                <div className="swap-wallet-coin" key={nanoid()}>
                    <img className="swap-wallet-coin-icon" src={props.wallet[key].icon} alt="" />
                    <p className="swap-wallet-coin-amount">{props.wallet[key].amount.toFixed(8)} {props.wallet[key].symbol}</p>
                    <p className="swap-wallet-coin-usd">
                        ${valueIndividualCoin(props.wallet[key].id, props.wallet[key].amount, 0, props.crypto).toFixed(4)}
                    </p>
                </div>
            )
        }
        
    })

    if (props.statusWallet === 'loading') {
        return (
            <div className="swap-wallet">
                <LoadingSpinner />
            </div>
        )
    }

    if (props.errorWallet) {
        return (
            <p>{props.errorWallet}</p>
        )
    }

    return (
        <div className="swap-wallet">
            <h3>Portfolio value: ${valuePortfolio(props.wallet, props.crypto)}</h3>
            {swapWalletCoins}
        </div>
    )
}

export default SwapPortfolio