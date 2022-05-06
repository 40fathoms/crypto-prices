import React from 'react'
import { nanoid } from 'nanoid'

import LoadingSpinner from '../components/LoadingSpinner'
import SwapPortfolio from '../components/SwapPortfolio'

import { valueIndividualCoin } from '../lib/helperFunctions'
import SwapWarnings from '../components/SwapWarnings'
import SwapConfirm from '../components/SwapConfirm'
import SwapSell from '../components/SwapSell'
import SwapBuy from '../components/SwapBuy'

const Swap = (props) => {

    // state that handles the crypto the user will sell and buy
    const [trade, setTrade] = React.useState({
        sellId: "",
        sellPrice: "",
        sellAmount: "",

        buyId: "",
        buyName: "",
        buyIcon: "",
        buySymbol: "",
        buyPrice: "",
    })
    
    if (props.crypto === null || props.wallet === null) {
        return <LoadingSpinner />
    }


    // creating an array with the wallet assets ids
    const walletIds = []
    props.wallet.forEach(item => walletIds.push(item.id))

    // generating the options menu on <Select />
    const walletOptions = []
    const cryptoOptions = []
    props.crypto.forEach(item => {

        if (walletIds.includes(item.id)) {
            walletOptions.push({
                label: item.name,
                id: item.id,
                value: item.price,
                icon: item.icon,
                symbol: item.symbol
            })
        }

        cryptoOptions.push({
            label: item.name,
            id: item.id,
            value: item.price,
            icon: item.icon,
            symbol: item.symbol
        })
    })


    // function that changes the crypto the user will sell
    function handleSell(e) {
        setTrade(prevTrade => {
            return {
                ...prevTrade,
                sellId: e.id,
                sellPrice: e.value,
                sellAmount: "",
            }
        })
    }

    // function that changes the crypto the user will buy
    function handleBuy(e) {
        setTrade(prevTrade => {
            return {
                ...prevTrade,
                buyId: e.id,
                buyName: e.label,
                buyIcon: e.icon,
                buySymbol: e.symbol,
                buyPrice: e.value
            }
        })
    }

    // function that changes the amount of crypto to sell based on the user's input
    function handleTradeUSD(e) {
        setTrade(prevTrade => {
            return {
                ...prevTrade,
                sellAmount: e.target.value,
            }
        })
    }

    function resetSellId(e) {
        setTrade(prevTrade => {
            return {
                ...prevTrade,
                sellAmount: "",
            }
        })
    }

    // find the wallet index corresponding to sellId
    let walletIndex = props.wallet.findIndex(
        item => item.id === trade.sellId
    )
    // function that checks if the user has available funds
    function handleAvailableFunds() {
        if (props.wallet[walletIndex]) {
            return parseFloat(trade.sellAmount) > parseFloat(props.wallet[walletIndex].amount) ?
                false : true
        }
    }

    // function to calculate how much USD worth of crypto the user are selling
    function sellAmountUSD() {
        return (trade.sellId) ?
            valueIndividualCoin(trade.sellId, trade.sellAmount, 0, props.crypto)
            :
            0
    }

    // function to calculate how much crypto the user are buying with the value of sellAmountUSD()
    // 0.5% transaction fee is calculated here
    function buyAmount() {
        return (trade.buyId) ?
            valueIndividualCoin(trade.buyId, 0, sellAmountUSD(), props.crypto) * 0.995
            :
            0
    }

    // function to calculate how much USD the user will receive after transaction fees
    function buyAmountUSD() {
        return (trade.buyId) ?
            valueIndividualCoin(trade.buyId, buyAmount(), 0, props.crypto)
            :
            0
    }


    return (
        <section className="swap">

            <div className="swap-trade">

                <SwapSell
                    walletOptions={walletOptions}
                    trade={trade}
                    handleSell={handleSell}
                    handleTradeUSD={handleTradeUSD}
                    handleAvailableFunds={handleAvailableFunds}
                    sellAmountUSD={sellAmountUSD}
                />

                <SwapBuy
                    cryptoOptions={cryptoOptions}
                    handleBuy={handleBuy}
                    buyAmount={buyAmount}
                    buyAmountUSD={buyAmountUSD}
                />

                <SwapConfirm
                    wallet={props.wallet}
                    trade={trade}
                    buyAmount={buyAmount}
                    resetSellId={resetSellId}
                    handleAvailableFunds={handleAvailableFunds}
                    sendRequestWallet={props.sendRequestWallet}
                />

                {/* warning texts about invalid transactions */}
                <SwapWarnings
                    trade={trade}
                    handleAvailableFunds={handleAvailableFunds}
                />

            </div>

            <SwapPortfolio
                crypto={props.crypto}
                wallet={props.wallet}
                statusWallet={props.statusWallet}
                errorWallet={props.errorWallet}
            />

        </section>
    )
}

export default Swap