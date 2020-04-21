import React from 'react'
import EventPosts from './Events/EventPosts'
import SectionVolunteer from './misc/SectionVolunteer'
import SectionHelp from './misc/SectionHelp'
import ScrollTop from './misc/ScrollTop'

const Events = ({location}) => {
    ScrollTop(location)
    return (
        <>
        <EventPosts />
        <SectionVolunteer />
        <SectionHelp />
        </>
    )
}

export default Events
