import React from 'react'
import {
    Row,
    Col,
    CardHeader,
    Card,
    CardBody,
    Container
  } from "reactstrap";
const HomeSection1 = () => {
    return (
        <div className="section section-tabs">
            <Container>
        <Row>
            <Col lg="4">
            <Card>
                <CardHeader>
                  Our Core Values
                </CardHeader>
                <CardBody>
                <Col sm="2">
                <p className="category">Raised</p>
                <img
                  alt="..."
                  className="rounded img-raised"
                  src={require("assets/img/julie.jpg")}
                ></img>
              </Col>

                      <p>
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at. So when you get something that has
                        the name Kanye West on it, it’s supposed to be pushing
                        the furthest possibilities. I will be the leader of a
                        company that ends up being worth billions of dollars,
                        because I got the answers. I understand culture. I am
                        the nucleus.
                      </p>
                    
                </CardBody>
              </Card>
            </Col>
        </Row>
        </Container>
        </div>
    )
}

export default HomeSection1
