import React from 'react'
import DonateMain from './misc/DonateMain'
import ScrollTop from './misc/ScrollTop'

const Donate = ({location}) => {
    ScrollTop(location)
    return (
        <div className="wrapper">
            <DonateMain />
        </div>

    )
}

export default Donate
