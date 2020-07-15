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
import React, { useContext, useState } from "react";

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
import UserHeader from "../../Headers/UserHeader.js";
import { UserAuthContext } from "admin/context/UserAuthContext.js";
import Axios from "axios";

const Profile = () => {
  const {user:{user}} = useContext(UserAuthContext)
  // declaring hook vairables
  const [password, setPassword] = useState('')
  const [confPwd, setConfPwd] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confPwdError, setConfPwdError] = useState('')
  const [message, setMessage] = useState('')
  const handleConfPwd = (e) =>{
    setConfPwd(e.target.value)
    setConfPwdError('')
  }
  const handlePassword =  (e) =>{
    setPassword(e.target.value)
    setPasswordError('')
  }
  const handleSubmit = async (e) =>{
    let isError = false
    if(password === ""){
      setPasswordError("Please enter new password")
      isError = true
    }
    if(confPwd === ""){
      setConfPwdError("Please confirm new password")
      isError = true
      return
    }
    if(password !== confPwd){
      setConfPwdError("Two passwords do not match")
      isError = true
    }
    if(!isError){
      try {
        let res = await Axios.post("/admin/reset-password",{password,confPwd,admin: user._id})
        setMessage(res.data.message)
      } catch (error) {
        if(error.response){
          setMessage(error.response.data.error)
        }
      }
    }
  }
    return (
      <>
        <UserHeader user={user}/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("../../assets/img/brand/gdi-logo.png")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  {/* <div className="d-flex justify-content-between">
                    <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Connect
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Message
                    </Button>
                  </div> */}
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">{user.total_posts}</span>
                          <span className="description">Posts</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      {user.username}
                      <span className="font-weight-light">, {user.role}</span>
                    </h3>
                    <hr className="my-4" />
                    <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Change Password
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-password"
                            >
                              New Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-password"
                              placeholder="New Password"
                              onClick={password}
                              onChange={handlePassword}
                              type="password"
                            />
                          </FormGroup>
                          <p className="text-danger">{passwordError}</p>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-conf-pwd"
                            >
                              Confirm Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-conf-pwd"
                              placeholder="Confirm password"
                              value={confPwd}
                              onChange={handleConfPwd}
                              type="password"
                            />
                          </FormGroup>
                          <p className="text-danger">{confPwdError}</p>
                        </Col>
                        <div className="d-block text-center">
                          <p className="text-info">{message}</p>
                        <Button color="info" onClick={handleSubmit}>Change Password</Button>
                        </div>
                      </Row>
                      </div>
                      </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
}

export default Profile;
