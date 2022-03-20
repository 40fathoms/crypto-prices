import React from 'react'

const Crypto = (props) => {

    const [coinDetails, setCoinDetails] = React.useState("")

    function handleDetails() {
        (coinDetails.match(/details-visible/) === null) ?
            setCoinDetails("details-visible") :
            setCoinDetails("")
    }

    return (
        <div
            className={`coin ${coinDetails}`}
            onClick={handleDetails}
        >

            <div className="coin-content">
                <p className="coin-content-rank">{props.rank}</p>

                <img className="coin-content-icon" src={props.icon} />

                <p className="coin-content-name">{props.name} {(props.name !== props.symbol) && `(${props.symbol})`}</p>

                <p className="coin-content-mcap">$ {props.marketCap}</p>

                <p className="coin-content-price">$ {props.price}</p>
            </div>

            <div className={`coin-details ${coinDetails}`}>
                <ul>
                    <li>Price Change (1h):
                        <span
                            style={{ color: (props.priceChange1h >= 0) ? '#94D7A2' : '#F8BCBC' }}
                        > {props.priceChange1h} %</span>
                    </li>
                    <li>Price Change (1d):
                        <span
                            style={{ color: (props.priceChange1d >= 0) ? '#94D7A2' : '#F8BCBC' }}
                        > {props.priceChange1d} %</span>
                    </li>
                    <li>Price Change (1w):
                        <span
                            style={{ color: (props.priceChange1w >= 0) ? '#94D7A2' : '#F8BCBC' }}
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