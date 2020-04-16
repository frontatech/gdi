import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import "admin/assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "admin/assets/scss/argon-dashboard-react.scss";
// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/nucleo-icons-page-styles.css";



import WrapperRouter from "components/WrapperRouter";
// pages for this kit
// import Index from "views/Index.js";
// import NucleoIcons from "views/NucleoIcons.js";
// import LoginPage from "views/examples/LoginPage.js";
// import LandingPage from "views/examples/LandingPage.js";
// import ProfilePage from "views/examples/ProfilePage.js";


const App = () => {
    return (
        <Router>
            <WrapperRouter />
        </Router>
    )
}

export default App

