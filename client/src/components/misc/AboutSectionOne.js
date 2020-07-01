import React from 'react';
import about2 from '../../assets/img/about2.jpg';
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

const AboutSectionOne = () => {

return(
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
Grassroots Development Initiative GDI was found registered with the Cooperate Affairs Commision in the year 2018 as an NGO/CSO. 
The vision of the initiative afflict was to intervent and galvanize and support to promote good governance in Nigeria and 
beyound. GDI founding members noted the contribution of many international Agencies who have contributed all over the world that gives rise to good governance and decided to
low to their lives and domesticate same in Nigeria. GDI intend to propagate the basic ingredients of good governance such as participation, equity and inclusiveness, rules of law, seperation of power, free independent and responsible
media, government legitimacy, accountability, transparency, limiting the distorting effects of money in politics and corruption.
</p>
<p className="blue-grey-text">We intend to achieve the above through sensitization advocay and partnership with international agencies. GDI has members across Nigeria and with international membership being coordinated in the USA and United Kingdom</p>
  </Col>
          </Row>
          </section>
          </Container>
	)

}
   export default AboutSectionOne;