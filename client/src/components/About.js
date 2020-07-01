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
import ScrollTop from "./misc/ScrollTop.js";

function About({location}) {
  ScrollTop(location)
  return (
   
      <div className="wrapper">
        <LandingPageHeader title={"About Us"} background={require("assets/img/bg6.jpg")} />
        <AboutSectionOne/>
        <AboutSectionTwo/>  
        <AboutSectionThree/>
      </div>
    
  );
}

export default About;
