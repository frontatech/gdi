/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useRef, useContext } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserProfHeader from "../../Headers/UserProfHeader.js";
import Axios from "axios";
import { UPDATE_MEMBER_INFORMATION } from "admin/actions/actions.js";
import { MembersContext } from "admin/context/MembersContext.js";


const UserProfile = ({location:{state:{member}}}) => {
    const {dispatch} = useContext(MembersContext)
    const photoRef = useRef(null)
    const photoRefUrl = useRef(null)
    const openGallery = e =>{
        e.preventDefault()
        photoRef.current.click()
    }
    const handleFileChange = e =>{
        const photo = e.target.files
        if(photo.length !== 0){
            const photoUrl = URL.createObjectURL(photo[0])
            photoRefUrl.current.src = photoUrl
            const formData = new FormData()
            formData.append('passport',photo[0])
            formData.append('oldPhotoUrl',member.passport)
            formData.append('member_id',member.member_id)
            Axios.post('/updateMemberPassport', formData).then(res =>{
                console.log(res)
                if(!res.data.isError){
                    dispatch({type: UPDATE_MEMBER_INFORMATION,payload:res.data.member})
                }
            }).catch(error =>{
                console.log(error)
            })
        }
        
    }
    return (
      <>
        <UserProfHeader member={member} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          ref={photoRefUrl}
                          src={member.passport}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <Form>
                        <input
                            className="form-control-alternative"
                            id="input-photo"
                            placeholder="surname"
                            type="file"
                            hidden
                            ref={photoRef}
                            onChange={handleFileChange}
                        />
                    </Form>
                    <Button
                      className="float-right"
                      color="default"
                      size="sm"
                      onClick={openGallery}
                    >
                      <i className="fa fa-camera" />
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">{`${member.dob}`}</span>
                          <span className="description">Birthday</span>
                        </div>
                        <div>
                          <span className="heading">{`54`}</span>
                          <span className="description">Age</span>
                        </div>
                        <div>
                          <span className="heading">{member.status === 1 ? "Active": "Not Active"}</span>
                          <span className="description">Status</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                    {`${member.surname} ${member.firstName} ${member.lastName}`}
                      <span className="font-weight-light"></span>
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {`${member.email}`}
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                       {`${member.gender}, ${member.marital}`}
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      {`${member.phone}`}
                    </div>
                    <hr className="my-4" />
                    <p>
                    {`${member.address}`}
                    </p>
                    {/* <a href="#pablo" onClick={e => e.preventDefault()}>
                      Show more
                    </a> */}
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Member Details</h3>
                    </Col>
                    
                  </Row>
                </CardHeader>
                <CardBody className="bg-white">
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                        <Row>
                            <Col lg="4">
                                <h5 className="description">Father's name</h5>
                                <h6 className="heading">{`${member.father}`}</h6>
                            
                            </Col>
                            <Col lg="4">
                                <h5 className="description">Nationality</h5>
                                <h6 className="heading">{`${member.nationality}`}</h6>
                            </Col>
                            <Col lg="4">
                                <h5 className="description">Discipline</h5>
                                <h6 className="heading">{`${member.discipline}`}</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="6">
                                <h5 className="description">State</h5>
                                <h6 className="heading">{`${member.state}`}</h6>
                            
                            </Col>
                            <Col lg="6">
                                <h5 className="description">LGA</h5>
                                <h6 className="heading">{`${member.lga}`}</h6>
                            </Col>
                        </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Academic information
                    </h6>
                    <div className="pl-lg-4">
                    <Row>
                        <Col lg="4">
                            <h5 className="description">Primary School</h5>
                            <h6 className="heading">{`${member.primary_school}`}</h6>
                        
                        </Col>
                        <Col lg="4">
                            <h5 className="description">Qualification</h5>
                            <h6 className="heading">{`${member.primary_qua}`}</h6>
                        </Col>
                        <Col lg="4">
                            <h5 className="description">Date</h5>
                            <h6 className="heading">{`${member.primary_date}`}</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4">
                            <h5 className="description">secondary School</h5>
                            <h6 className="heading">{`${member.secondary}`}</h6>
                        
                        </Col>
                        <Col lg="4">
                            <h5 className="description">Qualification</h5>
                            <h6 className="heading">{`${member.secondary_qua}`}</h6>
                        </Col>
                        <Col lg="4">
                            <h5 className="description">Date</h5>
                            <h6 className="heading">{`${member.secondary_date}`}</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4">
                            <h5 className="description">Tertairy Institution 1</h5>
                            <h6 className="heading">{`${member.tertiaryOne}`}</h6>
                        
                        </Col>
                        <Col lg="4">
                            <h5 className="description">Qualification</h5>
                            <h6 className="heading">{`${member.tertiaryOne_qua}`}</h6>
                        </Col>
                        <Col lg="4">
                            <h5 className="description">Date</h5>
                            <h6 className="heading">{`${member.tertiaryOne_date}`}</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4">
                            <h5 className="description">Tertiary Institution 2</h5>
                            <h6 className="heading">{`${member.tertiaryTwo}`}</h6>
                        
                        </Col>
                        <Col lg="4">
                            <h5 className="description">Qualification</h5>
                            <h6 className="heading">{`${member.tertiaryTwo_qua}`}</h6>
                        </Col>
                        <Col lg="4">
                            <h5 className="description">Date</h5>
                            <h6 className="heading">{`${member.tertiaryTwo_date}`}</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4">
                            <h5 className="description">Tertiary Institution 3</h5>
                            <h6 className="heading">{`${member.tertiaryThree}`}</h6>
                        
                        </Col>
                        <Col lg="4">
                            <h5 className="description">Qualification</h5>
                            <h6 className="heading">{`${member.tertiaryThree_qua}`}</h6>
                        </Col>
                        <Col lg="4">
                            <h5 className="description">Date</h5>
                            <h6 className="heading">{`${member.tertiaryThree_date}`}</h6>
                        </Col>
                    </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">Experience On NGO Activities</h6>
                    <div className="pl-lg-4">
                    <Row>
                        <Col lg="6">
                            <h5 className="description">NGO one</h5>
                            <h6 className="heading">{`${member.ngoOne}`}</h6>
                        
                        </Col>
                        <Col lg="6">
                            <h5 className="description">Position</h5>
                            <h6 className="heading">{`${member.ngoOne_position}`}</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                            <h5 className="description">Responsiblity</h5>
                            <h6 className="heading">{`${member.ngoOne_res}`}</h6>
                        
                        </Col>
                        <Col lg="6">
                            <h5 className="description">Date</h5>
                            <h6 className="heading">{`${member.ngoOne_date}`}</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                            <h5 className="description">NGO two</h5>
                            <h6 className="heading">{`${member.ngoTwo}`}</h6>
                        
                        </Col>
                        <Col lg="6">
                            <h5 className="description">Position</h5>
                            <h6 className="heading">{`${member.ngoTwo_position}`}</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                            <h5 className="description">Responsiblity</h5>
                            <h6 className="heading">{`${member.ngoTwo_res}`}</h6>
                        
                        </Col>
                        <Col lg="6">
                            <h5 className="description">Date</h5>
                            <h6 className="heading">{`${member.ngoTwo_date}`}</h6>
                        </Col>
                    </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
}

export default UserProfile;
