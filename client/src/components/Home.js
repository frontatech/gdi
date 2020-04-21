import React, { Fragment} from 'react'
import HomeCarousel from './misc/HomeCarousel'
import HomeSection from './misc/HomeSection'
import HomeSection1 from './misc/HomeSection1'
import SectionCoreValues from './misc/SectionCoreValues'
import SectionPartners from './misc/SectionPartners'
import SectionVolunteer from './misc/SectionVolunteer'
import RecentPosts from './Blog/RecentPosts'
import SectionHelp from './misc/SectionHelp'
import SectionManagers from './misc/SectionManagers'
import ScrollTop from './misc/ScrollTop'

const Home = ({location}) => {
    ScrollTop(location)
    return (
        <Fragment>
            <HomeCarousel />
            <HomeSection1 />
            <SectionCoreValues />
            <SectionVolunteer />
            <SectionPartners />
            <RecentPosts />
            <SectionHelp />
            <SectionManagers />
            <HomeSection />
        </Fragment>
    )
}

export default Home
