/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Card, CardBody, Row,Col, FormGroup, Input,CardFooter, Button, CardTitle } from "reactstrap";


function DonateMain() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/header.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        
        <Container>
          <div className="brand" style={{top: '100%'}}>
            <img
              alt="..."
              className="n-logo"
              src={require("assets/img/now-logo.png")}
            ></img>
            <h1 className="h1-seo text-white">Grassroots Development Initiative</h1>
            <h3>Please make your donation by filing the form below.</h3>
          </div>
          
          <Row className="d-flex justify-content-center">
          <Card className="col-lg-4">
          <CardTitle className="title-up" tag="h3">Donate Now</CardTitle>
          <FormGroup>
              <CardBody>
                    <Row>
                    <Container>
                    <Col lg="12" sm="6">
                
                  <Input
                    defaultValue=""
                    placeholder="Enter Your Full Name"
                    type="text"
                    className="mb-4"
                  ></Input>
                  
                  <Input
                    defaultValue=""
                    placeholder="Enter Email Address"
                    type="email"
                     className="mb-4"
                  ></Input>
                  <Input
                    defaultValue=""
                    placeholder="Enter Your Phone number"
                    type="number"
                     className="mb-4"
                  ></Input>
                  <Input
                    defaultValue=""
                    placeholder="Enter Amount"
                    type="number"
                     className="mb-4"
                  ></Input>
                  <Input
                    defaultValue=""
                    placeholder="Enter Your Address"
                    type="address"
                    className="mb-4"
                  ></Input>
              </Col>
            </Container>
                </Row>
              </CardBody>
              <CardFooter className="text-center">
                  <Button
                    className="btn-success btn-round"
                    color="info"
                    type="submit"
                    onClick={e => e.preventDefault()}
                    size="lg"
                  >
                    Continue
                  </Button>
                </CardFooter>
                </FormGroup>
              
          </Card>
          </Row>
          
        </Container>
      </div>
    </>
  );
}

export default DonateMain;
