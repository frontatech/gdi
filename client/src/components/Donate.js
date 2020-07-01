import React from 'react'
import ScrollTop from './misc/ScrollTop'
import CausesPosts from './Causes/CausesPosts'
import LandingPageHeader from './Headers/LandingPageHeader'

const Donate = ({location}) => {
    ScrollTop(location)
    return (
        <div className="wrapper">
            <LandingPageHeader title="Causes" background={require("assets/img/bg12.jpg")} />
            <CausesPosts />            
        </div>

    )
}

export default Donate
