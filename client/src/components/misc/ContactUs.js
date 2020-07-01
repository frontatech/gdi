import React from 'react';
import contact from '../../assets/img/contact.jpg';
import {

  Container,
  Row

} from "reactstrap";
const ContactUs = () => {
	return (
<div className="section section-tabs">
		<Container>

<section className="my-5">

 
  <h2 className="h1-responsive font-weight-bold text-center my-5">Contact us</h2>
  <div className="text-center">
                  <h3>Get In Touch</h3>
                </div>

  <div className="row mt-5">

    <div className="col-md-6 mb-md-0 mb-5">

      <form>

      
        <div className="row">

         
          <div className="col-md-6">
            <div className="md-form mb-0">
              <input type="text" id="contact-name" className="form-control" placeholder="Name"/>
             
            </div>
          </div>
        
          <div className="col-md-6">
            <div className="md-form mb-0">
              <input type="text" id="contact-email" className="form-control" placeholder="email"/>
             
            </div>
          </div>
        

        </div>
       
        <div className="row">

        
          <div className="col-md-12">
            <div className="md-form mb-0">
              <input type="text" id="contact-Subject" className="form-control" placeholder="subject"/>
            
            </div>
          </div>
        

        </div>

        <div className="row">

        
          <div className="col-md-12">
            <div className="md-form">
              <textarea id="contact-message" className="form-control md-textarea" rows="3" placeholder="message"></textarea>
            
            </div>
          </div>
       
        </div>


      </form>

      <div className="text-center text-md-left">
        <a className="btn btn-primary btn-md">Send</a>
      </div>

    </div>
    
    <div className="col-md-2 text-center">
      <ul className="list-unstyled mb-0">
        <li>
          <i className="fas fa-map-marker-alt fa-2x blue-text"></i>
          <p>No. 5 Amagu Street besides Unity Square, Abakaliki, Ebonyi State, Nigeria</p>
        </li>
        <li>
          <i className="fas fa-phone fa-2x mt-4 blue-text"></i>
          <p>+234-8122821743, +234-8108240924</p>
        </li>
        <li>
          <i className="fas fa-envelope fa-2x mt-4 blue-text"></i>
          <p className="mb-0">Gdinitiative@gmail.com</p>
        </li>
      </ul>
    </div>
    <div className="col-md-4 text-center">
 <img src={contact} className="img-fluid z-depth-1" alt="Responsive contact side pane"/>
    </div>
  
  </div>
 

</section>




</Container>
</div>
)
}
export default ContactUs;