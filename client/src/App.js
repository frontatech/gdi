import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
// styles for this kit
import 'bootstrap-css-only/css/bootstrap.min.css'
import "./admin/assets/plugins/nucleo/css/nucleo.css";
import "./admin/assets/scss/argon-dashboard-react.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
// end of admin styles
// beginning of main site styles
// import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss";
import "./assets/demo/demo.css";
import "./assets/demo/nucleo-icons-page-styles.css";
import "./assets/css/app.css";

import WrapperRouter from "./components/WrapperRouter";
import {CookiesProvider} from 'react-cookie'

const App = () => {
    return (
        <Router>
            <CookiesProvider>
                <WrapperRouter />
            </CookiesProvider>        
        </Router>
    )
}

export default App

