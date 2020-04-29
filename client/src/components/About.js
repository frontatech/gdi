import React from "react";
import AboutSectionOne from './misc/AboutSectionOne';
import AboutSectionTwo from './misc/AboutSectionTwo';
import AboutSectionThree from './misc/AboutSectionThree';

// reactstrap components
import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
// core components
import LandingPageHeader from "./Headers/LandingPageHeader.js";
import DefaultFooter from "./Footers/DefaultFooter.js";
import ScrollTop from "./misc/ScrollTop.js";

function About({location}) {
  ScrollTop(location)
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
   
      <div className="wrapper">
        <LandingPageHeader />
        <AboutSectionOne/>
        <AboutSectionTwo/>  
        <AboutSectionThree/> 


            

        <DefaultFooter />
      </div>
    
  );
}

export default About;
