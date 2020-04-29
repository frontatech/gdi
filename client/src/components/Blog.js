import React from 'react'
import BlogPosts from './Blog/BlogPosts'
import SectionVolunteer from './misc/SectionVolunteer'
import SectionHelp from './misc/SectionHelp'
import ScrollTop from './misc/ScrollTop'

const Blog = ({location}) => {
    ScrollTop(location)
    return (
        <>
        <BlogPosts />
        <SectionVolunteer />
        <SectionHelp />
        </>
    )
}

export default Blog
