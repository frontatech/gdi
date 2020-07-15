/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useRef } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "../Navbars/AdminNavbar.js";
import AdminFooter from "../Footers/AdminFooter.js";
import Sidebar from "../Sidebar/Sidebar.js";

import routes from "../routes.js";
import Members from "admin/views/pages/Members.js";
import UserProfile from "admin/views/pages/UserProfile.js";
import EditProfile from "admin/views/pages/EditProfile.js";
import AllPosts from "admin/views/pages/AllPosts.js";
import AdminPostDetails from "admin/views/pages/AdminPostDetails.js";
import EditPost from "admin/views/pages/EditPost.js";
import AllEvents from "admin/views/pages/AllEvents.js";
import AdminEventDetails from "admin/views/pages/AdminEventDetails.js";
import EditEvent from "admin/views/pages/EditEvents.js";
import ProtectedRoute from "admin/views/ProtectedRoute.js";
import Newsletter from "admin/views/pages/Newsletter.js";
import PhotoGallery from "admin/views/pages/PhotoGallery.js";
import Subscribers from "admin/views/pages/Subscribers.js";
import EditAdmin from "admin/views/pages/EditAdmin.js";

const Admin = props => {
  const mainContent = useRef(null)
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
    return () => {
      
    }
  }, [])
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <ProtectedRoute exact
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "GDI";
  };
    return (
      <>
        <Sidebar
          {...props}
          routes={routes}
          logo={{
            innerLink: "/admin",
            imgSrc: require("../assets/img/brand/gdi-logo.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref={mainContent}>
          <AdminNavbar
            {...props}
            brandText={getBrandText(props.location.pathname)}
          />
          <Switch>
            {getRoutes(routes)}
            {/* post routes */}
            <ProtectedRoute exact path="/admin/posts" component={AllPosts} />
            <ProtectedRoute exact path="/admin/post_details/:postId" component={AdminPostDetails}/>
            <ProtectedRoute exact path="/admin/edit_post/:postId" component={EditPost} />
            {/* event routes */}
            <ProtectedRoute exact path="/admin/events" component={AllEvents} />
            <ProtectedRoute exact path="/admin/event_details/:eventId" component={AdminEventDetails}/>
            <ProtectedRoute exact path="/admin/edit_event/:eventId" component={EditEvent} />
            {/* members routes */}
            <ProtectedRoute exact path="/admin/members" component={Members} />
            <ProtectedRoute exact path="/admin/profile/:userId" component={UserProfile} />
            <ProtectedRoute exact path="/admin/edit_profile/:userId" component={EditProfile} />
            <ProtectedRoute exact path="/admin/edit_admin/:adminId" component={EditAdmin} />
            {/* catch other routes */}
            {/* newsletter routes */}
            <ProtectedRoute exact path="/admin/send_newsletter/:type" component={Newsletter} />
            <ProtectedRoute exact path="/admin/subscribers" component={Subscribers} />
            {/* gallery */}
            <ProtectedRoute exact path="/admin/gallery" component={PhotoGallery} />
            <Redirect from="*" to="/admin/home" />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
}

export default Admin;
