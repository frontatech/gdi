import React, { useState, useContext } from 'react'
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
import Axios from 'axios';
import { NewsletterContext } from 'admin/context/NewsletterContext';
import { NEWSLETTER_THEME } from 'admin/actions/actions';
const WelcomeTemplate = () => {
  const {dispatch} = useContext(NewsletterContext)
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [siteUrl, setSiteUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loader, setLoader] = useState(false)
  // errors
  const [firstnameError, setFirstnameError] = useState('')
  const [username, setUsernameError] = useState('')
  const [siteUrlError, setSiteUrlError] = useState('')
  const [imageUrlError, setImageUrlError] = useState('')
  // events
  const handleFirstnameChange = e =>{
    setFirstname(e.target.value)
    setFirstnameError('')
  }
  const handleUsernameChange = e =>{
    setUsernameError(e.target.value)
    setUsernameError('')
  }
  const handleSiteUrlChange = e =>{
    setSiteUrl(e.target.value)
    setSiteUrlError('')
  }
  const handleImageUrlChange = e =>{
    setImageUrl(e.target.value)
    setImageUrlError('')
  }
  // handling submit
  const handleSubmit = e =>{
    e.preventDefault()
    let isError = false
    if(firstnane === ""){
      isError = true
      setFirstnameError("Please enter user first name")
    }
    if(username === ""){
      isError = true
      setUsernameError("Please enter username")
    }
    if(siteUrl === ""){
      isError = true
      setSiteUrlError("Please enter site url address")
    }
    if(imageUrl === ""){
      isError = true
      setImageUrlError("Please enter newsletter image url")
    }
    if(!isError){
      Axios.post('/previewNewsletter', {type: 'newsletter',params:{subject,description,content,siteUrl,bgColor,btnText,imageUrl}}).then(res =>{
        console.log(res)
        if(!res.data.isError){
          console.log(isError)
          dispatch({type: NEWSLETTER_THEME, payload: res.data.theme})
        }
      }).catch(error =>{
        console.log(error)
      })
    }
  }
  return (
    <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="12">
                      <h3 className="text-center">Newsletter Template</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="bg-white">
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              First name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="postTitle"
                              placeholder="Enter first name"
                              type="text"
                              value={firstnane} onChange={handleFirstnameChange}
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{firstnameError}</p>
                          <br />
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Description of the post
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={description} onChange={handleDescriptChange} id="postDescript" 
                              placeholder="Post description"
                              className="form-control"
                              type="text"
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{descriptionError}</p>
                          <br />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            Post Url
                            </label>
                            <input type="text" placeholder="Enter post url" value={siteUrl} onChange={handleSiteUrlChange} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{siteUrlError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                          <label htmlFor="postMetatags" className="grey-text">
                            Post image link
                            </label>
                            <input type="text" placeholder="Enter post image link" value={imageUrl} onChange={handleImageUrlChange} id="postMetatags" className="form-control" />
                            <br />
                            <p className="text-danger">{imageUrlError}</p>
                            <br />
                            
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Background color
                              </label>
                              <input
                                className="form-control"
                                value={bgColor} onChange={handleBgColorChange} id="postDescript" 
                                className="form-control"
                                type="color"
                              />
                            </FormGroup>
                            <br />
                            <p className="text-danger">{bgColorError}</p>
                            <br />
                        </Col>
                        <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Button text
                              </label>
                              <select className="form-control" onChange={handleBtnTextChange}>
                                <option>Select button text</option>
                                <option>Read More</option>
                                <option>Learn More</option>
                                <option>Visit our site</option>
                              </select>
                            </FormGroup>
                            <br />
                            <p className="text-danger">{btnTextError}</p>
                            <br />
                        </Col>
                      </Row>
                    </div>
                    <div className="pl-lg-4">
                        <h6 className="heading-p text-muted">Newsletter Content</h6>
                            <FormGroup>
                              <Input
                                className="form-control-alternative"
                                value={content} onChange={handleContentChange} id="postDescript" 
                                placeholder="Post description"
                                className="form-control"
                                type="textarea"
                              />
                            </FormGroup>
                          <br />
                        <p className="text-danger">{contentError}</p><br/>
                        {loader ? (<div className="d-block text-center">
                              <div className="spinner-border fast" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                          </div>): null}
                        
                        <div className="text-center mt-4">
                                <Button onClick={handleSubmit} color="warning" outline type="submit">
                                    Preview
                                <i className="far fa-paper-plane" className="ml-2" />
                            </Button>
                        </div>
                    </div>
                  </Form>
                </CardBody>
              </Card>
  )
}

export default WelcomeTemplate
