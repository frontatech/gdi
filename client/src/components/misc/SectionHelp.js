import React from "react";
import {  MDBRow, MDBCol, MDBIcon } from "mdbreact";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col
} from "reactstrap";

// core components

function SectionHelp() {
  const [iconPills, setIconPills] = React.useState("1");
  const [pills, setPills] = React.useState("1");
  return (
    <>
      <div className="section section-tabs">
        <Container>
        <h2 className="h1-responsive font-weight-bold my-5 text-center">How Can You Help</h2>
        <p className="text-center">Join your hand with us for a better life and beautiful future</p>
        <MDBRow>
          <MDBCol md="3">
            <Col sm="12">
                
                <img
                  alt="..."
                  className="rounded-circle help-img"
                  src={require("assets/img/gdi16.jpg")}
                ></img>
              </Col>
            <h5 className="font-weight-bold my-4">Help For Education</h5>
            <p className="grey-text mb-md-0 mb-5">
              One of cardinal our responsibilty is to build capacity.We want to achieve that ty identifying indegent children that have no qaccess to quality education mostly at the University level. You can collaborate and partner with us for us to achieve this.
            </p>
          </MDBCol>
          <MDBCol md="3">
          <Col sm="12">
                
                <img
                  alt="..."
                  className="rounded-circle help-img"
                  src={require("assets/img/gdi3.jpg")}
                ></img>
              </Col>
            <h5 className="font-weight-bold my-4">Become a Voluteer</h5>            
            <p className="grey-text mb-md-0 mb-5">
              Our organization require people who will help us reach out to the rural and hintherland areas. The aim is to identify their needs and from time to time help to get feedback from them. We need your partnership by way of volunteering membership.
            </p>
          </MDBCol>
          <MDBCol md="3">
          <Col sm="12">
                
                <img
                  alt="..."
                  className="rounded-circle help-img"
                  src={require("assets/img/gdi4.jpg")}
                ></img>
              </Col>
            <h5 className="font-weight-bold my-4">Offer Scholarship</h5>
            <p className="grey-text mb-md-0 mb-5">
              In order to achieve our capacity building programs through education, please kindly help us meet our yearly target of 200 scholarship programs in Nigeria and Africa at large. We also need your scholarship to fund our apprentiship programs.
            </p>
          </MDBCol>
          <MDBCol md="3">
          <Col sm="12">
                
                <img
                  alt="..."
                  className="rounded-circle help-img"
                  src={require("assets/img/gdi10.jpg")}
                ></img>
              </Col>
            <h5 className="font-weight-bold my-4">Give a donation</h5>
            <p className="grey-text mb-md-0 mb-5">
              Please donate to enable us carry out our core business activities and meet up with with our ain  and objectives.
            </p>
          </MDBCol>
        </MDBRow>
        </Container>
      </div>
    </>
  );
}

export default SectionHelp;
