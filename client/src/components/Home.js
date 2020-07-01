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
import ContactUs from './misc/ContactUs'
import { Card } from 'reactstrap'
import SectionCommitted from './misc/SectionCommitted'
import SectionTestimony from './misc/SectionTestimony'
import LandingPageHeader from './Headers/LandingPageHeader'

const Home = ({location}) => {
    ScrollTop(location)
    return (
        <Fragment>
            {/* <HomeCarousel /> */}
            <LandingPageHeader title="Welcome To Grassroots Development Initiative" background={require("assets/img/gdi7.jpg")} subtitle="For Good Governance & Capacity Building" />
            <HomeSection1 />
            <SectionCoreValues />
            <SectionVolunteer />
            <SectionPartners />
            <RecentPosts />
            <SectionHelp />
            <SectionCommitted />
            <SectionManagers />
            <SectionTestimony />
            <Card>
            <ContactUs />
            </Card>
            {/* <HomeSection /> */}
        </Fragment>
    )
}

export default Home
