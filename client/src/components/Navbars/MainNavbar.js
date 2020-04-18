import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  UncontrolledTooltip,
  Row,
  Col
} from "reactstrap";
import './header.css'
function MainNavbar() {
  const [navbarColor, setNavbarColor] = React.useState('navbarTry');
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    // document.body.scrollTop = 0
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor('navbarTry');
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      {/* <Navbar style={{marginBottom: 0}} className={"header-top bg-nav "} >
        <Container>
            <Row>
            <Col xlg="4">Follow us on</Col>
            <Col xlg="8">
              <Row>
                <Col xlg="4">Email: Gdinitiative@gmail.com</Col>
                <Col xlg="4">Phone: 08022821743</Col>
                <Col xlg="4">08083749308</Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Navbar> */}
      <Navbar style={{marginBottom: 0}}  className={'fixed-top '+navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
           
              <Link className="navbar-brand" id="navbar-brand" to="/">GD-Initiative</Link>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem>
                <Link
                  to="/"
                  className="nav-link"
                >
                  <i className="now-ui-icons fas fas-home"></i>
                  <p>Home</p>
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/about-us"
                  className="nav-link"
                >
                  <i className="now-ui-icons arrows-1_cloud-download-93"></i>
                  <p>About Us</p>
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/our-services"
                  className="nav-link"
                >
                  <i className="now-ui-icons arrows-1_cloud-download-93"></i>
                  <p>Our Services</p>
                </Link>
                
              </NavItem>
              <NavItem>
                <Link
                  to="/blog"
                  className="nav-link"
                  
                >
                  <i className="now-ui-icons arrows-1_cloud-download-93"></i>
                  <p>Blog</p>
                </Link>
                
              </NavItem>
              <NavItem>
                <Link
                  to="/gallery"
                  className="nav-link"
                  
                >
                  <i className="now-ui-icons arrows-1_cloud-download-93"></i>
                  <p>Gallery</p>
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/events"
                  className="nav-link"
                >
                  <i className="now-ui-icons arrows-1_cloud-download-93"></i>
                  <p>Events</p>
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/contact-us"
                   className="nav-link"
                >
                  <i className="now-ui-icons arrows-1_cloud-download-93"></i>
                  <p>Contact Us</p>
                </Link>
              </NavItem>
              <NavItem>
                
                <Button
                  className="nav-link btn-danger"
                  color="info"
                  href="/"
                  id="upgrade-to-pro"
                  onClick={e => e.preventDefault()}
                >
                  <i className="now-ui-icons arrows-1_share-66 mr-1"></i>
                  <p>Become a Member</p>
                </Button>
                <UncontrolledTooltip target="#upgrade-to-pro">
                  Cooming soon!
                </UncontrolledTooltip>
              </NavItem>
              
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MainNavbar;
