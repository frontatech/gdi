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
                  src={require("assets/img/julie.jpg")}
                ></img>
              </Col>
            <h5 className="font-weight-bold my-4">Help For Education</h5>
            <p className="grey-text mb-md-0 mb-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit maiores aperiam minima assumenda deleniti hic.
            </p>
          </MDBCol>
          <MDBCol md="3">
          <Col sm="12">
                
                <img
                  alt="..."
                  className="rounded-circle help-img"
                  src={require("assets/img/julie.jpg")}
                ></img>
              </Col>
            <h5 className="font-weight-bold my-4">Become a Voluteer</h5>            <p className="grey-text mb-md-0 mb-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit maiores aperiam minima assumenda deleniti hic.
            </p>
          </MDBCol>
          <MDBCol md="3">
          <Col sm="12">
                
                <img
                  alt="..."
                  className="rounded-circle help-img"
                  src={require("assets/img/julie.jpg")}
                ></img>
              </Col>
            <h5 className="font-weight-bold my-4">Offer Scholarship</h5>
            <p className="grey-text mb-md-0 mb-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit maiores aperiam minima assumenda deleniti hic.
            </p>
          </MDBCol>
          <MDBCol md="3">
          <Col sm="12">
                
                <img
                  alt="..."
                  className="rounded-circle help-img"
                  src={require("assets/img/julie.jpg")}
                ></img>
              </Col>
            <h5 className="font-weight-bold my-4">Give a donation</h5>
            <p className="grey-text mb-md-0 mb-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit maiores aperiam minima assumenda deleniti hic.
            </p>
          </MDBCol>
        </MDBRow>
        </Container>
      </div>
    </>
  );
}

export default SectionHelp;
