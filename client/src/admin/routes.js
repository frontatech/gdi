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
import Index from "./views/Home.js";
import Profile from "./views/examples/Profile.js";
import Maps from "./views/examples/Maps.js";
import Register from "./views/examples/Register.js";
import Login from "./views/examples/Login.js";
import Tables from "./views/examples/Tables.js";
import Icons from "./views/examples/Icons.js";
import AddPost from "./views/pages/AddPost.js";
import AddGDIMember from "./views/pages/AddGDIMember.js";
import AddEvent from "./views/pages/AddEvent.js";
import RequestFund from "./views/pages/RequestFund.js";
import AddAdmin from "./views/pages/AddAdmin.js";
import UploadPhotos from "./views/pages/UploadPhotos.js";

let routes = [
  {
    path: "/home",
    name: "Dashboard",
    icon: "ni ni-shop text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/add_post",
    name: "Add Post",
    icon: "ni ni-fat-add text-orange",
    component: AddPost,
    layout: "/admin"
  },
  {
    path: "/add_event",
    name: "Add Event",
    icon: "ni ni-calendar-grid-58 text-orange",
    component: AddEvent,
    layout: "/admin"
  },
  {
    path: "/add_member",
    name: "Add New GDI Member",
    icon: "ni ni-circle-08 text-orange",
    component: AddGDIMember,
    layout: "/admin"
  },
  {
    path: "/add_new_admin",
    name: "Add New Admin",
    icon: "ni ni-single-02 text-orange",
    component: AddAdmin,
    layout: "/admin"
  },
  {
    path: "/request_fund",
    name: "Request Fund",
    icon: "ni ni-bag-17 text-orange",
    component: RequestFund,
    layout: "/admin"
  },
  {
    path: "/send_newsletter",
    name: "Send Newsletter",
    icon: "ni ni-send text-orange",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/upload_photo",
    name: "Upload Photo",
    icon: "ni ni-image text-orange",
    component: UploadPhotos,
    layout: "/admin"
  },  
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/admin_users",
    name: "All Admin Users",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  }
];
export default routes;
