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
import {Link} from 'react-router-dom'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Badge,
  Container,
  Row,
  Col,
  CardFooter
} from "reactstrap";
// core components
import GeneralHeader from "../../Headers/GeneralHeader.js";
import Axios from "axios";
import { UPDATE_MEMBER_INFORMATION } from "admin/actions/actions.js";
import { AdminEventContext } from "admin/context/AdminEventContext.js";
import { UPDATE_EVENT } from "admin/actions/actions.js";


const AdminEventDetails = ({location:{state:{event}}}) => {
    const {dispatch} = useContext(AdminEventContext)
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
            formData.append('fileToUpload',photo[0])
            formData.append('oldEventBg',event.event_bg)
            formData.append('event_id',event.event_id)
            Axios.post('/updateEventBg', formData).then(res =>{
                console.log(res)
                if(!res.data.isError){
                    dispatch({type: UPDATE_EVENT,payload:res.data.event})
                }
            }).catch(error =>{
                console.log(error)
            })
        }
        
    }
    const displayPost = content =>{
        return{__html: content}
    }
    return (
      <>
        <GeneralHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col xl="12">
              <Card className="bg-white shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Post Details</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="bg-white">
                  <h5 className="heading">{event.event_title}</h5>
                  <h6 className="description">{event.event_descript}</h6>
                  <div style={{height:300}}><img style={{height: '100%'}} className="rounded w-100" ref={photoRefUrl} src={event.event_bg} />
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
                  </div>
                  <div dangerouslySetInnerHTML={displayPost(event.event_content)} />
                  <Container>
                    <Row>
                        <Col lg="6">
                            <h1 className="heading">Event Posted On: </h1>
                            <h3 className="description">{event.event_date}</h3>
                        </Col>
                        <Col lg="6">
                            <h1 className="heading">Event Status: </h1>
                            <h3 className="description">{event.event_expired === 0 ? "Active" : "Expired"}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4">
                            <h1 className="heading">Event Start Time: </h1>
                            <h3 className="description">{event.event_time}</h3>
                        </Col>
                        <Col lg="4">
                            <h1 className="heading">Event Start Date: </h1>
                            <h3 className="description">{event.event_start_date}</h3>
                        </Col>
                        <Col lg="4">
                            <h1 className="heading">Event End Date: </h1>
                            <h3 className="description">{event.event_end_date}</h3>
                        </Col>
                    </Row>
                  </Container>
                </CardBody>
                <CardFooter className="bg-white">
                    <h4 className="heading">Tags</h4>
                    {
                        event.event_tags.split(',').map(item => <Badge key={item} color="info" className="btn btn-rounded"><Link className="text-white" to={"/posts/"+item}>#{item.trim()}</Link></Badge>)
                      }
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
}

export default AdminEventDetails;
