import React, {useState, useEffect, Fragment} from "react";
import { Link,} from "react-router-dom";
import moment from 'moment'
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
                            <Card key={comment.comment_id}>
                                <CardHeader><h6 className="font-weight-bold text-center text-black title">
                                    {comment.name}
                                </h6></CardHeader>
                            <CardBody>
                                <p className="font-weight-normal text-justify description">
                                    {comment.comment}    
                                </p> 
                                <p className="text-yellow">{moment(comment.date).format("MMM Do YYYY")}</p>
                         
                            </CardBody>              
                        </Card>))):null}
                    </Col> 
            </Row>
                   
          </Container>
    </>
  );
}

export default Comments;
