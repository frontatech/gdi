import React from 'react'
import BlogPosts from './Blog/BlogPosts'
import SectionVolunteer from './misc/SectionVolunteer'
import SectionHelp from './misc/SectionHelp'
import ScrollTop from './misc/ScrollTop'
import LandingPageHeader from './Headers/LandingPageHeader'

const Blog = ({location}) => {
    ScrollTop(location)
    return (
        <div className="wrapper">
        <LandingPageHeader title="Our Blog Posts" background={require("assets/img/bg9.jpg")} />
        <BlogPosts />
        <SectionVolunteer />
        <SectionHelp />
        </div>
    )
}

export default Blog
