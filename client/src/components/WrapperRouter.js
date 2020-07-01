import React, { Fragment} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import MainNavbar from './Navbars/MainNavbar'
import Home from './Home'
import About from './About'
import Gallery from './Gallery'
import Services from './Services'
import Contact from './Contact'
import FooterPage from './Footer'
import Blog from './Blog';
import Components from 'views/Index'
import AdminLayout from "../admin/layouts/Admin.js";
import AuthLayout from "../admin/layouts/Auth.js";
import Events from './Events'
import LoginPage from 'views/examples/LoginPage'
import ProfilePage from 'views/examples/ProfilePage'
import LandingPage from 'views/examples/LandingPage'
import Donate from './Donate'
import PostDetails from './Blog/Post_details'
import {CommentProvider} from '../context/CommentContext'
import { PostProvider } from 'context/PostContext'
import { UserAuthProvider } from 'admin/context/UserAuthContext'
import { MembersProvider } from 'admin/context/MembersContext'
import { AdminPostsProvider } from 'admin/context/AdminPostsContext'

const WrapperRouter = ({location}) => {
    const mainSitePath = ['/','/about-us','/blog','/our-services','/gallery','/management','/contact-us','/partnership','/events','/donate','/post_details/','post_details']
    return (
        <Fragment>
            {mainSitePath.indexOf(location.pathname) > -1 ? <MainNavbar/> : mainSitePath.indexOf(location.pathname.split('/')[1]) > -1 ? <MainNavbar />: null}
            <Switch>
                <PostProvider>
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
                    <CommentProvider>
                        <Route exact path="/post_details/:slug" component={PostDetails} />
                    </CommentProvider>
                    <UserAuthProvider>
                        <MembersProvider>
                            <AdminPostsProvider>
                                <Route path="/admin" render={props => <AdminLayout {...props} />} />
                            </AdminPostsProvider>
                        </MembersProvider>
                        <Route path="/auth" render={props => <AuthLayout {...props} />} />
                    </UserAuthProvider>
                </PostProvider>
            </Switch>
            {mainSitePath.indexOf(location.pathname) > -1 ? <FooterPage/> : mainSitePath.indexOf(location.pathname.split('/')[1]) > -1 ? <FooterPage />: null}
        </Fragment>
    )
}

export default withRouter(WrapperRouter)
