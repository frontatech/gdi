import React, {useState, useEffect, Fragment} from "react";
import { Link,} from "react-router-dom";
import axios from 'axios'
// reactstrap components
import {
  Button,
  Container,
  Row,
  Card,
  Col,
  CardHeader,
  CardBody
} from "reactstrap";

// core components

function Comments({comments}) {   
  return (
    <>
          <Container fluid>
            <Row>
                <Col className="text-center" lg="12">
                <CardHeader>Commments</CardHeader>
                        {comments.length !== 0 ? (comments.map(comment =>(
                            <Card>
                                <CardHeader><h6 className="font-weight-bold text-center text-black title">
                                    {comment.name}
                                </h6></CardHeader>
                            <CardBody>
                                <p className="font-weight-normal text-justify description">
                                    {comment.comment}    
                                </p> 
                                <p className="text-muted">{comment.date}</p>                     
                            </CardBody>              
                        </Card>))):null}
                    </Col> 
            </Row>
                   
          </Container>
    </>
  );
}

export default Comments;
