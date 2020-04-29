import React from 'react'

import {
    Row,
    Col,
    CardHeader,
    Card,
    CardBody,
    Container,
    Jumbotron

  } from "reactstrap";

const HomeSection1 = () => {
    return (
        <>
        <Jumbotron fluid style={{padding:0}}>
            <Row>
                <Col lg="6" className="bg-green row-gutter-0 col-height content-col">
                <Container><h3 className='py-3 font-weight-bold text-center title'>
                  <strong>Grassroots Development Initiative</strong>
                </h3>
                <h3 className='pb-3 text-center text-white'>
                  Working towards enthroning good Governance which by implication willl develop the society and make the world a better living place.
                </h3></Container>
                </Col>
                <Col lg="6" className="row-gutter-0 col-height">
                <Card>
                    <img src={require("assets/img/gdi14.jpg")} alt="Raising the standard of living"/>
                </Card>
                </Col>
                <Col lg="6" className="col-height row-gutter-0" >
                <Card>
                <img src={require("assets/img/gdi11.jpg")} alt="people shaking hands, Gdi"/>
                </Card>
                </Col>
                <Col lg="6" className="row-gutter-0 col-height content-col">
                <Container><h3 className='py-3 font-weight-bold text-center title'>
                  <strong>Grassroots Development Initiative</strong>
                </h3>
                <h3 className='pb-3 text-center text-white'>
                Helping to drive programs and policies of Government and International Agencies for the improvement of standard of living of people in underdeveloped areas.
                </h3></Container>
                
                </Col>
            </Row>
        </Jumbotron>
        
        </>
    )
}

export default HomeSection1
