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
import JoditEditor from "jodit-react";
import GeneralHeader from "../../Headers/GeneralHeader";

const RequestFund = ({history}) => {
  const editor = useRef(null)
    const config = {
        readonly: false,
        uploader:{
            insertImageAsBase64URI: true
        }
    }
    // post variables
    const [requestTitle, setRequestTitle] = useState('')
    const [requestDescript, setRequestDescript] = useState('')
    const [requestContent, setRequestContent] = useState('') 
    const [requestTargetAmount, setRequestTargetAmount] = useState(0)
    const [requestTags, setRequestTags] = useState('')
    const [requestBg, setRequestBg] = useState([])
    // error variables
    const [titleError, setTitleError] = useState('')
    const [descriptError, setDescriptError] = useState('')
    const [contentError, setContentError] = useState('')
    const [tagError, setTagError] = useState('')
    const [requestBgError, setRequestBgError] = useState('')
    const [requestTargetError, setRequestTargetError] = useState('')
    const [loader, setLoader] = useState(false)
    // event functions
    
    const handleTitleChange = e =>{
        setTitleError('')
        setRequestTitle(e.target.value)
    }
    const handleDescriptChange = e =>{
        setDescriptError('')
        setRequestDescript(e.target.value)
    }
    const handleContentChange = e =>{
        setContentError('')
        setRequestContent(e)   
    }
    const handleAmountChange = e =>{
        setRequestTargetError('')
        setRequestTargetAmount(e.target.value)
    }
    const handleMetaChange = e =>{
      setTagError('')
      setRequestTags(e.target.value)
    }
    const handleImageUpload = e =>{
        setRequestBgError('')
        setRequestBg(e.target.files)
    }
    const resetFormInputs = () =>{
        document.getElementById('#requestForm').reset()
    }

    const handleSubmit = e =>{
        e.preventDefault()
        let isError = false;
        if(requestTitle === "") {
            setTitleError("Enter Request Title")
            isError = true;
        }
        if(requestDescript === "") {
            setDescriptError("Enter Request Description")
            isError = true;
        }
        if(requestContent === "") {
            setContentError("Enter Request Content")
            isError = true;
        }
        if(requestTargetAmount.toString() === "" || requestTargetAmount === 0 || isNaN(requestTargetAmount)) {
            setRequestTargetError("Please Enter Request Amount")
            isError = true;
        }
        if(requestTags.trim() === ""){
          setTagError("Please Enter Request Tags")
          isError = true
        }
        if(requestBg.length === 0) {
            setRequestBgError("Please Select Request Background Image")
            isError = true;
        }
        if(!isError){
            setLoader(true)
            // postContent = "hello world"
            const formData = new FormData()
            formData.append('fileToUpload', requestBg[0])
            formData.append('requestAuthor', 'GDI Admin')
            formData.append('requestTitle', requestTitle)
            formData.append('requestDescript', requestDescript)
            formData.append('requestTags',requestTags)
            formData.append('requestTargetAmount', requestTargetAmount)
            formData.append('requestContent', requestContent)
           console.log('passed validation')
           axios.post('/addRequest',formData, {withCredentials: true, headers:{
            'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin':"*"
                }}).then(res =>{
                    console.log('im here')
                    console.log(res)
                    const data =  res.data 
                    setLoader(false)
                    if(res.data.reqStatus){
                        // RESET POST FORM
                        resetFormInputs()
                        return setContentError(res.data.message)
                    }
                }).catch(error =>{
                  setLoader(false)
                  console.log(error.message)
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
                      <h3 className="text-center">Create a new fund request</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="bg-white">
                  <Form id="requestForm">
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                            Request Reason
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="requestTitle"
                              placeholder="Enter request title"
                              type="text"
                              value={requestTitle} onChange={handleTitleChange}
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{titleError}</p>
                          <br />
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Request Description
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={requestDescript} onChange={handleDescriptChange} id="requestDescript" 
                              placeholder="Request description"
                              className="form-control"
                              type="text"
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{descriptError}</p>
                          <br />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Request Background Image
                            </label>
                            <Input
                              className="form-control"
                              style={{position: 'inherit',opacity: 1}}
                              type="file" accept="image/*" onChange={handleImageUpload} id="postBg"
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{requestBgError}</p>
                          <br />
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="requestMetatags" className="grey-text">
                            Request Meta Tags
                            </label>
                            <input type="text" placeholder="Enter each tag separated by a comma" value={requestTags} onChange={handleMetaChange} id="requestMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{tagError}</p>
                            <br />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="requestAmount"
                            >
                              Targeted Amount
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="requestAmount"
                              placeholder="e.g 1,000,000,000"
                              type="number"
                              value={requestTargetAmount} onChange={handleAmountChange}
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{requestTargetError}</p>
                          <br />
                        </Col>
                      </Row>
                    </div>
                    <div className="pl-lg-4">
                        <h6 className="heading-p text-muted">Request Details</h6>
                          <div className="pl-lg-4">
                            <JoditEditor
                                ref={editor}
                                value={requestContent}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={newContent => handleContentChange(newContent)} 
                                onChange={newContent => {}}
                            />
                          </div>
                          <br />
                        <p className="text-danger">{contentError}</p><br/>
                        {loader ? (<div className="d-block text-center">
                        <div className="spinner-border fast d-flex justify-content-center" role="status"><span className="sr-only">Loading...</span></div>
                        </div>): null}
                        
                        <div className="text-center mt-4">
                                <Button onClick={handleSubmit} color="warning" outline type="submit">
                                    Submit Event
                                <i className="far fa-paper-plane" className="ml-2" />
                            </Button>
                        </div>
                    </div>
                    
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
}

export default RequestFund;
