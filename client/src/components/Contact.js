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
import ExamplesNavbar from "./Navbars/ExamplesNavbar.js";
import LandingPageHeader2 from "./Headers/LandingPageHeader2.js";
import DefaultFooter from "./Footers/DefaultFooter.js";

const Contact = () => {
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
        <LandingPageHeader2 />
        <Container>
        <ContactUs/>
        <GMap/>

           </Container>
        <DefaultFooter />
      </div>
  
  );
}

export default Contact;
