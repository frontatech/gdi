import React from 'react'
import IndexHeader from './Headers/IndexHeader'
import ServiceSectionOne from './misc/ServiceSectionOne'
import ContactUs from './misc/ContactUs'

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
import ScrollTop from './misc/ScrollTop';

function Services({location}) {
  ScrollTop(location)
  React.useEffect(() => {
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
 
      
      <div className="wrapper">
        <LandingPageHeader title={"Our Services"} background={require("assets/img/bg13.jpg")}/>
        <Container>
        <ServiceSectionOne/>
        <ContactUs/>
        </Container>
        <DefaultFooter />
      </div>

  );
}

export default Services;
