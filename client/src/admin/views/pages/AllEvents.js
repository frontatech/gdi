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
import { AdminEventContext } from "admin/context/AdminEventContext";
import { DELETE_EVENT } from "admin/actions/actions";
import Axios from "axios";
import { LOAD_MORE_EVENTS } from "admin/actions/actions";

const AllEvents = () => {
    const {eventState:{events,totalEvents}, dispatch} = useContext(AdminEventContext)
    const [showBtnText, setShowBtnText] = useState('Load More Events')
    const handleDeleteEvent = async (e, id) =>{
        e.preventDefault()
        try {
            const res = await Axios.delete(`/events/${id}`)
            if(res.data.success){
                dispatch({type: DELETE_EVENT,payload:res.data.eventId})
            }
        } catch (error) {
            if(error.response){
                console.log(error.response.data)
            }
        }
    }
    const loadMoreEvents = () =>{
        setShowBtnText('Loading...')
        const lastId = events.slice(-1)[0].event_id
        Axios.post('/adminLoadMoreEvents',{lastId}).then(res =>{
            setShowBtnText('Load More Events')
            console.log(res)
            dispatch({type: LOAD_MORE_EVENTS, payload: res.data.events})
        }).catch(error =>{
            if(error.response){
                console.log(error.response.data.error)
            }
        })
    }
    return (
        <Fragment>
        <GeneralHeader />
        {/* Page content */}
        <Container fluid>
            <CardHeader><h3 className="text-center">We have  {totalEvents} Events</h3></CardHeader>
          <Row>
              {events.map(event => (
                  <Col lg="6" xl="3" key={`${event.event_id}`} className="mb-3">
                  <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                          <div className="d-block text-center">
                              <div>
                                    <div className="card-profile-image">
                                        <Link
                                            to={{
                                                pathname: `/admin/event_details/${event.event_slug}`,
                                                state: {event}
                                            }}
                                            id="tooltip742438047"
                                        >
                                                <img
                                                alt="..."
                                                style={{height: 100}}
                                                className="rounded"
                                                src={event.event_bg}
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
                                          pathname: `/admin/event_details/${event.event_slug}`,
                                          state: {event}
                                      }} className="font-weight-bold mb-0">{`${event.event_title}`}</Link>
                              </CardTitle>
                          </div> 
                          <div className="container mt-2">
                              <div className="d-flex justify-content-between">
                                  <Link to="#" onClick={(e) =>handleDeleteEvent(e,event.event_id)}><i className="fa fa-times text-danger" /></Link>
                                  <Link to={{
                                          pathname: `/admin/edit_event/${event.event_slug}-${event.event_id}`,
                                          state: {event}
                                      }}><i className="fa fa-edit text-info" /></Link>
                                  <Link to={{
                                                pathname: `/admin/event_details/${event.event_slug}`,
                                                state: {event}
                                            }}><i className="fa fa-eye text-success" /></Link>
                              </div>
                          </div>
                      </CardFooter>
                  </Card>
              </Col>
              ))}
          </Row>
            <div className="col text-center">
                {totalEvents > events.length ? (<Button
                className="btn-round"
                color="primary"
                onClick={loadMoreEvents}
                size="lg"
                id="loadMoreBtn"
                >
                    {showBtnText}
                </Button>): <Button
                className="btn-round"
                color="warning"
                size="lg"
                disabled
                >
                No More Events
                </Button>}
                
            </div>
        </Container>
      </Fragment>
    )
}

export default AllEvents
