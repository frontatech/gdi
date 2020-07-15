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
const NewsletterTemplate = () => {
  const {dispatch} = useContext(NewsletterContext)
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [siteUrl, setSiteUrl] = useState('')
  const [bgColor, setBgColor] = useState('')
  const [btnText, setBtnText] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loader, setLoader] = useState(false)
  // errors
  const [subjectError, setSubjectError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [contentError, setContentError] = useState('')
  const [siteUrlError, setSiteUrlError] = useState('')
  const [bgColorError, setBgColorError] = useState('')
  const [btnTextError, setBtnTextError] = useState('')
  const [imageUrlError, setImageUrlError] = useState('')
  // events
  const handleSubjectChange = e =>{
    setSubject(e.target.value)
    setSubjectError('')
  }
  const handleDescriptChange = e =>{
    setDescription(e.target.value)
    setDescriptionError('')
  }
  const handleContentChange = e =>{
    setContent(e.target.value)
    setContentError('')
  }
  const handleSiteUrlChange = e =>{
    setSiteUrl(e.target.value)
    setSiteUrlError('')
  }
  const handleBgColorChange = e =>{
    setBgColor(e.target.value)
    setBgColorError('')
  }
  const handleBtnTextChange = e =>{
    setBtnText(e.target.value)
    setBtnTextError('')
  }
  const handleImageUrlChange = e =>{
    setImageUrl(e.target.value)
    setImageUrlError('')
  }
  // handling submit
  const handleSubmit = e =>{
    e.preventDefault()
    let isError = false
    if(subject === ""){
      isError = true
      setSubjectError("Please enter newletter title")
    }
    if(description === ""){
      isError = true
      setDescriptionError("Please enter newletter caption")
    }
    if(siteUrl === ""){
      isError = true
      setSiteUrlError("Please enter site url address")
    }
    if(bgColor === ""){
      isError = true
      setBgColorError("Please select background color")
    }
    if(btnText === ""){
      isError = true
      setBtnTextError("Please select button text")
    }
    if(imageUrl === ""){
      isError = true
      setImageUrlError("Please enter newletter image url")
    }
    if(content === ""){
      isError = true
      setContentError("Please enter newletter content")
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
                              Title of the post
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="postTitle"
                              placeholder="Enter post title"
                              type="text"
                              value={subject} onChange={handleSubjectChange}
                            />
                          </FormGroup>
                          <br />
                          <p className="text-danger">{subjectError}</p>
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

export default NewsletterTemplate
