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
import React, { Fragment, useRef, useContext, useState } from "react";

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
import axios from 'axios'
import GeneralHeader from "../../Headers/GeneralHeader";
import { ADD_ADMIN } from "admin/actions/actions";
import { AdminUsersContext } from "admin/context/AdminUsersContext";
import { UserAuthContext } from "admin/context/UserAuthContext";
const AddAdmin = (props) => {
  const {dispatch} = useContext(AdminUsersContext)
  const {user:{user}} = useContext(UserAuthContext)
  const [adminUsername, setAdminUsername] = useState('')
  const [adminRole, setAdminRole] = useState('')
  const [adminPassword, setPassword] = useState('') 
  const [adminConfPwd, setConfPwd] = useState('')
  const [loader, setLoader] = useState(false)
  const [message, setMessage] = useState('')
  // error variables
  const [usernameError, setUsernameError] = useState('')
  const [roleError, setRoleError] = useState('')
  const [pwdError, setPwdError] = useState('')
  const [confPwdError, setConfPwdError] = useState('')
  // event functions
  const handleNameChange = (e) =>{
      setUsernameError('')
      setAdminUsername(e.target.value)
  }
  const handleRoleChange = e =>{
      setRoleError('')
      setAdminRole(e.target.value)
  }
  const handlePwdChange = e =>{
      setPwdError('')
      setPassword(e.target.value)
  }
  const handleConfChange = e =>{
      setConfPwdError('')
      setConfPwd(e.target.value)   
  }
  const resetFormInputs = () =>{
    setAdminUsername('')
    setAdminRole('')
    setPassword('')
    setConfPwd('')
  }

  const handleSubmit = e =>{
      e.preventDefault()
      let isError = false;
      if(adminUsername.trim() === "") {
        setUsernameError("Enter Admin Username")
        isError = true;
      }
      if(adminRole.trim() === "" || adminRole.trim() === "Select Admin") {
        setRoleError("Select Admin Role")
        isError = true;
      }
      if(adminPassword.length < 8){
        setPwdError("Password can not be less than 8 characters")
        isError = true;
      }
      if(adminPassword.trim() === "") {
        setPwdError("Enter Admin Password")
        isError = true;
        return
      }
      
      if(adminConfPwd.trim() !== adminPassword.trim()) {
        setConfPwdError("Two passwords do not match")
        isError = true;
      }
      if(adminConfPwd.trim() === "") {
          setConfPwdError("Confirm password cannot be empty")
          isError = true;
      }
      if(!isError){
          setLoader(true)
          setMessage('')
          let user = {username:adminUsername, role:adminRole,password:adminPassword}
          axios.post('/register',user).then(res =>{
                  setLoader(false)
                  resetFormInputs()
                  setMessage(res.data.message)
                  dispatch({type: ADD_ADMIN, payload: [res.data.admin]})
                  
              }).catch(error =>{
                setLoader(false)
                if(error.response){
                  setMessage(error.response.data.error)
                }
                
              })
            }
          }
    return (
      <Fragment>
        <GeneralHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="12">
                      <h3 className="text-center">Add New Admin Member</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="bg-white">
                  {/* <Form> */}
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="username"
                            >
                            Admin Username
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="username"
                              placeholder="Enter username"
                              type="text"
                              value={adminUsername} onChange={handleNameChange}
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{usernameError}</p>
                          <br />
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="role"
                            >
                              Admin Role
                            </label>
                            <select value={adminRole} onChange={handleRoleChange} className="form-control">
                              <option value="select">Select Admin</option>
                              {user.role === "ceo" ?<option value="super">Super</option>:null}
                              <option value="editor">Editor</option>
                              <option value="author">Author</option>
                            </select>
                          </FormGroup>
                          <br />
                          <p className="text-danger">{roleError}</p>
                          <br />
                        </Col>
                        
                      </Row>
                      
                      <Row>
                      <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="password"
                            >
                              Admin Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={adminPassword} onChange={handlePwdChange} id="password" 
                              placeholder="Enter password"
                              className="form-control"
                              type="password"
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{pwdError}</p>
                          <br />
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="confpassword"
                            >
                              Admin Confirm Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={adminConfPwd} onChange={handleConfChange} id="confpassword" 
                              placeholder="Confirm password"
                              className="form-control"
                              type="password"
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{confPwdError}</p>
                          <br />
                        </Col>
                      </Row>
                      {loader ? (<div className="d-block text-center">
                              <div className="spinner-border fast" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                          </div>): null}
                      <p className="text-info">{message}</p>
                    </div>
                    <div className="pl-lg-4">                        
                        <div className="text-center mt-4">
                                <Button onClick={handleSubmit} color="warning" outline type="submit">
                                    Create Admin
                                <i className="far fa-paper-plane" className="ml-2" />
                            </Button>
                        </div>
                    </div>
                    
                  {/* </Form> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
}

export default AddAdmin;
