import React from "react";
import about2 from '../assets/img/about2.jpg';
import pixicon from '../assets/img/pixicon.png';
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
    <>
      
      <div className="wrapper">
        <LandingPageHeader />
   <Container>
    <section className="my-5">    
<Row>

        <Col md="6">
     <img src={about2}class="img-fluid z-depth-1 animated rollIn reveal" alt="Responsive image"/>
                   </Col>
   <Col md="6">

 <h2 className="h1-responsive font-weight-bold text-uppercase mt-2">  
 WE ARE A GLOBAL LEADER WITHIN A WORLDWIDE MOVEMENT DEDICATED TO ENDING POVERTY</h2>

 <p className="blue-grey-text">

Lorem ipsum dolor sit amet, consectetur
 adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse 
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
  

  </Col>
          </Row>
          </section>
          </Container>
    <section className="my-5"> 
    <div className="jumbotron">
<Container>
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
    </Container>
       </div>  
             </section>

<section class="my-1">
<h2 className="text-capitalize font-weight-bold text-center border_design">aim and objectives</h2>
 
  


  <div class="row">


    <div class="col-md-4">


      <div class="row mb-3">


        <div class="col-2">
          <i class="fas fa-2x fa-flag-checkered deep-purple-text"></i>
        </div>
    

      
        <div class="col-10">
          <h5 class="font-weight-bold mb-3">International</h5>
          <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores
            nam, aperiam minima assumenda deleniti hic.</p>
        </div>


      </div>
  

  
      <div class="row mb-3">

       
        <div class="col-2">
          <i class="fas fa-2x fa-flask deep-purple-text"></i>
        </div>
     
  
        <div class="col-10">
          <h5 class="font-weight-bold mb-3">Experimental</h5>
          <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores
            nam, aperiam minima assumenda deleniti hic.</p>
        </div>


      </div>
 

      <div class="row mb-md-0 mb-3">


        <div class="col-2">
          <i class="fas fa-2x fa-glass-martini deep-purple-text"></i>
        </div>
     

        <div class="col-10">
          <h5 class="font-weight-bold mb-3">Relaxing</h5>
          <p class="grey-text mb-md-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit
            maiores nam, aperiam minima assumenda deleniti hic.</p>
        </div>
    

      </div>
 

    </div>



    <div class="col-md-4 text-center">
      <img class="img-fluid" src="https://mdbootstrap.com/img/Mockups/Transparent/Small/iphone-portfolio1.png"
        alt="Sample image"/>
    </div>
 
    <div class="col-md-4">


      <div class="row mb-3">


        <div class="col-2">
          <i class="far fa-2x fa-heart deep-purple-text"></i>
        </div>


  
        <div class="col-10">
          <h5 class="font-weight-bold mb-3">Beloved</h5>
          <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores
            nam, aperiam minima assumenda deleniti hic.</p>
        </div>
  

      </div>


      <div class="row mb-3">

        <div class="col-2">
          <i class="fas fa-2x fa-bolt deep-purple-text"></i>
        </div>
     

     
        <div class="col-10">
          <h5 class="font-weight-bold mb-3">Rapid</h5>
          <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores
            nam, aperiam minima assumenda deleniti hic.</p>
        </div>
     

      </div>
   
      <div class="row">

    
        <div class="col-2">
          <i class="fas fa-2x fa-magic deep-purple-text"></i>
        </div>
    

        <div class="col-10">
          <h5 class="font-weight-bold mb-3">Magical</h5>
          <p class="grey-text mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit
            maiores nam, aperiam minima assumenda deleniti hic.</p>
        </div>
 

      </div>
 

    </div>


  </div>


</section>

            

        <DefaultFooter />
      </div>
    </>
  );
}

export default About;
