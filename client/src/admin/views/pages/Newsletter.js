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
  CardFooter,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
} from "reactstrap";
// core components
import GeneralHeader from "../../Headers/GeneralHeader";
import { AdminPostsContext } from "admin/context/AdminPostsContext";
// import mjml2html from 'mjml'
import MailTemplateOne from "../mail-templates/NewsletterTemplate";
import { useEffect } from "react";
import Axios from "axios";
import { NewsletterContext } from "admin/context/NewsletterContext";
import NewsletterTemplate from "../mail-templates/NewsletterTemplate";
import NestedColTemplate from "../mail-templates/NestedColumnTemplate";
import CarouselTemplate from "../mail-templates/CarouselTemplate";
import MultiPosts from "../mail-templates/MultiPostsTemplate";

const Newsletter = ({location:{state:{template}}}) => {
    const {mainState:{newsletterTheme:{htmlTemplate,subject}}} = useContext(NewsletterContext)
    const [message, setMessage] = useState('')
    const [loader, setLoader] = useState(false)
    const [audience, setAudience] = useState('')
    const [iconPills, setIconPills] = React.useState("1");

    const handleAudienceChange = e =>{
      setAudience(e.target.value)
      setMessage('')
    }
    const handlePublish = (e) =>{
      e.preventDefault()
      let isError = false
      
      if(htmlTemplate === "" || subject === ""){
        setMessage("Please construct a newsletter")
        isError = true
      }
      if(audience === ""){
        setMessage("Please select audience")
      }
      if(!isError){
        setLoader(true)
        setMessage('')
        Axios.post("/send_newsletter",{htmlTemplate, subject, audience}).then(res =>{
          setLoader(false)
          if(res.data.success){
            setMessage(res.data.message)
          }
          console.log(res)
        }).catch(error =>{
          setLoader(false)
          if(error.response){
            setMessage(error.response.data.error)
          }
        })
      }
      
    }
    const htmlToMarkup = (data) =>{
        return {__html:data}
    }
    return (
        <Fragment>
        <GeneralHeader />
        {/* Page content */}
        <Container fluid>
            <CardHeader><h3 className="text-center">Create newsletter below!</h3></CardHeader>
            
          <Row>
            <Col lg="6" xl="6" className="mb-2">
                {template.name === "newsletter" ? <NewsletterTemplate /> : template.name === "nestedColumn" ? <NestedColTemplate />: template.name === "carousel" ? <CarouselTemplate /> : template.name === "multiposts" ? <MultiPosts /> : null }
            </Col>
          <Col lg="6" xl="6" className="mb-2">
          <Card>
                <CardHeader>
                  <Nav className="justify-content-center" role="tablist" tabs>
                    <NavItem>
                      <NavLink
                        className={iconPills === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          setIconPills("1");
                        }}
                      >
                        <i className="now-ui-icons objects_umbrella-13"></i>
                        Preview
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={iconPills === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          setIconPills("2");
                        }}
                      >
                        <i className="now-ui-icons shopping_cart-simple"></i>
                        Images
                      </NavLink>
                    </NavItem>
                    
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent
                    className="text-center"
                    activeTab={"iconPills" + iconPills}
                  >
                    <TabPane tabId="iconPills1">
                      {htmlTemplate !== "" ? <div dangerouslySetInnerHTML={htmlToMarkup(htmlTemplate)} />: <div><h1 className="heading">Nothing to preview</h1><p className="description">Your newsletter preview will show here as soon as you hit preview button</p></div>}
                    </TabPane>
                    <TabPane tabId="iconPills2">
                      <p>
                        I will be the leader of a company that ends up being
                        worth billions of dollars, because I got the answers. I
                        understand culture. I am the nucleus. I think that’s a
                        responsibility that I have, to push possibilities, to
                        show people, this is the level that things could be at.
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at.
                      </p>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
                   
          </Col>
          </Row>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="heading text-center">Settings</CardTitle>
              <h6 className="description">Please select your target audience</h6>
            </CardHeader>
                <CardBody>
                  <Form>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label mb-3 mr-5"
                                htmlFor="input-email"
                              >
                                GDI Members
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="postTitle"
                                placeholder="Enter post title"
                                type="radio"
                                name="audience"
                                value="members"
                                onChange={handleAudienceChange}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label mb-3 mr-5"
                                htmlFor="input-email"
                              >
                                Subscribers
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="postTitle"
                                type="radio"
                                name="audience"
                                value="subscribers"
                                onChange={handleAudienceChange}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label mb-3 mr-5"
                                htmlFor="input-email"
                              >
                                Both
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="postTitle"
                                type="radio"
                                name="audience"
                                value="both"
                                onChange={handleAudienceChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                  </Form>
                  <p className="text-danger">{message}</p><br/>
                        {loader ? (<div className="d-block text-center">
                              <div className="spinner-border fast" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                          </div>): null}
                </CardBody>
                <CardFooter>
                  <div className="d-block text-center"><Button disabled={htmlTemplate === "" || subject === "" || audience === "" ? true : false} onClick={handlePublish} color="danger">Publish</Button></div>
                </CardFooter>
              </Card>  
        </Container>
      </Fragment>
    )
}

export default Newsletter
