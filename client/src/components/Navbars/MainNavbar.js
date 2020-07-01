import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  Navbar,
  NavItem,
  Nav,
  Container,
  } from "reactstrap";
import './header.css'
function MainNavbar() {
  const [navbarColor, setNavbarColor] = React.useState('navbarTry');
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      // document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  React.useEffect(() => {
    // document.body.scrollTop = 0
    // window.scrollTo(0,0)
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
            document.body.classList.remove("sidebar-collapse");
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
      <Navbar style={{marginBottom: 0}}  className={'fixed-top '+navbarColor} expand="lg" color="green">
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
          onClick={() => setCollapseOpen(false)}
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
                  <i className="fa fa-home text-yellow"></i>
                  <p>Home</p>
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/about-us"
                  className="nav-link"
                >
                  <i className="fa fa-users text-yellow"></i>
                  <p>About Us</p>
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/our-services"
                  className="nav-link"
                >
                  <i className="fa fa-cogs text-yellow"></i>
                  <p>Our Services</p>
                </Link>
                
              </NavItem>
              <NavItem>
                <Link
                  to="/blog"
                  className="nav-link"
                  
                >
                  <i className="fa fa-book text-yellow"></i>
                  <p>Blog</p>
                </Link>
                
              </NavItem>
              <NavItem>
                <Link
                  to="/gallery"
                  className="nav-link"
                  
                >
                  <i className="fa fa-image text-yellow"></i>
                  <p>Gallery</p>
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/events"
                  className="nav-link"
                >
                  <i className="fa fa-calendar text-yellow"></i>
                  <p>Events</p>
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/contact-us"
                   className="nav-link"
                >
                  <i className="fa fa-phone text-yellow"></i>
                  <p>Contact Us</p>
                </Link>
              </NavItem>
              <NavItem>
                
                <Button
                  className="nav-link"
                  tag={Link}
                  color="danger"
                  to="/donate"
                  id="donate-now"
                >
                  <i className="now-ui-icons arrows-1_share-66 mr-1"></i>
                  <p>Donate Now</p>
                </Button>
              </NavItem>
              
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MainNavbar;
