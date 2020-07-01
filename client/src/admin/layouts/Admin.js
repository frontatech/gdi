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
import React from "react";
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

class Admin extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
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
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "GDI";
  };
  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin",
            imgSrc: require("../assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            {this.getRoutes(routes)}
            <Route path="/admin/posts" component={AllPosts} />
            <Route path="/admin/post_details/:postId" component={AdminPostDetails}/>
            <Route path="/admin/edit-post/:postId" component={EditPost} />
            <Route path="/admin/members" component={Members} />
            <Route path="/admin/profile/:userId" component={UserProfile} />
            <Route path="/admin/edit-profile/:userId" component={EditProfile} />
            <Redirect from="*" to="/admin/home" />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Admin;
