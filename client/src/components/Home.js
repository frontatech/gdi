import React, { Fragment } from 'react'
import HomeCarousel from './misc/HomeCarousel'
import HomeSection from './misc/HomeSection'
import HomeSection1 from './misc/HomeSection1'

const Home = () => {
    return (
        <Fragment>
            
            <HomeCarousel />
            <HomeSection1 />
            <HomeSection />
        </Fragment>
    )
}

export default Home
