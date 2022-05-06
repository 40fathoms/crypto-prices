import React from 'react'

import LoadingSpinner from './LoadingSpinner'

import useHttp from '../hooks/useHttp'
import { updateWallet } from '../lib/api'


const SwapConfirm = ({ wallet, trade, buyAmount, resetSellId, handleAvailableFunds, sendRequestWallet }) => {


    // state to fetch the wallet data from the backend
    const { sendRequest: sendRequestSwap, status: statusSwap, error: errorSwap } = useHttp(updateWallet)

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
            sellAmount !== ("") &&
            sellAmount !== ("0") &&
            sellId !== "" &&
            buyId !== "" &&
            sellId !== buyId &&
            availableFunds === true
        ) {

            let currentWallet = [...wallet]

            // find the wallet index corresponding to sellId
            let sellIdIndex = currentWallet.findIndex(
                item => item.id === sellId
            )
            // subtracts the crypto sold 
            currentWallet[sellIdIndex].amount -= sellAmount


            // adds the bought crypto to the wallet

            // find the wallet index corresponding to buyId
            let buyIdIndex = currentWallet.findIndex(
                item => item.id === buyId
            )
            // if the coin is a new asset
            if (buyIdIndex === -1) {
                currentWallet.push(
                    {
                        name: buyName,
                        symbol: buySymbol,
                        icon: buyIcon,
                        id: buyId,
                        amount: buyAmount
                    }
                )
                sendRequestSwap(currentWallet)
            }
            // if the asset already exists
            else {
                currentWallet[buyIdIndex].amount += buyAmount
                sendRequestSwap(currentWallet)
            }
        }
        else {
            alert("Invalid transaction")
        }
    }

    React.useEffect(()=>{
        if(statusSwap === 'completed' && !errorSwap){
            sendRequestWallet()
        }
    },[statusSwap, errorSwap])

    if (statusSwap === 'loading') {
        return (
            <div className="swap-trade-confirm-loading">
                <LoadingSpinner />
            </div>
        )
    }

    if (errorSwap) {
        return (
            <p>{errorSwap}</p>
        )
    }

    return (
        <div className="swap-trade-confirm">

            {/* Invisible element that covers the button when
                    transactions are invalid */}
            {
                (trade.sellId === trade.buyId ||
                    trade.sellId === "" ||
                    trade.buyId === "" ||
                    trade.sellAmount === ("") ||
                    trade.sellAmount === ("0") ||
                    !handleAvailableFunds()) &&

                <div className="swap-trade-confirm-invalid"></div>
            }

            <button
                /* conditional rendering on the button's class
                changing if the transaction is invalid */
                className={`swap-trade-confirm-button ${(trade.sellId === trade.buyId ||
                    trade.sellId === "" ||
                    trade.buyId === "" ||
                    trade.sellAmount === ("") ||
                    trade.sellAmount === ("0") ||
                    !handleAvailableFunds()) ?

                    'invalid' : 'valid'
                    }`}

                onClick={(e) => {
                    handleWallet(
                        trade.sellId,
                        trade.buyId,
                        trade.buyName,
                        trade.buyIcon,
                        trade.buySymbol,
                        trade.sellAmount,
                        buyAmount(),
                        handleAvailableFunds()
                    );

                    resetSellId(e)
                }}
            >SWAP</button>

        </div>
    )
}

export default SwapConfirm