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

const AddEvent = ({history}) => {
  const editor = useRef(null)
    const config = {
        readonly: false,
        uploader:{
            insertImageAsBase64URI: true
        }
    }
    // post variables
    const [eventTitle, setEventTitle] = useState('')
    const [eventDescript, setEventDescript] = useState('')
    const [eventContent, setEventContent] = useState('') 
    const [eventStartDate, setEventStartDate] = useState('')
    const [eventEndDate, setEventEndDate] = useState('')
    const [eventTags, setEventTags] = useState('')
    const [eventBg, setEventBg] = useState([])
    // error variables
    const [titleError, setTitleError] = useState('')
    const [descriptError, setDescriptError] = useState('')
    const [contentError, setContentError] = useState('')
    const [startDateError, setStartDateError] = useState('')
    const [endDateError, setEndDateError] = useState('')
    const [tagError, setTagError] = useState('')
    const [eventBgError, setEventBgError] = useState('')
    const [loader, setLoader] = useState(false)
    const handleTitleChange = e =>{
        setTitleError('')
        setEventTitle(e.target.value)
    }
    const handleDescriptChange = e =>{
        setDescriptError('')
        setEventDescript(e.target.value)
    }
    const handleContentChange = e =>{
        setContentError('')
        setEventContent(e)   
    }
    const handleStartDateChange = e =>{
        setStartDateError('')
        setEventStartDate(e.target.value)
    }
    const handleEndDateChange = e =>{
        setEndDateError('')
        setEventEndDate(e.target.value)
    }
    const handleMetaChange = e =>{
        setTagError('')
        setEventTags(e.target.value)
    }
    const handleImageUpload = e =>{
        setEventBgError('')
        setEventBg(e.target.files)
    }
    const resetFormInputs = () =>{
        document.getElementById('#eventForm').reset()
    }
    const handleSubmit = e =>{
        e.preventDefault()
        let isError = false;
        if(eventTitle === "") {
          setTitleError("Enter Event Title")
          isError = true;
        }
        if(eventDescript === "") {
          setDescriptError("Enter Event Description")
          isError = true;
        }
        if(eventContent === "") {
          setContentError("Enter Event Content")
          isError = true;
        }
        if(eventStartDate === "") {
          setStartDateError("Please Select Event Start Date")
          isError = true;
        }
        if(eventEndDate === "") {
          setEndDateError("Please Select End Date")
          isError = true;
        }
        if(eventTags === "") {
          setTagError("Please Enter Event Tags")
          isError = true;
        }
        if(eventBg.length === 0) {
          setEventBgError("Please Select Event Cover Image")
          isError = true;
        }
        if(!isError){
            setLoader(true)
            // postContent = "hello world"
            const formData = new FormData()
            formData.append('fileToUpload', eventBg[0])
            formData.append('eventAuthor', "GDI Admin")
            formData.append('eventTitle', eventTitle)
            formData.append('eventDescript', eventDescript)
            formData.append('eventTags', eventTags)
            formData.append('eventStartDate',eventStartDate)
            formData.append('eventEndDate',eventEndDate)
            formData.append('eventContent', eventContent)
           console.log('passed validation')
           axios.post('/addEvent',formData, {withCredentials: true, headers:{
            'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin':"*"
                }}).then(res =>{
                    setLoader(false)
                    if(res.data.eventStatus){
                        // RESET EVENT FORM
                        resetFormInputs()
                        return setContentError(res.data.message)
                    }
                }).catch(error =>{
                  setLoader(false)
                  setContentError("An error occurred, please check your input fields and try again")
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
                      <h3 className="text-center">Create New Event</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="bg-white">
                  <Form id="eventForm">
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Event Title
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="postTitle"
                              placeholder="Enter event title"
                              type="text"
                              value={eventTitle} onChange={handleTitleChange}
                            />
                          </FormGroup>
                          <br />
                          <p>{titleError}</p>
                          <br />
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Event Description
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={eventDescript} onChange={handleDescriptChange} id="postDescript" 
                              placeholder="Event description"
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
                              htmlFor="eventBg"
                            >
                              Event Background Image
                            </label>
                            <Input
                              className="form-control"
                              style={{position: 'inherit',opacity: 1}}
                              type="file" accept="image/*" onChange={handleImageUpload} id="eventBg"
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{eventBgError}</p>
                          <br />
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="eventMetatags" className="grey-text">
                            Event Meta Tags
                            </label>
                            <input type="text" placeholder="Enter each separated by a spacebar" value={eventTags} onChange={handleMetaChange} id="eventMetatags" className="form-control" />
                            <br />
                            <p>{tagError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="eventDate"
                            >
                              Event Start Date
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="eventDate"
                              placeholder="dd/mm/yyyy"
                              type="date"
                              value={eventStartDate} onChange={handleStartDateChange}
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{startDateError}</p>
                          <br />
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="eventEndDate"
                            >
                              Event End Date
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={eventEndDate} onChange={handleEndDateChange} id="eventEndDate" 
                              placeholder="dd/mm/yyyy"
                              className="form-control"
                              type="date"
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{endDateError}</p>
                          <br />
                        </Col>
                      </Row>
                    </div>
                    <div className="pl-lg-4">
                        <h6 className="heading-p text-muted">Event Details</h6>
                          <div className="pl-lg-4">
                            <JoditEditor
                                    ref={editor}
                                    value={eventContent}
                                    config={config}
                                    tabIndex={1} // tabIndex of textarea
                                    onBlur={newContent => handleContentChange(newContent)} 
                                    onChange={e => {}}
                            />
                          </div>
                          <br />
                        <p className="text-danger">{contentError}</p><br/>
                        {loader ? (<div className="spinner-border fast d-flex justify-content-center" role="status"><span className="sr-only">Loading...</span></div>): null}
                        
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

export default AddEvent;
