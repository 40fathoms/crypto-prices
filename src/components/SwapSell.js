import React from 'react'
import Select from 'react-select'

const SwapSell = ({walletOptions, trade, handleSell, handleTradeUSD, handleAvailableFunds, sellAmountUSD}) => {
    return (
        <div className="swap-trade-sell">

            <h2>Sell</h2>

            <Select
                options={walletOptions}
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
    )
}

export default SwapSell