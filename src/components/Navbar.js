import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()
    const location = useLocation()

    function selectedStyle(boolean){
        if(boolean){
            return "selected"
        }
    }

    return (
        <nav className='nav-buttons'>
            <button
                onClick={() => navigate(`/`)}
                className={selectedStyle((location.pathname === "/"))}
            >Crypto Analytics</button>
            <button
                onClick={() => navigate(`/wallet`)}
                className={selectedStyle((location.pathname === "/wallet"))}
            >Wallet</button>
            <button
                onClick={() => navigate(`/swap`)}
                className={selectedStyle((location.pathname === "/swap"))}
            >Swap</button>
        </nav>
    )
}

export default Navbar