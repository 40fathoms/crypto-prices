import React from 'react'

const Crypto = (props) => {

    const [coinDetails, setCoinDetails] = React.useState(false)

    function handleDetails() {
        setCoinDetails(previous => !previous)
    }

    return (
        <div
            className={`coin ${coinDetails ? "details-visible" : ""}`}
            onClick={handleDetails}
        >

            <div className="coin-content">
                <p className="coin-content-rank">{props.rank}</p>

                <img className="coin-content-icon" src={props.icon} alt="" />

                <p className="coin-content-name">{props.name} {(props.name !== props.symbol) && `(${props.symbol})`}</p>

                <p className="coin-content-mcap">${props.marketCap}</p>

                <p className="coin-content-price">${props.price}</p>
            </div>

            <div className={`coin-details ${coinDetails ? "details-visible" : ""}`}>
                <ul>
                    <li>Price Change (1h):
                        <span
                            style={{
                                color: (props.priceChange1h >= 0) ? '#00FF00' : '#FF0000'
                            }}
                        > {props.priceChange1h} %</span>
                    </li>
                    <li>Price Change (1d):
                        <span
                            style={{
                                color: (props.priceChange1d >= 0) ? '#00FF00' : '#FF0000'
                            }}
                        > {props.priceChange1d} %</span>
                    </li>
                    <li>Price Change (1w):
                        <span
                            style={{
                                color: (props.priceChange1w >= 0) ? '#00FF00' : '#FF0000'
                            }}
                        > {props.priceChange1w} %</span>
                    </li>
                    <li>Available Supply: {props.availableSupply}</li>
                    <li>Total Supply: {props.totalSupply}</li>
                </ul>
            </div>

        </div>
    )
}

export default Crypto