/*eslint-disable*/
import React,{useState} from "react";
import { Container, Row, Col,Input,Button,Navbar,
  NavItem,
  NavLink,
  Nav,} from "reactstrap";
import { Link } from "react-router-dom";
import axios from 'axios'
import { validateEmail } from "components/misc/helper";
function DarkFooter() {
  
const [username, setUsername] = useState('')
const [userEmail, setUserEmail] = useState('')
const [nameError, setNameError] = useState('')
const [emailError, setEmailError] = useState('')
const [loader, setLoader] = useState(false)
const updateEmail = (e) =>{
    setUserEmail(e.target.value)
    setEmailError('')
}
const resetFormInputs = () =>{
    setUserEmail('')
}
const resetFormInputErrors = (data) =>{
    setEmailError(data.emailError)
}

const handleSubmit = (e) =>{
    e.preventDefault()
    if(userEmail === "") {
      setEmailError("Enter Your Email Address")
      return
    }
    if(!validateEmail(userEmail)) {
      setEmailError("Enter A Valid Email Address")
      return
    }
    setLoader(true)
    resetFormInputErrors({emailError:'',nameError: ''})
    axios.post('/newsletter',{name:username,email:userEmail}).then(res =>{
        const data =  res.data
        setLoader(false)
        if(data.status){
            resetFormInputs()
            return setEmailError("Form Submitted Successfully")
        }
        resetFormInputErrors(data)
    }).catch(error =>{
        setEmailError("An error occurred, try again!")
        setLoader(false)
    })    
}
const handleNotification = (e) =>{
  e.preventDefault()
  alert("hello world")
}
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <Row>
          <Col lg="6">
            <h2 className="text-uppercase mb-4 font-weight-bold title">Subscribe To Our Newsletter</h2>
            <span className="text-yellow">Get the latest update about our NGO that we share once in a month.</span>
          </Col>
          <Col lg="6">
            <div className="d-flex d-inline mt-4">
              <Input className="form-control form-rounded mt-1" value={userEmail} onChange={updateEmail} placeholder="Enter Your Email Address" type="text"
                    size="sm"/>
              <Button
              className="btn-success btn-round"
              color="warning"
              type="submit"
              onClick={handleSubmit}
              size="sm">
              Subscribe
              </Button>
            </div>
            <span className="text-red">{emailError}</span>
          </Col>
        </Row>
        <hr/>
        <Row>
            
          <Col lg="4">
          <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
          <span className="text-yellow">About </span> Grassroots <span className="text-yellow"> Development</span> Initiative
            </h5>
            <p className="font-weight text-justify">
            Grassroots Development Initiative GDI was found & registered with the Cooperate Affairs Commision in the year 2018 as an NGO/CSO. The vision of the initiative afflict was to interven and galvanize and support to promote good governance in Nigeria and beyound. We intend to achieve the above through sensitization advocay and partnership with international agencies. GDI has members across Nigeria and with international membership being coordinated in the USA and United Kingdom
            </p>
          </Col>
          <Col lg="4">
          <h5 className="text-uppercase mb-4 mt-3 font-weight-bold text-yellow">
              Quick Links
              
            </h5>
            <ul className="d-inline-block">
                <li><Link to="/blog">Blog</Link></li><hr/>
                <li><Link to="/about-us">About Us</Link></li><hr/>
                <li><Link to="/donate">Donate</Link></li><hr/>
                <li><Link to="/contact-us">Contact Us</Link></li><hr/>
                <li><Link to="/events">Events</Link></li><hr/>
                <li><Link to="/our-services">Our Services</Link></li><hr/>
                <li><Link to="/gallery">Gallery</Link></li>
              </ul>
          </Col>
          <Col lg="4">
          <h5 className="text-uppercase mb-4 mt-3 font-weight-bold text-yellow">Contacts
            </h5>
            <address>
            <ul className="d-inline-block">
                <li>No. 5 Amagu Street besides Unity Square, Abakaliki, Ebonyi State, Nigeria</li><hr/>
                <li>gdinitiative@gmail.com</li><hr/>
                <li>+234-8022821743</li><hr/>
                <li>Follow Us On: </li>
              </ul>
            </address>
            <Nav className="ml-auto d-inline" navbar>
                    <NavItem>
                      <NavLink href="#pablo" className="p-2" onClick={e => e.preventDefault()}>
                      <Button
                        className="btn-icon btn-round"
                        color="success"
                        href="#top"
                        
                      >
                        <i className="fab text-white fa-2x fa-facebook-square"></i>
                        </Button>
                        
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#pablo" className="p-2" onClick={e => e.preventDefault()}>
                      <Button
                        className="btn-icon btn-round"
                        color="success"
                        href="#top"
                        
                      >
                        <i className="fab fa-twitter fa-2x  text-white"></i>
                        </Button>
                        
                      </NavLink>
                    </NavItem>
                    
                    <NavItem>
                      <NavLink href="#pablo"className="p-2" onClick={e => e.preventDefault()}>
                      <Button
                        className="btn-icon btn-round"
                        color="success"
                        href="#"
                        
                      >
                        <i className="fab fa-2x fa-instagram"></i>
                        </Button>
                        
                      </NavLink>
                    </NavItem>
                  </Nav>
          </Col>
        </Row><hr/>
      
        <nav className="mb-1">
          <ul>
            <li>
              <a
                href="/"
              >© {new Date().getFullYear() + " "} 
                Grassroots <span title="GDI" className="text-yellow">Development</span> Initiative  
              </a>
            </li>
            
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          
          <a
            href="https://www.gdinitiative.com"
            target="_blank"
          >
           
          </a>
          Developed by {" "}
          <a
            href="https://www.frontatech.com"
            target="_blank"
          >
            Frontatech
          </a>
          .
        </div>
      </Container>
      <div style={{float: "right"}}>
        {/* notifcation icon */}
        <div style={{position: "fixed",right: "5%", top: "85%",zIndex: 99999}}>
        <Button
                className="btn-icon btn-round"
                color="notif"
                onClick={e => e.preventDefault()}
              >
          <i className="fa fa-bell fa-2x  text-notif"></i>
          </Button></div>
        {/* back top icon */}
        <div style={{marginRight: "5%",zIndex: 99999}}>
              <Button
                className="btn-icon btn-round"
                color="success"
                href="#top"
                style={{marginRight: "5%",zIndex: 99999}}
                
              >
              <i className="fa fa-arrow-up fa-2x  text-white"></i>
          </Button></div>  
          </div>
    </footer>
  );
}

export default DarkFooter;
