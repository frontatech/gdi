import React from 'react'
import ContactUs from './misc/ContactUs'
import GMap from './misc/Map'

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


const Contact = () => {

  React.useEffect(() => {
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (

      
      <div className="wrapper">
        <LandingPageHeader title="Contact Us Below" background={require("assets/img/bg14.jpg")} />
        <Container>
        <ContactUs/>
        <GMap/>

        </Container>
        {/* <DefaultFooter /> */}
      </div>
  
  );
}

export default Contact;
