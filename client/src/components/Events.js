import React from 'react'
import EventPosts from './Events/EventPosts'
import SectionVolunteer from './misc/SectionVolunteer'
import SectionHelp from './misc/SectionHelp'
import ScrollTop from './misc/ScrollTop'
import LandingPageHeader from './Headers/LandingPageHeader'
const Events = ({location}) => {
    ScrollTop(location)
    return (
        <div className="wrapper">
        <LandingPageHeader title={"Our Events"} background={require("assets/img/header.jpg")}/>
        <EventPosts />
        <SectionVolunteer />
        <SectionHelp />
        </div>
    )
}

export default Events
