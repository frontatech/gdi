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
import { UPDATE_EVENT } from "admin/actions/actions";
import { AdminEventContext } from "admin/context/AdminEventContext";

const EditEvent = ({location:{state:{event}}}) => {
    const {dispatch} = useContext(AdminEventContext)
  const editor = useRef(null)
    const config = {
        readonly: false,
        uploader:{
            insertImageAsBase64URI: true
        }
    }
    // post variables
    const [eventTitle, setEventTitle] = useState(event.event_title)
    const [eventDescript, setEventDescript] = useState(event.event_descript)
    const [eventContent, setEventContent] = useState(event.event_content) 
    const [eventStartDate, setEventStartDate] = useState(event.event_start_end)
    const [eventEndDate, setEventEndDate] = useState(event.event_end_date)
    const [eventTags, setEventTags] = useState(event.event_tags)
    const [eventTime, setEventTime] = useState(event.event_time)
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
    const handleTimeChange = e =>{
        setEventTime(e.target.value)
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
        if(!isError){
            setLoader(true)
            // postContent = "hello world"
            const eventData = {
                eventTitle, eventDescript, eventTags, eventStartDate,eventEndDate,eventId: event.event_id, eventContent, eventTime
            }
           axios.post('/updateEvent',eventData).then(res =>{
                console.log('im here')
                console.log(res)
                const data =  res.data 
                setLoader(false)
                setContentError(data.message)
                if(!data.isError){
                return dispatch({type: UPDATE_EVENT,payload: data.event})
                }
                }).catch(error =>{
                setLoader(false)
                if(error.response){
                    let err = error.response
                    setContentError(err.data.error)
                }
                else if(error.request){
                    setContentError(error.message)
                }
                else{
                    setContentError("An error occurred, make sure you enter all the required fields and try again")
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
                      <h3 className="text-center">Update Event</h3>
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
                          <label htmlFor="eventMetatags" className="grey-text">
                            Event Meta Tags
                            </label>
                            <input type="text" placeholder="Enter each separated by a spacebar" value={eventTags} onChange={handleMetaChange} id="eventMetatags" className="form-control" />
                            <br />
                            <p>{tagError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="eventEndDate"
                            >
                              Event Start Time
                            </label>
                            <select value={eventTime} onChange={handleTimeChange} className="form-control">
                              <option>12:00 PM</option>
                              <option>12:30 PM</option>
                              <option>1:00 PM</option>
                              <option>1:30 PM</option>
                              <option>2:00 PM</option>
                              <option>2:30 PM</option>
                              <option>3:00 PM</option>
                              <option>3:30 PM</option>
                              <option>4:00 PM</option>
                              <option>4:30 PM</option>
                              <option>5:00 PM</option>
                              <option>5:30 PM</option>
                              <option>6:00 PM</option>
                              <option>6:30 PM</option>
                              <option>7:00 PM</option>
                              <option>7:30 PM</option>
                              <option>8:00 PM</option>
                              <option>8:30 PM</option>
                              <option>9:00 PM</option>
                              <option>9:30 PM</option>
                              <option>10:00 PM</option>
                              <option>10:30 PM</option>
                              <option>11:00 PM</option>
                              <option>11:30 PM</option>
                              <option>12:00 AM</option>
                              <option>12:30 AM</option>
                              <option>11:30 AM</option>
                              <option>11:00 AM</option>
                              <option>10:30 AM</option>
                              <option>10:00 AM</option>
                              <option>9:30 AM</option>
                              <option>9:00 AM</option>
                              <option>8:30 AM</option>
                              <option>8:00 AM</option>
                              <option>7:30 AM</option>
                              <option>7:00 AM</option>
                              <option>6:30 AM</option>
                              <option>6:00 AM</option>
                              <option>5:30 AM</option>
                              <option>5:00 AM</option>
                              <option>4:30 AM</option>
                              <option>4:00 AM</option>
                              <option>3:30 AM</option>
                              <option>3:00 AM</option>
                              <option>2:30 AM</option>
                              <option>2:00 AM</option>
                              <option>1:30 AM</option>
                              <option>1:00 AM</option>              
                            </select>
                          </FormGroup>
                          <br />
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

export default EditEvent;
