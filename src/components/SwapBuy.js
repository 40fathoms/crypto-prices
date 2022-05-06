import React from 'react'
import Select from 'react-select'

const SwapBuy = ({cryptoOptions, handleBuy, buyAmount, buyAmountUSD}) => {
    return (
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
    )
}

export default SwapBuy