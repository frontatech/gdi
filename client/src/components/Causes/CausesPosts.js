import React,{useState} from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Container,
  Row,
  Card,
  Col,
  Progress
} from "reactstrap";
import PaymentModal from "./PaymentModal";

function CausesPosts() {
  const [modal, setModal] = React.useState(false);
  const [paidFor, setPaidFor] = React.useState({});
  React.useEffect(() => {
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("sidebar-collapse");
    };
  });
  const handleModal = (e) =>{
    e.preventDefault()
    console.log(e.target.id)
    setModal(!modal)
    setPaidFor({paidFor:e.target.id,mainTitle:e.target.value})
  }
  return (
    <>
    
        <div className="section section-about-us blog">
          
          <Container fluid>
            <Row>
              <Col className="text-center" lg="12">
                <Card>
                    <Row>
                        <Col lg="6">
                        <div className="card-body">
                        <img
                        alt="..."
                        className="rounded img-raised"
                        src={require("assets/img/bg14.jpg")}
                        />                       
                        </div> 
                        </Col>
                        <Col lg="6">
                            <h5 className="font-weight-bold text-justify text-black title">
                            Raise fund for  healthy living & food
                            </h5>
                            <p className="font-weight-normal text-justify description">
                            Excepteur sint occaecat cupidatat proid ent sunt culpa qui officia derunt mollit anmlab rum sed perspiciatis unde omnis is natus error sit voluptatem.

                            </p> 
                            <div className="progress-container progress-success">
                                <span className="progress-badge">Donations</span>
                                <Progress max="100" value="60">
                                <span className="progress-value">60%</span>
                                </Progress>
                            </div>
                            <div>
                                <p className="text-muted pull-left">Raised: <strong>NGN 700,000</strong></p>
                                <p className="text-muted pull-right">Target: <strong>NGN 1000,000</strong></p>
                            </div>
                            <div className="col text-center mt-5">
                                <Button
                                className="btn-round btn-white"
                                color="danger"
                                outline
                                size="sm"
                                id="1"
                                value="Raise fund for  healthy living & food"
                                onClick={handleModal}
                                >
                                Donate
                                </Button>
                                <Button
                                className="btn-round btn-white"
                                color="default"
                                to="/post-details"
                                outline
                                size="sm"
                                tag={Link}
                                >
                                Read  More
                                </Button>
                            </div> 
                        </Col>
                    </Row>                  
                </Card>
                </Col>
                <Col className="text-center" lg="12">
                <Card>
                    <Row>
                        
                        <Col lg="6">
                            <h5 className="font-weight-bold text-justify text-black title">
                            Raise fund for  buying children school materials
                            </h5>
                            <p className="font-weight-normal text-justify description">
                            Excepteur sint occaecat cupidatat proid ent sunt culpa qui officia derunt mollit anmlab rum sed perspiciatis unde omnis is natus error sit voluptatem.

                            </p> 
                            <div className="progress-container progress-success">
                                <span className="progress-badge">Donations</span>
                                <Progress max="100" value="60">
                                <span className="progress-value">60%</span>
                                </Progress>
                            </div>
                            <div>
                                <p className="text-muted pull-left">Raised: <strong>NGN 700,000</strong></p>
                                <p className="text-muted pull-right">Target: <strong>NGN 1000,000</strong></p>
                            </div>
                            <div className="col text-center mt-5">
                                <Button
                                className="btn-round btn-white"
                                color="danger"
                                outline
                                size="sm"
                                id="2"
                                value="Raise fund for  buying children school materials"
                                onClick={handleModal}
                                >
                                Donate
                                </Button>
                                <Button
                                className="btn-round btn-white"
                                color="default"
                                outline
                                size="sm"
                                
                                >
                                Read  More
                                </Button>
                            </div> 
                        </Col>
                        <Col lg="6">
                        <div className="card-body">
                        <img
                        alt="..."
                        className="rounded img-raised"
                        src={require("assets/img/bg15.jpg")}
                        />                       
                        </div> 
                        </Col>
                    </Row>                  
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
                Load  More
                </Button>
            </div>        
          </Container>         
        </div>
        <PaymentModal openModal={modal} paidFor={paidFor} setModal={setModal}/>
    </>
  );
}

export default CausesPosts;
