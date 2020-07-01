import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Container,
  Row,
  Card,
  Col,
  Badge
} from "reactstrap";

// core components
import LandingPageHeader from "../Headers/LandingPageHeader.js";
function EventPosts() {
  React.useEffect(() => {
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
        <div className="section section-about-us blog">
          <Container fluid>
            <Row>
              <Col className="text-center" lg="4">
                <Card>
                    <div className="card-body">
                    <img
                        alt="..."
                        className="rounded img-raised"
                        src={require("assets/img/bg3.jpg")}
                        ></img>
                            <h5 className="font-weight-bold text-justify text-black title">
                            Excepteur sint occaecat cupidatat proid ent sunt culpa quiExcepteur sint occaecat cupidatat proid ent sunt culpa qui 
                            </h5>
                            <span className="event-date">27/10/2020</span>
                            <p className="font-weight-normal text-justify description">
                            Excepteur sint occaecat cupidatat proid ent sunt culpa qui officia derunt mollit anmlab rum sed perspiciatis unde omnis is natus error sit voluptatem.

                            </p>   
                            <div className="col text-center">
                            <Button
                            className="btn-round btn-white"
                            color="default"
                            to="/post-details"
                            outline
                            size="lg"
                            tag={Link}
                            >
                            Read  More
                            </Button>
                        </div>                        
                        </div>               
                    </Card>
                </Col>   
                <Col className="text-center" lg="4">
                <Card>
                    <div className="card-body">
                    <img
                        alt="..."
                        className="rounded img-raised"
                        src={require("assets/img/bg3.jpg")}
                        ></img>
                            <h5 className="font-weight-bold text-justify text-black title">
                            Excepteur sint occaecat cupidatat proid ent sunt culpa quiExcepteur sint occaecat cupidatat proid ent sunt culpa qui 
                            </h5>
                            <span className="event-date">27/10/2020</span>
                            <p className="font-weight-normal text-justify description">
                            Excepteur sint occaecat cupidatat proid ent sunt culpa qui officia derunt mollit anmlab rum sed perspiciatis unde omnis is natus error sit voluptatem.

                            </p>   
                            <div className="col text-center">
                            <Button
                            className="btn-round btn-white"
                            color="default"
                            to="/post-details"
                            outline
                            size="lg"
                            tag={Link}
                            >
                            Read  More
                            </Button>
                        </div>                        
                        </div>               
                    </Card>
                </Col>   
                <Col className="text-center" lg="4">
                <Card>
                    <div className="card-body">
                    <img
                        alt="..."
                        className="rounded img-raised"
                        src={require("assets/img/bg3.jpg")}
                        ></img>
                            <h5 className="font-weight-bold text-justify text-black title">
                            Excepteur sint occaecat cupidatat proid ent sunt culpa quiExcepteur sint occaecat cupidatat proid ent sunt culpa qui 
                            </h5>
                            <span className="event-date">27/10/2020</span>
                            <p className="font-weight-normal text-justify description">
                            Excepteur sint occaecat cupidatat proid ent sunt culpa qui officia derunt mollit anmlab rum sed perspiciatis unde omnis is natus error sit voluptatem.

                            </p>   
                            <div className="col text-center">
                            <Button
                            className="btn-round btn-white"
                            color="default"
                            to="/post-details"
                            outline
                            size="lg"
                            tag={Link}
                            >
                            Read  More
                            </Button>
                        </div>                        
                        </div>               
                    </Card>
                </Col>   
                <Col className="text-center" lg="4">
                <Card>
                    <div className="card-body">
                    <img
                        alt="..."
                        className="rounded img-raised"
                        src={require("assets/img/bg3.jpg")}
                        ></img>
                            <h5 className="font-weight-bold text-justify text-black title">
                            Excepteur sint occaecat cupidatat proid ent sunt culpa quiExcepteur sint occaecat cupidatat proid ent sunt culpa qui 
                            </h5>
                            <span className="event-date">27/10/2020</span>
                            <p className="font-weight-normal text-justify description">
                            Excepteur sint occaecat cupidatat proid ent sunt culpa qui officia derunt mollit anmlab rum sed perspiciatis unde omnis is natus error sit voluptatem.

                            </p>   
                            <div className="col text-center">
                            <Button
                            className="btn-round btn-white"
                            color="default"
                            to="/post-details"
                            outline
                            size="lg"
                            tag={Link}
                            >
                            Read  More
                            </Button>
                        </div>                        
                        </div>               
                    </Card>
                </Col>   
                <Col className="text-center" lg="4">
                <Card>
                    <div className="card-body">
                    <img
                        alt="..."
                        className="rounded img-raised"
                        src={require("assets/img/bg3.jpg")}
                        ></img>
                            <h5 className="font-weight-bold text-justify text-black title">
                            Excepteur sint occaecat cupidatat proid ent sunt culpa quiExcepteur sint occaecat cupidatat proid ent sunt culpa qui 
                            </h5>
                            <span className="event-date">27/10/2020</span>
                            <p className="font-weight-normal text-justify description">
                            Excepteur sint occaecat cupidatat proid ent sunt culpa qui officia derunt mollit anmlab rum sed perspiciatis unde omnis is natus error sit voluptatem.

                            </p>   
                            <div className="col text-center">
                            <Button
                            className="btn-round btn-white"
                            color="default"
                            to="/post-details"
                            outline
                            size="lg"
                            tag={Link}
                            >
                            Read  More
                            </Button>
                        </div>                        
                        </div>               
                    </Card>
                </Col>   
                <Col className="text-center" lg="4">
                <Card>
                    <div className="card-body">
                    <img
                        alt="..."
                        className="rounded img-raised"
                        src={require("assets/img/bg3.jpg")}
                        ></img>
                            <h5 className="font-weight-bold text-justify text-black title">
                            Excepteur sint occaecat cupidatat proid ent sunt culpa quiExcepteur sint occaecat cupidatat proid ent sunt culpa qui 
                            </h5>
                            <span className="event-date">27/10/2020</span>
                            <p className="font-weight-normal text-justify description">
                            Excepteur sint occaecat cupidatat proid ent sunt culpa qui officia derunt mollit anmlab rum sed perspiciatis unde omnis is natus error sit voluptatem.

                            </p>   
                            <div className="col text-center">
                            <Button
                            className="btn-round btn-white"
                            color="default"
                            to="/post-details"
                            outline
                            size="lg"
                            tag={Link}
                            >
                            Read  More
                            </Button>
                        </div>                        
                        </div>               
                    </Card>
                </Col>   
                <Col className="text-center" lg="4">
                <Card>
                    <div className="card-body">
                    <img
                        alt="..."
                        className="rounded img-raised"
                        src={require("assets/img/bg3.jpg")}
                        ></img>
                            <h5 className="font-weight-bold text-justify text-black title">
                            Excepteur sint occaecat cupidatat proid ent sunt culpa quiExcepteur sint occaecat cupidatat proid ent sunt culpa qui 
                            </h5>
                            <span className="event-date">27/10/2020</span>
                            <p className="font-weight-normal text-justify description">
                            Excepteur sint occaecat cupidatat proid ent sunt culpa qui officia derunt mollit anmlab rum sed perspiciatis unde omnis is natus error sit voluptatem.

                            </p>   
                            <div className="col text-center">
                            <Button
                            className="btn-round btn-white"
                            color="default"
                            to="/post-details"
                            outline
                            size="lg"
                            tag={Link}
                            >
                            Read  More
                            </Button>
                        </div>                        
                        </div>               
                    </Card>
                </Col>   
                <Col className="text-center" lg="4">
                <Card>
                    <div className="card-body">
                    <img
                        alt="..."
                        className="rounded img-raised"
                        src={require("assets/img/bg3.jpg")}
                        ></img>
                            <h5 className="font-weight-bold text-justify text-black title">
                            Excepteur sint occaecat cupidatat proid ent sunt culpa quiExcepteur sint occaecat cupidatat proid ent sunt culpa qui 
                            </h5>
                            <span className="event-date">27/10/2020</span>
                            <p className="font-weight-normal text-justify description">
                            Excepteur sint occaecat cupidatat proid ent sunt culpa qui officia derunt mollit anmlab rum sed perspiciatis unde omnis is natus error sit voluptatem.

                            </p>   
                            <div className="col text-center">
                            <Button
                            className="btn-round btn-white"
                            color="default"
                            to="/post-details"
                            outline
                            size="lg"
                            tag={Link}
                            >
                            Read  More
                            </Button>
                        </div>                        
                        </div>               
                    </Card>
                </Col>   
                <Col className="text-center" lg="4">
                <Card>
                    <div className="card-body">
                    <img
                        alt="..."
                        className="rounded img-raised"
                        src={require("assets/img/bg3.jpg")}
                        ></img>
                            <h5 className="font-weight-bold text-justify text-black title">
                            Excepteur sint occaecat cupidatat proid ent sunt culpa quiExcepteur sint occaecat cupidatat proid ent sunt culpa qui 
                            </h5>
                            <span className="event-date">27/10/2020</span>
                            <p className="font-weight-normal text-justify description">
                            Excepteur sint occaecat cupidatat proid ent sunt culpa qui officia derunt mollit anmlab rum sed perspiciatis unde omnis is natus error sit voluptatem.

                            </p>   
                            <div className="col text-center">
                            <Button
                            className="btn-round btn-white"
                            color="default"
                            to="/post-details"
                            outline
                            size="lg"
                            tag={Link}
                            >
                            Read  More
                            </Button>
                        </div>                        
                        </div>               
                    </Card>
                </Col>   
            </Row>
            <div className="col text-center">
                <Button
                className="btn-round btn-white"
                color="primary"
                to="/post-details"
                
                size="lg"
                tag={Link}
                >
                Load  More Posts
                </Button>
            </div>        
          </Container>
        </div>
    </>
  );
}

export default EventPosts;
