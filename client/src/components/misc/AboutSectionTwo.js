import React from 'react';
import pixicon from '../../assets/img/pixicon.png';
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
const AboutSectionTwo = () => {

	 return (
<section className="my-5"> 
    <div className="jumbotron">

    <Row>

  <Col md="4">
    <h3 className="text-uppercase font-weight-bold mission ">our mission</h3>
   <img src={pixicon}class="img-fluid z-depth-1" alt="Responsive image"/>
    <p className="black-text">
We work around the globe to save lives, defeat poverty and achieve social justice..</p>
                   </Col>
   <Col md="4">
  <h3 className="text-uppercase font-weight-bold mission ">our vision</h3>
   <img src={pixicon}class="img-fluid z-depth-1" alt="Responsive image"/>
    <p className="black-text">

We seek a world of hope, tolerance and social justice, where poverty has been overcome and all people live with dignity and security.</p>
  </Col>
   <Col md="4">

  <h3 className="text-uppercase font-weight-bold mission ">our value</h3>
   <img src={pixicon}class="img-fluid z-depth-1" alt="Responsive image"/>
 <p className="black-text">

We believe in urgent action, innovation, 
and the necessity of transformation—within the world and our own organization.</p>
  </Col>


    </Row> 
    
       </div>  
             </section>
	 	)
}
export default AboutSectionTwo;