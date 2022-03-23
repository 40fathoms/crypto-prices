import React from 'react'
import Select, { components } from 'react-select'

const Swap = (props) => {

    // generating each crypto element in the wallet
    const walletKeys = Object.keys(props.wallet)
    const swapWalletCoins = walletKeys.map(key => {
        return (
            <div className="swap-wallet-coin">
                <img className="swap-wallet-coin-icon" src={props.wallet[key].icon} alt="" />
                <p className="swap-wallet-coin-amount">{props.wallet[key].amount} {props.wallet[key].symbol}</p>
                <p className="swap-wallet-coin-usd">
                    ${props.valueIndividualCoin(props.wallet[key].id, props.wallet[key].amount, 0, props.crypto).toFixed(4)}
                </p>
            </div>
        )
    })



    //console.log(props.wallet)



    /*props.wallet.map(item => {
        return (
            <div className="wallet-coin">
                <img className="wallet-coin-icon" src={item.icon} alt="" />
                <p className="wallet-coin-amount">{item.amount} {item.name}</p>
                <p className="wallet-coin-usd">
                    ${props.valueIndividualCoin(item.id, item.amount, 0, props.crypto)}
                </p>
            </div>
        )
    })*/


    // generating the options menu on <Select />
    const cryptoOptions = []
    props.crypto.map(item => {
        cryptoOptions.push({
            label: item.name,
            id: item.id,
            value: item.price,
            icon: item.icon,
            symbol: item.symbol
        })
    })

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

                        onClick={(e) => props.handleWallet(
                            trade.sellId,
                            trade.buyId,
                            trade.buyName,
                            trade.buyIcon,
                            trade.buySymbol,
                            trade.sellAmount,
                            buyAmount(),
                            handleAvailableFunds()
                        )}
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

            {/* portfolio */}
            <div className="swap-wallet">
                <h3>Portfolio value: ${props.valuePortfolio(props.wallet, props.crypto)}</h3>
                {swapWalletCoins}
            </div>

        </section>
    )
}

export default Swap