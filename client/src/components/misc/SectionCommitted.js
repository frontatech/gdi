import React from "react";
import {  MDBRow, MDBCol, MDBIcon } from "mdbreact";
import { Link } from "react-router-dom";
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
  Button,
  Col
} from "reactstrap";

// core components

function SectionCommitted() {
  return (
    <>
      <div className="section bg-green">
        <Container>
        <h2 className="h1-responsive font-weight-bold my-5 text-center">Become a partner or a volunteer</h2>
        <p className="text-center">Ready to embark on this selfless journey with us on ?</p>
        <MDBRow>
          <MDBCol md="6">
            <h1 className="font-weight-bold my-4">We are committed to serving the hopeless and ensuring good governance.</h1>
            <Button
                className="btn-round"
                color="danger"
                to="/partner-with-us"
                tag={Link}
                size="sm"
                
            >
               Become a partner
            </Button>
          </MDBCol>
          <MDBCol md="6">
            <MDBRow>
                <MDBCol lg="4">
                    <Col sm="12">    
                        <img
                        alt="..."
                        className="rounded-circle help-img"
                        src={require("../../assets/img/icons/icon5.svg")}
                        ></img>
                    </Col>
                    <h4 className="font-weight-bold my-4"><strong>12</strong> Awards</h4> 
                </MDBCol>
                <MDBCol lg="4">
                    <Col sm="12">    
                        <img
                        alt="..."
                        className="rounded-circle help-img"
                        src={require("../../assets/img/icons/icon6.svg")}
                        ></img>
                    </Col>
                    <h6 className="font-weight-bold my-4"><strong>1000 </strong>Volunteers</h6>  
                </MDBCol>
                <MDBCol lg="4">
                    <Col sm="12">    
                        <img
                        alt="..."
                        className="rounded-circle help-img"
                        src={require("../../assets/img/icons/icon4.svg")}
                        ></img>
                    </Col>
                    <h4 className="font-weight-bold my-4"><strong>20</strong> Projects</h4>  
                    </MDBCol>
            </MDBRow>          
          </MDBCol>
        </MDBRow>
        </Container>
      </div>
    </>
  );
}

export default SectionCommitted;
