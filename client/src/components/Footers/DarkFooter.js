/*eslint-disable*/
import React,{useState} from "react";

// reactstrap components
import { Container, Row, Col,Input,Button,Navbar,
  NavItem,
  NavLink,
  Nav,} from "reactstrap";
import { Link } from "react-router-dom";
import axios from 'axios'
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
    if(userEmail === "") setEmailError("Enter Your Email Address")
    if(userEmail !== ""){
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
    
}
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <Row>
          <Col lg="6"><h2 className="text-uppercase mb-4 font-weight-bold title">Subscribe To Our Newsletter</h2></Col>
          <Col lg="6"><div className="d-flex">
            <Input value={userEmail} onChange={updateEmail} placeholder="Enter Your Email Address" type="text"
                    size="sm"/>
                  <Button
                  className="btn-success btn-round"
                  color="warning"
                  type="submit"
                  onClick={handleSubmit}
                  size="lg"
                >
                  Subscribe
                </Button></div><span>{emailError}</span></Col>
        </Row>
        <hr/>
        <Row>
            
          <Col lg="4">
          <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
              About <span className="text-yellow">Grassroots Development Initiative</span>
            </h5>
            <p className="font-weight text-justify">
              We are a software development company focused on building & deploying both individual and enterprise sofware solutions ranging from E-learning apps, E-commerce sites and many more. We work hand in hand with our clients to deliver & provide elegant solutions. We help innovators to successfully build and lauch new companies by ensuring that we design, develop and deploy our apps based on user requirement. We help businesses create a wonderful and beautiful online presence. 
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
                        <i className="fab text-blue fa-3x fa-facebook-square"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#pablo" className="p-2" onClick={e => e.preventDefault()}>
                        <i className="fab text-info fa-3x fa-twitter"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#pablo" className="p-2" onClick={e => e.preventDefault()}>
                        <i className="fab fa-3x fa-google-plus"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#pablo"className="p-2" onClick={e => e.preventDefault()}>
                        <i className="fab fa-3x fa-instagram"></i>
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
              >
                Grassroots <span title="GDI" className="text-yellow">Development</span> Initiative
              </a>
            </li>
            
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()},
          <a
            href="https://www.gdinitiative.com"
            target="_blank"
          >
            GDI
          </a>
          . Developed by {" "}
          <a
            href="https://www.frontatech.com"
            target="_blank"
          >
            Frontatech
          </a>
          .
        </div>
      </Container>
    </footer>
  );
}

export default DarkFooter;
