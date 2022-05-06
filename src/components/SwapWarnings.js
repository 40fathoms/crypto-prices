import React from 'react'

const SwapWarnings = ({trade, handleAvailableFunds}) => {
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

export default SwapWarnings