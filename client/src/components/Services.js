import React from 'react'
import IndexHeader from './Headers/IndexHeader'
import ScrollTop from './misc/ScrollTop'

const Services = ({location}) => {
    ScrollTop(location)
    return (
        <div className="wrapper">
            <IndexHeader />
        </div>

    )
}

export default Services
