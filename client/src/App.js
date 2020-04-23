import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import "./admin/assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./admin/assets/scss/argon-dashboard-react.scss";
// styles for this kit
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss";
import "./assets/demo/demo.css";
import "./assets/demo/nucleo-icons-page-styles.css";
import "./assets/css/app.css";

import WrapperRouter from "components/WrapperRouter";
import { PostProvider } from "context/PostContext";

const App = () => {
    return (
        <Router>
            <PostProvider>
                <WrapperRouter />
            </PostProvider>
            
        </Router>
    )
}

export default App

