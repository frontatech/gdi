import React from 'react';
import service from '../../assets/img/service.jpg'
import service2 from '../../assets/img/service2.jpg'
import service3 from '../../assets/img/service3.jpg'
import service4 from '../../assets/img/service4.jpg'
import service5 from '../../assets/img/service5.jpg'
import service6 from '../../assets/img/service6.jpg'
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

const ServiceSectionOne = () => {
return (

  

<section className="my-5">

 <h2 className="text-capitalize font-weight-bold text-center border_design my-3">Our services</h2>
 
  

<Row>
<Col md="4 my-5">

<div className="card">


  <img className="card-img-top" src={service2} alt="Card image cap"/>


  <div className="card-body">

    <h4 className="card-title"><a>1</a></h4>
   
    <h3 className="card-text text-black  text-capitalize">Advocacy</h3>
  
   

  </div>

</div>

</Col>

<Col md="4 my-5">

<div className="card">


  <img className="card-img-top" src={service5} alt="Card image cap"/>


  <div className="card-body">

    <h4 className="card-title"><a>2</a></h4>
   
    <p className="card-text">Developing a world class, a grassroots initiative, good governance and development indicators</p>
  
    

  </div>

</div>

</Col>
<Col md="4 my-5">

<div className="card">


  <img className="card-img-top" src={service} alt="Card image cap"/>


  <div className="card-body">

    <h4 className="card-title"><a>3</a></h4>
   
    <p className="card-text">Mobilization,sentization, awareness and training</p>
  
 

  </div>

</div>

</Col>
</Row>
<Row>
<Col md="4">

<div className="card">


  <img className="card-img-top" src={service3} alt="Card image cap"/>


  <div className="card-body">

    <h4 className="card-title"><a>4</a></h4>
   
    <p className="card-text">Town Halls meetings</p>
  
   

  </div>

</div>

</Col>
<Col md="4">

<div className="card">


  <img className="card-img-top" src={service4} alt="Card image cap"/>


  <div className="card-body">

    <h4 className="card-title"><a>5</a></h4>
   
    <p className="card-text">Pre-election,election and post election interventions / monitoring</p>
  
   

  </div>

</div>

</Col>
<Col md="4">

<div className="card">


  <img className="card-img-top" src={service6} alt="Card image cap"/>


  <div className="card-body">

    <h4 className="card-title"><a>6</a></h4>
   
    <p className="card-text">Assessment and ratings</p>
  
   

  </div>


</div>

</Col>


</Row>

</section>


	)
}
export default ServiceSectionOne;