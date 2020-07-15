import React, { Fragment, useRef, useContext, useState, useReducer } from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  CardFooter
} from "reactstrap";
// core components
import GeneralHeader from "../../Headers/GeneralHeader";
import { NewsletterContext } from "admin/context/NewsletterContext";

const MailTemplates = () => {
    const {mainState:{templates}} = useContext(NewsletterContext) 
    return (
        <Fragment>
        <GeneralHeader />
        {/* Page content */}
        <Container fluid>
            <CardHeader><h3 className="text-center">Select mail template below!</h3></CardHeader>
          <Row>
              {templates.map(template => (
                  <Col lg="6" xl="6" key={`${template.name}`} className="mb-2">
                    <Card className="card-stats mb-4 mb-xl-0" style={{cursor: 'pointer'}} >
                        <CardHeader className="heading text-center">{template.name}</CardHeader>
                        <CardBody>
                            <div className="d-block text-center">
                                <div>
                                        <div className="">
                                        <Link
                                            to={{
                                                pathname: `/admin/send_newsletter/${template.name}`,
                                                state: {template}
                                            }}
                                            id="tooltip742438047"
                                        >
                                            <img
                                            alt="..."
                                            style={{height: 400}}
                                            className="rounded w-100"
                                            src={require('../../../assets/img/bg14.jpg')}
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            </CardBody>                              
                    </Card>
              </Col>
              ))}
          </Row>
        </Container>
      </Fragment>
    )
}

export default MailTemplates
