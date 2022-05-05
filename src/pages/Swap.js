import React from 'react'
import { nanoid } from 'nanoid'
import Select from 'react-select'

import LoadingSpinner from '../components/LoadingSpinner'
import SwapPortfolio from '../components/SwapPortfolio'

const Swap = (props) => {

    // state that handles the crypto the user will sell and buy
    const [trade, setTrade] = React.useState({
        sellId: "",
        sellPrice: "",
        sellAmount: 0,

        buyId: "",
        buyName: "",
        buyIcon: "",
        buySymbol: "",
        buyPrice: "",
    })

    if (props.crypto === null) {
        return <LoadingSpinner />
    }



    // generating the options menu on <Select />
    const cryptoOptions = []
    props.crypto.forEach(item => {
        cryptoOptions.push({
            label: item.name,
            id: item.id,
            value: item.price,
            icon: item.icon,
            symbol: item.symbol
        })
    })



    //console.log(trade)

    // function that changes the crypto the user will sell
    function handleSell(e) {
        setTrade(prevTrade => {
            return {
                ...prevTrade,
                sellId: e.id,
                sellPrice: e.value,
                sellAmount: 0,
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
                sellAmount: 0,
            }
        })
    }

    // function that checks if the user has available funds
    function handleAvailableFunds() {
        if (props.wallet[trade.sellId]) {
            return parseFloat(trade.sellAmount) > parseFloat(props.wallet[trade.sellId].amount) ?
                false : true
        }
    }


    // function to calculate how much USD worth of crypto the user are selling
    function sellAmountUSD() {
        return (trade.sellId) ?
            props.valueIndividualCoin(trade.sellId, trade.sellAmount, 0, props.crypto)
            :
            0
    }

    // function to calculate how much crypto the user are buying with the value of sellAmountUSD()
    // 0.5% transaction fee is calculated here
    function buyAmount() {
        return (trade.buyId) ?
            props.valueIndividualCoin(trade.buyId, 0, sellAmountUSD(), props.crypto) * 0.995
            :
            0
    }

    // function to calculate how much USD the user will receive after transaction fees
    function buyAmountUSD() {
        return (trade.buyId) ?
            props.valueIndividualCoin(trade.buyId, buyAmount(), 0, props.crypto)
            :
            0
    }

    return (
        <section className="swap">

            <div className="swap-trade">

                <div className="swap-trade-sell">

                    <h2>Sell</h2>

                    <Select
                        options={cryptoOptions}
                        placeholder={"Sell Crypto"}
                        onChange={(e) => handleSell(e)}
                        className="swap-select"
                    />

                    <input
                        type="number"
                        min="0"
                        placeholder="0"
                        pattern="[0-9]"
                        inputMode="numeric"
                        value={trade.sellAmount}
                        onChange={(e) => { handleTradeUSD(e); handleAvailableFunds(trade.sellId, trade.sellAmount) }}
                    />

                    <h3>$ {sellAmountUSD().toFixed(4)}</h3>

                </div>

                <div className="swap-trade-buy">

                    <h2>Buy</h2>
                    <Select
                        options={cryptoOptions}
                        placeholder={"Buy Crypto"}
                        onChange={(e) => handleBuy(e)}
                        className="swap-select"
                    />

                    <input
                        type="number"
                        value={buyAmount()}
                        readOnly
                    />

                    <h3>$ {buyAmountUSD().toFixed(4)}</h3>
                    <p>0.5% transaction fees</p>

                </div>

                <div className="swap-trade-confirm">

                    {/* Invisible element that covers the button when
                    transactions are invalid */}
                    {
                        (trade.sellId === trade.buyId ||
                            trade.sellId === "" ||
                            trade.buyId === "" ||
                            !handleAvailableFunds()) &&

                        <div className="swap-trade-confirm-invalid"></div>
                    }

                    {/* conditional rendering on the button's class
                    changing if the transaction is invalid */}
                    <button
                        className={`swap-trade-confirm-button ${(trade.sellId === trade.buyId ||
                            trade.sellId === "" ||
                            trade.buyId === "" ||
                            !handleAvailableFunds()) ?

                            'invalid' : 'valid'
                            }`}

                        onClick={(e) => {
                            props.handleWallet(
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

                {/* warning texts about invalid transactions */}
                {
                    trade.sellId === trade.buyId &&
                    trade.sellId !== "" &&
                    trade.buyId !== "" &&
                    <p className='swap-trade-invalid-text'>Please select different coins</p>
                }
                {
                    !handleAvailableFunds() &&
                    trade.sellId !== "" &&
                    trade.buyId !== "" &&
                    <p className='swap-trade-invalid-text'>Insufficient balance</p>
                }

            </div>

            <SwapPortfolio
                crypto={props.crypto}
                wallet={props.wallet}
            />

        </section>
    )
}

export default Swap