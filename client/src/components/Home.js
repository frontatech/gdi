import React, { Fragment } from 'react'
import HomeCarousel from './misc/HomeCarousel'
import HomeSection from './misc/HomeSection'
import HomeSection1 from './misc/HomeSection1'
import HomeSection2 from './misc/HomeSection2'
import HomeSection3 from './misc/HomeSection3'
import LatestPosts from './Blog/LatestPosts'
import HomeSection4 from './misc/HomeSection4'
import RecentPosts from './Blog/RecentPosts'
import HomeSection5 from './misc/HomeSection5'
import Managers from './misc/Managers'

const Home = () => {
    return (
        <Fragment>
            
            <HomeCarousel />
            <HomeSection1 />
            <HomeSection2 />
            <HomeSection4 />
            <HomeSection3 />
            <RecentPosts />
            <HomeSection5 />
            <Managers />
            <HomeSection />
        </Fragment>
    )
}

export default Home
