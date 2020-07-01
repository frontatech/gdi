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
import { MembersContext } from "admin/context/MembersContext";

const Members = () => {
    const {memberState:{members,totalMembers}, dispatch} = useContext(MembersContext)
    const handleDeleteMember = (e, id) =>{
        e.preventDefault()
        // confirm("Are You Sure You Want Delete This Member? "+id)
    }
    return (
        <Fragment>
        <GeneralHeader />
        {/* Page content */}
        <Container fluid>
            <CardHeader><h3 className="text-center">We have  {totalMembers} GDI Members</h3></CardHeader>
          <Row>
              {members.map(member => (
                  <Col lg="6" xl="3" key={`${member.surname}-${member.member_id}`}>
                  <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                          <div className="d-block text-center">
                              <div>
                                    <div className="card-profile-image">
                                        <Link
                                            to={{
                                                pathname: `/admin/profile/${member.surname.toLowerCase()}-${member.member_id}`,
                                                state: {member}
                                            }}
                                            id="tooltip742438047"
                                        >
                                            
                                                <img
                                                alt="..."
                                                style={{width:100, height: 100, maxWidth: 100}}
                                                className="rounded-circle"
                                                src={member.passport}
                                                />                                            
                                        </Link>
                                  </div>
                              </div>
                          </div>
                        </CardBody>                              
                      <CardFooter  className="mt-6">
                      <div>
                              <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0 d-block text-center"
                              >
                                  <Link to={{
                                          pathname: `/admin/profile/${member.surname.toLowerCase()}-${member.member_id}`,
                                          state: {member}
                                      }} className="font-weight-bold mb-0">{`${member.surname} ${member.firstName} ${member.lastName}`}</Link>
                              </CardTitle>
                          </div> 
                          <div className="container mt-2">
                              <div className="d-flex justify-content-between">
                                  <Link to="#" onClick={(e) =>handleDeleteMember(e,member.member_id)}><i className="fa fa-times text-danger" /></Link>
                                  <Link to={{
                                          pathname: `/admin/edit-profile/${member.surname.toLowerCase()}-${member.member_id}`,
                                          state: {member}
                                      }}><i className="fa fa-edit text-info" /></Link>
                                  <Link to={{
                                          pathname: `/admin/profile/${member.surname.toLowerCase()}-${member.member_id}`,
                                          state: {member}
                                      }}><i className="fa fa-eye text-success" /></Link>
                              </div>
                          </div>
                      </CardFooter>
                  </Card>
              </Col>
              ))}
          </Row>
        </Container>
      </Fragment>
    )
}

export default Members
