import React, { Fragment, useState } from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import MainNavbar from './Navbars/MainNavbar'
import Home from './Home'
import About from './About'
import Gallery from './Gallery'
import Services from './Services'
import Contact from './Contact'
import FooterPage from './Footer'
import Blog from './Blog';
// import PostDetails from './blog/Post_Details';
// import { CourseProvider } from './course/CourseContext';
// import CourseDetails from './course/Course_Details';
import Login from './Login'
import Components from 'views/Index'
import AdminLayout from "../admin/layouts/Admin.js";
import AuthLayout from "../admin/layouts/Auth.js";
import Events from './Events'
import LoginPage from 'views/examples/LoginPage'
import ProfilePage from 'views/examples/ProfilePage'
import LandingPage from 'views/examples/LandingPage'
import Donate from './Donate'

const WrapperRouter = ({location}) => {
    const [mainSitePath, setMainSitePath] = useState(['/','/about-us','/blog','/our-services','/gallery','/management','/contact-us','/partnership','/events','/donate'])
    return (
        <Fragment>
            {mainSitePath.indexOf(location.pathname) > -1 ? <MainNavbar /> : (null)}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/components" component={Components} />
                <Route exact path="/about-us" component={About}/>
                <Route exact path="/blog" component={Blog} />
                <Route exact path="/events" component={Events} />
                <Route exact path="/gallery" component={Gallery}/>
                <Route exact path="/our-services" component={Services}/>
                <Route exact path="/contact-us" component={Contact}/>
                <Route exact path="/login-page" component={LoginPage} />
                <Route exact path="/profile" component={ProfilePage} />
                <Route exact path="/landing" component={LandingPage} />
                <Route exact path="/donate" component={Donate} />
                {/* <Route exact path="/post_details/:id" component={PostDetails} /> */}
                {/* <Route exact path="/course_details/:id" component={CourseDetails} /> */}
                {/* <Route exact path="/Login" component={Login} /> */}
                <Route path="/admin" render={props => <AdminLayout {...props} />} />
                <Route path="/auth" render={props => <AuthLayout {...props} />} />

            </Switch>
            {mainSitePath.indexOf(location.pathname) > -1 ? <FooterPage /> : (null)}
        </Fragment>
    )
}

export default withRouter(WrapperRouter)
