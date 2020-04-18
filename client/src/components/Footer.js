import React from 'react'
import DarkFooter from './Footers/DarkFooter'

const FooterPage = () => {
    return (
        <DarkFooter />
    )
}

export default FooterPage
// import React from "react";
// import {Link} from 'react-router-dom'
// import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBNavItem, MDBNavLink,MDBNavbarNav, MDBAnimation } from "mdbreact";
// // import NewsLetter from "./misc/NewsLetter";

// const FooterPage = () => {
//   return (
//     <MDBFooter color="stylish-color-dark" className="page-footer font-small">
//       <MDBContainer fluid className="text-center text-md-left">
//         <MDBRow>
//           <MDBCol md="6">
//             <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
//               About <span className="yellow-color">Frontatech</span>
//             </h5>
//             <h6 className="font-weight text-justify">
//               We are a software development company focused on building & deploying both individual and enterprise sofware solutions ranging from E-learning apps, E-commerce sites and many more. We work hand in hand with our clients to deliver & provide elegant solutions. We help innovators to successfully build and lauch new companies by ensuring that we design, develop and deploy our apps based on user requirement. We help businesses create a wonderful and beautiful online presence. 
//             </h6>
//             <Link to="/contact-us" className="btn btn-contact btn-rounded">Get In Touch With Us</Link>
//           </MDBCol>
//           <hr className="clearfix w-100 d-md-none" />
//           <MDBCol md="2">
//             <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
//               QUICK LINKS 
//             </h5>
//             <MDBNavbarNav left>
//                 <MDBNavItem active>
//                   <MDBNavLink to="/">Home</MDBNavLink>
//                 </MDBNavItem>
            
                
//                 <MDBNavItem>
//                   <MDBNavLink to="/blog">Blog</MDBNavLink>
//                 </MDBNavItem>

//                 <MDBNavItem>
//                   <MDBNavLink to="/courses">Courses</MDBNavLink>
//                 </MDBNavItem>
                
//                 <MDBNavItem>
//                   <MDBNavLink to="/contact_us">Contact Us</MDBNavLink>
//                 </MDBNavItem>
//               </MDBNavbarNav>
//           </MDBCol>
//           <hr className="clearfix w-100 d-md-none" />
//           <MDBCol md="2">
//             <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
//               Company
//             </h5>
//             <MDBNavbarNav right>
//               <MDBNavItem>
//                   <MDBNavLink to="/about">About Us</MDBNavLink>
//               </MDBNavItem>
                
//               <MDBNavItem>
//                   <MDBNavLink to="/services">Services</MDBNavLink>
//               </MDBNavItem>
//               <MDBNavItem>
//                   <MDBNavLink to="/portfolio">Portfolio</MDBNavLink>
//                 </MDBNavItem>
//             </MDBNavbarNav>
//           </MDBCol>
//           <hr className="clearfix w-100 d-md-none" />
//           <MDBCol md="2">
//             <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
//               Office Hours
//             </h5>
//             <ul className="list-unstyled mb-0 justify-content-center">
//               <li className="mr-1">
//                 <address> Opening & Closing Hours</address> 
//               </li>
//               <li>
//                 <address> Monday - Friday</address>
//               </li>
//               <li className="ml-1">
//                 <address> 8:00 AM - 5PM</address> 
//               </li>
//             </ul>
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//       <hr />
//       <div className="text-center  py-3">
//         <h6>Contact Us</h6>
//         <ul className="list-unstyled list-inline mb-0 d-flex justify-content-center">
//           <li className="mr-1">
//              <address><span className="fa fa-heart yellow-color"></span> Greenpark, Abakaliki, Ebonyi State Nigeria </address> 
//           </li>
//           <li>
//              <address> <span className="fa fa-phone yellow-color"></span> +2348022821743, 
//             +2348145324529, +2348075627485</address>
//           </li>
//           <li className="ml-1">
//              <a href=":mail_to"><span className="fa fa-envelope yellow-color"></span> Frontatech@gmail.com</a> 
//           </li>
//         </ul>
//       </div>
//       <hr />
//       <div className="text-center">
//         <ul className="list-unstyled list-inline">
//           <li className="list-inline-item">
//             <a href="#!" className="btn-circle btn-floating btn-sm btn-fb mx-1">
//               <i className="fab fa-facebook-f"> </i>
//             </a>
//           </li>
//           <li className="list-inline-item">
//             <a href="#!" className="btn-circle btn-floating  btn-sm btn-tw mx-1">
//               <i className="fab fa-twitter"> </i>
//             </a>
//           </li>
//           <li className="list-inline-item">
//             <a href="#!" className="btn-circle btn-floating btn-sm btn-gplus mx-1">
//               <i className="fab fa-google-plus"> </i>
//             </a>
//           </li>
//           <li className="list-inline-item">
//             <a href="#!" className="btn-circle btn-floating btn-linkedin  btn-sm btn-li mx-1">
//               <i className="fab fa-linkedin-in"> </i>
//             </a>
//           </li>
          
//         </ul>
//       </div>
//       <div className="footer-copyright text-center py-3">
//         <MDBContainer fluid>
//           &copy; {new Date().getFullYear()} Copyright: <a href="https://www.Frontatech.com"> Frontatech.com </a>
//         </MDBContainer>
//       </div>
      
//          <MDBAnimation infinite type="bounce">
//          <a href="#top" className="btn-circle btn-floating btn-linkedin  btn-sm btn-li mx-1 btnTop">
//               <i className="fa fa-arrow-up"> </i>
//           </a>
//          </MDBAnimation>
//          {/* <NewsLetter /> */}
//     </MDBFooter>
//   );
// }

// export default FooterPage;
