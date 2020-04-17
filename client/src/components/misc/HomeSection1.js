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
                  <strong>This is card title</strong>
                </h3>
                <p className='pb-3 text-center text-white'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Repellat fugiat, laboriosam, voluptatem, optio vero odio nam
                  sit officia accusamus minus error nisi architecto nulla ipsum
                  dignissimos. Odit sed qui, dolorum!
                </p></Container>
                </Col>
                <Col lg="6" className="row-gutter-0 col-height">
                <Card
            className='card-image'
            style={{
              backgroundImage:
                'url(https://mdbootstrap.com/img/Photos/Horizontal/Nature/6-col/img%20%2873%29.jpg)'
            }}
          >
            <div className='text-white text-center  d-flex align-items-center rgba-black-strong py-5 px-4 rounded'>
              <div>
                <h6 className='pink-text'>
                  
                  <strong> Marketing</strong>
                </h6>
                <h3 className='py-3 font-weight-bold'>
                  <strong>This is card title</strong>
                </h3>
                <p className='pb-3'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Repellat fugiat, laboriosam, voluptatem, optio vero odio nam
                  sit officia accusamus minus error nisi architecto nulla ipsum
                  dignissimos. Odit sed qui, dolorum!
                </p>
              </div>
            </div>
          </Card>
                </Col>
                <Col className="col-height row-gutter-0" lg="6">
                <Card
            className='card-image'
            style={{
              backgroundImage:
                'url(https://mdbootstrap.com/img/Photos/Horizontal/Nature/6-col/img%20%2873%29.jpg)'
            }}
          >
            <div className='text-white text-center  d-flex align-items-center rgba-black-strong py-5 px-4 rounded'>
              <div>
                <h6 className='pink-text'>
                  
                  <strong> Marketing</strong>
                </h6>
                <h3 className='py-3 font-weight-bold'>
                  <strong>This is card title</strong>
                </h3>
                <p className='pb-3'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Repellat fugiat, laboriosam, voluptatem, optio vero odio nam
                  sit officia accusamus minus error nisi architecto nulla ipsum
                  dignissimos. Odit sed qui, dolorum!
                </p>
              </div>
            </div>
          </Card>
                </Col>
                <Col lg="6" className="row-gutter-0 col-height content-col">
                
                </Col>
            </Row>
        </Jumbotron>
        
        </>
    )
}

export default HomeSection1
