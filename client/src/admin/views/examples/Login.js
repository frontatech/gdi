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
import React, {useState, useContext} from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Alert
} from "reactstrap";
import { Redirect } from "react-router-dom";
import { LoginUser } from "../../functions/UserFunctions";
import { UserAuthContext } from "../../context/UserAuthContext";

const Login = ({history,location}) =>{
  const {user:{isAuthenticated},dispatch} = useContext(UserAuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({userError:'',pwdError:'',message:''})
  const updateName = (e) =>{
    setUsername(e.target.value)
    setErrors(previous => ({...previous,userError:'',message:''}))
  }
  const updatePassword = (e) =>{
    setPassword(e.target.value)
    setErrors(previous => ({...previous,pwdError:'',message:''}))
  }
  const handleSubmit = async () =>{
    let pass = true
    if(username.length === 0){
      pass = false
      setErrors(previous => ({...previous,userError:'Please enter your username'}))
    }
    if(password.length === 0){
      pass = false
      setErrors(previous => ({...previous,pwdError:'Please enter your paasword'}))
    }
    if(pass){
      try {
        const user = {username,password}
        let res = await LoginUser(user)
        if(!res.data.access){
          return setErrors(previous => ({...previous,message:res.data.message}))
        }
        // getUser(res.data.token)
        dispatch({type:"LOGIN_USER",user:{...res.data.user}})
        // localStorage.setItem('user-auth-token',res.data.token)
        return history.push('/admin')
      } catch (error) {
        setErrors(previous => ({...previous,message:'Sorry, an error occurred, Try again later'}))
        console.log(error)
      }
    }
  }
  const {from} = location.state || {from: {pathname: '/admin'}}
  if(isAuthenticated){
    return <Redirect to={from} />
  }
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input value={username} onChange={updateName} placeholder="Email" type="email" autoComplete="new-email"/>
                  </InputGroup>
                </FormGroup>
                <span>{errors.userError}</span>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input value={password} onChange={updatePassword} placeholder="Password" type="password" autoComplete="new-password"/>
                  </InputGroup>
                </FormGroup>
                <span>{errors.pwdError}</span>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"

                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                {errors.message.length !== 0 ? <Alert color="warning">{errors.message}</Alert> : null}
                <div className="text-center">
                  <Button onClick={handleSubmit} className="my-4" color="primary" type="button">
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
}

export default Login;
