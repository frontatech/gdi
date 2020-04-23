import React from 'react'
import ScrollTop from './misc/ScrollTop'
import contact from '../assets/img/contact.jpg';
import {
  Container,
  Row

} from "reactstrap";


const Contact = ({location}) => {
    ScrollTop(location)
    return (
      <Container>

<section class="my-5">

 
  <h2 class="h1-responsive font-weight-bold text-center my-5">Contact us</h2>
 

  <div class="row mt-5">

    <div class="col-md-6 mb-md-0 mb-5">

      <form>

      
        <div class="row">

         
          <div class="col-md-6">
            <div class="md-form mb-0">
              <input type="text" id="contact-name" class="form-control"/>
              <label for="contact-name" class="">Your name</label>
            </div>
          </div>
        
          <div class="col-md-6">
            <div class="md-form mb-0">
              <input type="text" id="contact-email" class="form-control"/>
              <label for="contact-email" class="">Your email</label>
            </div>
          </div>
        

        </div>
       
        <div class="row">

        
          <div class="col-md-12">
            <div class="md-form mb-0">
              <input type="text" id="contact-Subject" class="form-control"/>
              <label for="contact-Subject" class="">Subject</label>
            </div>
          </div>
        

        </div>

        <div class="row">

        
          <div class="col-md-12">
            <div class="md-form">
              <textarea id="contact-message" class="form-control md-textarea" rows="3"></textarea>
              <label for="contact-message">Your message</label>
            </div>
          </div>
       
        </div>


      </form>

      <div class="text-center text-md-left">
        <a class="btn btn-primary btn-md">Send</a>
      </div>

    </div>
    
    <div class="col-md-2 text-center">
      <ul class="list-unstyled mb-0">
        <li>
          <i class="fas fa-map-marker-alt fa-2x blue-text"></i>
          <p>San Francisco, CA 94126, USA</p>
        </li>
        <li>
          <i class="fas fa-phone fa-2x mt-4 blue-text"></i>
          <p>+ 01 234 567 89</p>
        </li>
        <li>
          <i class="fas fa-envelope fa-2x mt-4 blue-text"></i>
          <p class="mb-0">contact@example.com</p>
        </li>
      </ul>
    </div>
    <div class="col-md-4 text-center">
 <img src={contact}class="img-fluid z-depth-1" alt="Responsive image"/>
    </div>
  
  </div>
 

</section>
</Container>
    )
}

export default Contact
